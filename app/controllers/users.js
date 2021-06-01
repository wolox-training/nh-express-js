const errors = require('../errors');
const logger = require('../logger');
const usersService = require('../services/users');

const signUp = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (userFound) {
      logger.error('The email provided is already linked to an account');
      return next(errors.conflict('The email provided is already linked to an account'));
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
