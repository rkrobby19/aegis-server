import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'users',
    },
  );

  return User;
};
