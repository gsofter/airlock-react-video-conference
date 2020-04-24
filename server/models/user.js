module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      access_code: DataTypes.STRING, // access_code (passcode)
      room_name: DataTypes.STRING, // joined room name
      name: DataTypes.STRING, // identity
    },
    {
      timestamps: false,
    }
  );
};
