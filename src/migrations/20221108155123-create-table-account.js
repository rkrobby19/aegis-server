module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          key: 'id',
          model: {
            tableName: 'users',
          },
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      balance: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      currency: {
        type: Sequelize.ENUM('IDR', 'USD'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};
