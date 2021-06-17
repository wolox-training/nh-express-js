const weetsService = require('../services/weets');
const logger = require('../logger');

const createWeet = async (req, res, next) => {
  try {
    const weetResponse = await weetsService.create(req.user_id);
    logger.info(weetResponse);
    return res.status(201).send(weetResponse);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

module.exports = {
  createWeet
};
