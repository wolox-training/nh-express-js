exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },
    numbers_api: {
      url: process.env.NUMBERS_API_URL
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  },
  isProduction: true
};
