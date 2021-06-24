const ratesService = require('../services/rates');
const logger = require('../logger');

const rate = async (req, res, next) => {
  const { score } = req.body;
  try {
    const rateFound = await ratesService.find(req.user_id, req.params.id);
    if (rateFound) {
      if (rateFound.score === score) {
        return res.status(200).send(rateFound);
      }
      const updatedRate = await ratesService.updateScore({ ...rateFound, score });
      return res.status(200).send(updatedRate);
    }
    const rateResponse = await ratesService.create(req.user_id, req.params.id, req.body.score);
    logger.info(rateResponse);
    return res.status(201).send(rateResponse);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

module.exports = {
  rate
};
