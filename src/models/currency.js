import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate = (models) => {
      const { Wallet, Transaction, Transfer } = models;

      Currency.hasOne(Wallet, { as: 'wallets', foreignKey: 'currency_id' });
      Currency.hasOne(Transaction, { as: 'transactions', foreignKey: 'currency_id' });
      Currency.hasOne(Transfer, { as: 'transfers', foreignKey: 'currency_id' });
    };
  }

  Currency.init(
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'currencies',
    },
  );

  return Currency;
};
