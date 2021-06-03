const errors = require('../errors');
const logger = require('../logger');
const usersService = require('../services/users');
const { EMAIL_CONFLICT } = require('../../config/constants');

const signUp = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (userFound) {
      logger.error(EMAIL_CONFLICT);
      return next(errors.conflict(EMAIL_CONFLICT));
    }
    const createdUser = await usersService.create(userData);
    logger.info(createdUser.email);
    return res.status(201).send(createdUser);
  } catch (err) {
    logger.error(err.message);
    return next(err);
  }
};

module.exports = {
  signUp
};
