module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '86bd507b-282a-4111-b41d-3b032795e809',
        username: 'jontor',
        fullname: 'john wick',
        email: 'user1@example.com',
        password: 'secret',
        created_at: '2022-10-20 17:01:06.936 +0700',
      },
      {
        id: '884b88ca-ad1e-4175-9245-a89c6e540fd8',
        username: 'cajuput',
        fullname: 'john doe',
        email: 'user2@example.com',
        password: 'secret',
        created_at: '2022-10-20 17:01:06.936 +0700',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
