module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'User',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    { timestamps: false }
  );

  return Model;
};
