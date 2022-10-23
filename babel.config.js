module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env'],
    env: {
      production: {
        plugins: [['inline-dotenv', {
          path: '.env.production',
        }]],
      },
      development: {
        plugins: [['inline-dotenv', {
          path: '.env.development',
        }]],
      },
    },
  };
};
