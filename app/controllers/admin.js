const errors = require('../errors');
const logger = require('../logger');
const usersService = require('../services/users');
const { ADMIN_CONFLICT } = require('../../config/constants');

const signUp = async (req, res, next) => {
  const userData = req.body;
  try {
    const userFound = await usersService.findByEmail(userData.email);
    if (userFound) {
      if (userFound.type === 'admin') {
        logger.error(ADMIN_CONFLICT);
        return next(errors.conflict(ADMIN_CONFLICT));
      }
      const updatedUser = await usersService.update({ ...userFound, type: 'admin' });
      return res.status(200).send(updatedUser);
    }
    const createdUser = await usersService.create({ ...userData, type: 'admin' });
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
