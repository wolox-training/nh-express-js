const numberFactsService = require('../services/number_facts');
const errors = require('../errors');
const logger = require('../logger');

const getWeet = async (req, res, next) => {
  const weetResponse = await numberFactsService.getNumberFact();
  if (weetResponse.status === 200) return res.status(200).send(weetResponse.data);
  logger.error(`The service responded with the code ${weetResponse.status}`);
  return next(errors.defaultError(`The service responded with the code ${weetResponse.status}`));
};

module.exports = {
  getWeet
};
