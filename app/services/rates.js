const logger = require('../logger');
const { databaseError } = require('../errors');
const db = require('../models');
const { weet: weetModel, user: userModel, rate: rateModel } = require('../models');
const { serializeRate } = require('../serializers/rates');
const { RATE_CREATE_ERROR, RATE_FIND_ERROR, RATE_UPDATE_ERROR } = require('../../config/constants');

const create = async (rating_user_id, weet_id, score) => {
  const transaction = await db.sequelize.transaction();
  try {
    const weet = await weetModel.findByPk(weet_id);
    const weetUser = await userModel.findByPk(weet.user_id);
    const newRate = await rateModel.create({ rating_user_id, weet_id, score }, { transaction });
    await weetUser.increment('position', { by: score, transaction });
    await transaction.commit();
    return serializeRate(newRate);
  } catch (error) {
    logger.error(error);
    if (transaction.rollback) await transaction.rollback();
    throw databaseError(RATE_CREATE_ERROR);
  }
};

const find = async (rating_user_id, weet_id) => {
  try {
    const rate = await rateModel.findOne({ where: { rating_user_id, weet_id } });
    return rate ? serializeRate(rate.toJSON()) : rate;
  } catch (error) {
    logger.error(error);
    throw databaseError(RATE_FIND_ERROR);
  }
};

const updateScore = async rate => {
  const transaction = await db.sequelize.transaction();
  try {
    const rateFound = await rateModel.findByPk(rate.id);
    const weet = await weetModel.findByPk(rate.weet_id);
    const weetUser = await userModel.findByPk(weet.user_id);
    await weetUser.increment('position', { by: rate.score - rateFound.dataValues.score, transaction });
    await rateFound.update({ score: rate.score }, { transaction });
    await transaction.commit();
    return serializeRate(rateFound);
  } catch (error) {
    logger.error(error);
    if (transaction.rollback) await transaction.rollback();
    throw databaseError(RATE_UPDATE_ERROR);
  }
};

module.exports = {
  create,
  find,
  updateScore
};
