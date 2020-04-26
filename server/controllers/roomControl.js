const models = require("../models");
const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");
const { Op } = require("sequelize");

const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

/**
 *
 * Create room
 * - user not exit => 404 { type: 'USER_NOT_FOUND' }
 * - room with same name or same owner exist => 406 { type: 'DUPLICATE' }
 * @param { access_code, name, mode } req
 * @return { ...room }
 */

const createRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { access_code, name, mode } = req.body;
    const user = await User.findOne({
      where: { access_code },
      attributes: ["id", "name", "access_code", "room_name"],
    });

    if (!user) {
      // user not exit => 404 { type: 'USER_NOT_FOUND' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    const room = await Room.findOne({
      where: { [Op.or]: [{ name: name }, { owner_access_code: access_code }] },
      attributes: ["name", "owner_access_code", "mode"],
    });
    if (room) {
      // room with same name or same owner exist => 406 { type: 'DUPLICATE' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "DUPLICATE",
      });
      return;
    }

    const newRoom = Room.build(
      {
        name: name,
        owner_access_code: access_code,
        mode: mode,
      },
      {
        attributes: ["id", "name", "owner_access_code", "mode"],
      }
    );
    await newRoom.save();

    const roomData = {
      name: newRoom.name,
      owner_access_code: newRoom.owner_access_code,
      mode: newRoom.mode,
      members: [{ name: newRoom.name }],
    };
    res.send(roomData);
    return;
  } catch (err) {
    console.log(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      type: "INTERNAL_SERVER_ERROR",
      error: err.message,
    });
  }
};

/**
 *
 * Remove room for room_name
 * - room is not owner of current_user, 406 { type: 'PERMISSION_DENIED' }
 * - room not exit, 406 { type: 'ROOM_NOT_FOUND' }
 * - user not found, 406 { type: 'USER_NOT_FOUND' }
 * - room members >= 2 406 { type: 'MEMBERS_EXIST' }
 *
 * @param {room_name, access_code} req
 */

const deleteRoom = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { room_name, access_code } = req.query;

    const room = await Room.findOne({
      where: { name: room_name },
      attributes: ["id", "name", "owner_access_code"],
    });

    if (!room) {
      // room not exit, 406 { type: 'ROOM_NOT_FOUND' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "ROOM_NOT_FOUND",
      });
      return;
    }

    const user = await User.findOne({
      where: { access_code: access_code },
      attributes: ["name", "room_name", "access_code"],
    });

    if (!user) {
      // user not found, 406 { type: 'USER_NOT_FOUND' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    if (room.owner_access_code != access_code) {
      // room is not owner of current_user, 406 { type: 'PERMISSION_DENIED' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "PERMISSION_DENIED",
      });
      return;
    }

    const roomMembers = await User.findAndCountAll({
      where: { room_name: room.name },
      attributes: ["name", "access_code", "room_name"],
    });

    if (roomMembers.count >= 2) {
      // room members >= 2 => 406 { type: 'MEMBERS_EXIST' }
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "MEMBERS_EXIST",
      });
      return;
    }

    // force take out room members
    await User.update(
      { room_name: null },
      {
        where: {
          room_name: room_name,
        },
        attributes: ["room_name"],
      }
    );

    // console.log(room.id);
    await room.destroy();
    res.send({ type: "SUCCESS", message: "Room has been deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

/**
 *
 * Return room data after join room and user
 * - room not found => 404 { type: 'ROOM_NOT_FOUND' error: string}
 * - user not found => 404 { type: 'USER_NOT_FOUND' error: string}
 * - room memebers over 4 => 406 { type: 'ROOM_OVERFLOW'}
 * - room private => 406 { type: 'ROOM_PRIVATE'}
 *
 * @param {* access_code: string, room_name: string} req.query
 * @return {...room, isOwner: Boolean, members: [members]}
 */

const joinRoom = async (req, res, next) => {
  try {
    console.log("JOINROOM CALLED!");
    const { User, Room } = models;
    const { access_code, room_name } = req.query;
    console.log(req.query);

    const room = await Room.findOne({
      where: { name: room_name },
      attributes: ["name", "owner_access_code", "mode"],
    });
    // if room not exist
    if (!room) {
      res.status(HttpStatus.NOT_FOUND).json({
        type: "ROOM_NOT_FOUND",
      });
      return;
    }

    let roomMembers = await User.findAndCountAll({
      where: { room_name: room.name },
      attributes: ["name", "access_code", "room_name"],
    });

    if (roomMembers.count >= 4) {
      // room memebers over 4 => 406 { type: 'ROOM_OVERFLOW'}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "ROOM_OVERFLOW",
      });
      return;
    }

    if (room.mode === "PRIVATE") {
      // room private => 406 { type: 'ROOM_PRIVATE'}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "ROOM_PRIVATE",
      });
      return;
    }

    const user = await User.findOne({
      where: { access_code },
    });

    if (!user) {
      // user not found => 404 { type: 'USER_NOT_FOUND' error: string}
      res.status(HttpStatus.NOT_FOUND).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    user.room_name = room.name;
    await user.save();

    const roomData = {
      name: room.name,
      owner_access_code: room.owner_access_code,
      mode: room.mode,
      members: roomMembers.rows,
      isOwner: room.owner_access_code === user.access_code ? true : false,
    };
    res.send(roomData);
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: e.message,
    });
  }
};

