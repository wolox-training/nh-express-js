const errors = require('../errors');
const logger = require('../logger');
const usersService = require('../services/users');
const { createToken } = require('../services/jwt');
const { EMAIL_CONFLICT, USER_CREDENTIALS_ERROR } = require('../../config/constants');

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

const signIn = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (!userFound) {
      logger.error(USER_CREDENTIALS_ERROR);
      return next(errors.unauthorized(USER_CREDENTIALS_ERROR));
    }

    const passwordCheck = await usersService.checkPassword(userFound, userData.password);
    if (passwordCheck) {
      const token = createToken(userData.email);
      return res.status(200).send({ token });
    }
    logger.error(USER_CREDENTIALS_ERROR);
    return next(errors.unauthorized(USER_CREDENTIALS_ERROR));
  } catch (err) {
    logger.error(err.message);
    return next(err);
  }
};

module.exports = {
  signUp,
  signIn
};
