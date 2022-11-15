import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate = (models) => {
      const { User, Entry } = models;

      Account.belongsTo(User, { foreignKey: 'user_id' });
      Account.hasMany(Entry, { foreignKey: 'account_id' });
    };
  }

  Account.init(
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
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      balance: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      currency: {
        allowNull: false,
        type: DataTypes.ENUM('IDR', 'USD'),
      },
      created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'accounts',
    },
  );

  return Account;
};
