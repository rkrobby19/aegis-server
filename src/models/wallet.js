import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate = (models) => {
      const { User, Currency } = models;

      Wallet.belongsTo(User, { as: 'users', foreignKey: 'user_id' });
      Wallet.belongsTo(Currency, { as: 'currencies', foreignKey: 'currency_id' });
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
      currency_id: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'currencies',
          },
        },
        onDelete: 'SET NULL',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
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
