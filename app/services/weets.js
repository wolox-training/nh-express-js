const logger = require('../logger');
const numberFactsService = require('../services/number_facts');
const { databaseError, defaultError } = require('../errors');
const { weet: weetModel } = require('../models');
const { serializeWeet } = require('../serializers/weets');
const { WEET_CREATE_ERROR, WEET_LENGTH_ERROR } = require('../../config/constants');
const { DEFAULT_ERROR } = require('../errors');

const create = async user_id => {
  try {
    const content = await numberFactsService.getNumberFact();
    if (content.length > 140) throw defaultError(WEET_LENGTH_ERROR);
    const weet = await weetModel.create({ content, user_id });
    return serializeWeet(weet);
  } catch (error) {
    logger.error(error);
    if (error.internalCode === DEFAULT_ERROR) throw error;
    throw databaseError(WEET_CREATE_ERROR);
  }
};

module.exports = {
  create
};
