module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      access_code: DataTypes.STRING,
      room_name: DataTypes.STRING,
      user_name: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};
