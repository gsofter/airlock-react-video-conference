module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "rooms",
    {
      name: DataTypes.STRING,
      access_code: DataTypes.STRING,
      mode: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};
