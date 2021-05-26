const axios = require('axios');
const config = require('../../config');

const { url } = config.common.numbers_api;

const getNumberFact = () => axios.get(url);

module.exports = {
  getNumberFact
};
