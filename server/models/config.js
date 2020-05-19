module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "configs",
    {
      key: DataTypes.STRING, // access_code (passcode)
      value: DataTypes.STRING, // joined room name
    },
    {
      timestamps: false,
    }
  );
};
