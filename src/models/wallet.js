import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate = (models) => {
      const { User } = models;

      Wallet.belongsTo(User, { as: 'users', foreignKey: 'user_id' });
    };
  }

  Wallet.init(
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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      currency: {
        allowNull: false,
        type: DataTypes.ENUM('IDR'),
        defaultValue: 'IDR',
      },
      balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: 'wallets',
    },
  );

  return Wallet;
};
