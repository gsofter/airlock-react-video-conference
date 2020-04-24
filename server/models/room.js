module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "rooms",
    {
      name: DataTypes.STRING, // room name
      owner_access_code: DataTypes.STRING, // access_code of user who created room
      mode: DataTypes.STRING, // private or public
    },
    {
      timestamps: false,
    }
  );
};
