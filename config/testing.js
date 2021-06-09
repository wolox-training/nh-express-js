exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },
    numbers_api: {
      url: process.env.NUMBERS_API_URL
    },

    session: {
      secret: 'some-super-secret'
    }
  }
};
