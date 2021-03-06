exports.config = {
  environment: 'development',
  common: {
    database: {
      name: process.env.DB_NAME_DEV
    },
    numbers_api: {
      url: process.env.NUMBERS_API_URL
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  },
  isDevelopment: true
};
