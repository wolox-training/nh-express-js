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

const getWeets = async (req, res, next) => {
  const { per_page, page } = req.query;
  try {
    const weets = await weetsService.getAll(per_page, page);
    return res.status(200).send(weets);
  } catch (err) {
    logger.error(err.message);
    return next(err);
  }
};

module.exports = {
  createWeet,
  getWeets
};