/**
 *
 * Return room data after join room and user
 * - if room not exists =>  406 { "type": "NOT_ACCEPTABLE"}
 * - if user not found => 406 { "type" : "NOT_ACCEPTABLE"}
 *
 * @param {* access_code: string } req.query
 * @return {...room, isOwner: Boolean, members: [members]}
 */

const joinRandomRoom = async (req, res, next) => {
  try {
    console.log("JOINRANDOMROOM CALLED!");
    const { User, Room } = models;
    const { access_code } = req.query;

    const allRooms = await Room.findAndCountAll({
      where: { mode: "public" },
      attributes: ["name", "owner_access_code", "mode"],
    });

    if (allRooms.count == 0) {
      // if room not exists =>  406 { "type": "NOT_ACCEPTABLE"}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "NO_ROOM",
      });
    }

    let rooms = allRooms.rows;
    let randomId, randomRoom, randomRoomMembers;
    while (rooms) {
      randomId = Math.floor(Math.random() * rooms.length);
      randomRoom = rooms[randomId];
      randomRoomMembers = await User.findAndCountAll({
        where: { room_name: randomRoom.name },
      });
      if (randomRoomMembers.count >= 4) {
        rooms.splice(randomId, 1);
        continue;
      }
      if (rooms.length === 0) {
        // if room not exists =>  406 { "type": "NOT_ACCEPTABLE"}
        res.status(HttpStatus.NOT_ACCEPTABLE).json({
          type: "NOT_ACCEPTABLE",
        });
        return;
      }
      break;
    }

    const user = await User.findOne({
      where: { access_code: access_code },
    });

    if (!user) {
      // if room not exists =>  406 { "type": "NOT_ACCEPTABLE"}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "NOT_ACCEPTABLE",
      });
      return;
    }

    user.room_name = randomRoom.name;
    await user.save();

    const roomData = {
      name: randomRoom.name,
      owner_access_code: randomRoom.owner_access_code,
      mode: randomRoom.mode,
      members: randomRoomMembers.rows,
      isOwner: randomRoom.owner_access_code === user.access_code ? true : false,
    };
    res.send(roomData);
  } catch (e) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: e.message,
    });
  }
};

/**
 *
 * Leave the current room for current user
 * - user not found => 406 { type: 'USER_NOT_FOUND' error: string}
 *
 * @param access_code
 * @return { type: 'SUCCESS' }
 */

const leaveRoom = async (req, res, next) => {
  try {
    const { User } = models;
    const { access_code } = req.query;

    const user = await User.findOne({
      where: { access_code: access_code },
      attributes: ["id", "name", "room_name", "access_code"],
    });

    if (!user) {
      // user not found => 406 { type: 'USER_NOT_FOUND' error: string}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "USER_NOT_FOUND",
      });
      return;
    }

    await User.update(
      {
        room_name: null,
      },
      {
        omitNull: false,
        where: { access_code: access_code },
      }
    );

    res.send({ type: "SUCCESS", message: "User has leaved the room" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

/**
 *
 * Get room members
 * - room not exit => 406 { "type": "ROOM_NOT_FOUND"}
 * @param room_name
 * @return { type: 'SUCCESS' }
 */
const getRoomMembers = async (req, res, next) => {
  try {
    const { User, Room } = models;
    const { room_name } = req.query;

    const room = await Room.findOne({
      where: { name: room_name },
    });

    if (!room) {
      // room not exit => 406 { "type": "ROOM_NOT_FOUND"}
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        type: "ROOM_NOT_FOUND",
      });
      return;
    }
    const members = await User.findAndCountAll({
      where: { room_name, room_name },
    });
    return res.send(members.rows);
  } catch (e) {
    console.log(e);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: e.message,
    });
  }
};

module.exports = {
  createRoom,
  deleteRoom,
  joinRoom,
  joinRandomRoom,
  leaveRoom,
  getRoomMembers,
};
