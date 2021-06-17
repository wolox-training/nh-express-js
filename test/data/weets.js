const { DEFAULT_ERROR } = require('../../app/errors');
const { WEET_LENGTH_ERROR } = require('../../config/constants');

const longWeetError = {
  message: WEET_LENGTH_ERROR,
  internal_code: DEFAULT_ERROR
};

module.exports = {
  longWeetError
};
