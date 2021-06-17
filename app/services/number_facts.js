const axios = require('axios');
const { defaultError } = require('../errors');
const logger = require('../logger');
const config = require('../../config');
const { WEET_API_ERROR } = require('../../config/constants');

const { url } = config.common.numbers_api;

const getNumberFact = async () => {
  const res = await axios.get(url);
  if (res.status === 200) return res.data;
  logger.error(WEET_API_ERROR + res.status);
  throw defaultError(WEET_API_ERROR + res.status);
};

module.exports = {
  getNumberFact
};
