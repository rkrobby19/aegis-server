require('dotenv').config();

module.exports = {
  dialect: process.env.DB_CONNECTION,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};
