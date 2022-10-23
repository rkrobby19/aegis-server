require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  node_env: process.env.NODE_ENV,
  dialect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbSource: process.env.DB_SOURCE,
  define: {
    freezeTableName: true,
  },
};
