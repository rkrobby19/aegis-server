import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate = (models) => {
      const { User } = models;

      Log.belongsTo(User, { as: 'users', foreignKey: 'user_id' });
    };
  }

  Log.init(
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'users',
          },
        },
        onDelete: 'SET NULL',
      },
      slug: {
        allowNull: false,
        type: DataTypes.ENUM('expense', 'income', 'transfer', 'payment'),
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM('expense', 'income', 'transfer'),
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'logs',
    },
  );

  return Log;
};
