require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
      timezone: '+07:00',
    },
    timezone: '+07:00',
  },
  stage: {
    url: process.env.DB_URL,
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
      timezone: '+07:00',
    },
    timezone: '+07:00',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    dialect: process.env.DB_CONNECTION,
  },
};
