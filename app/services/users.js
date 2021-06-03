const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { user: userModel } = require('../models');

const create = async user => {
  try {
    const hash = await bcrypt.hash(user.password, 12);
    const createdUser = (await userModel.create({ ...user, password: hash })).toJSON();
    // eslint-disable-next-line no-unused-vars
    const { password, ...responseUser } = createdUser;
    return responseUser;
  } catch (error) {
    logger.error(error);
    throw databaseError('Cannot create user');
  }
};

const findByEmail = async email => {
  try {
    const user = await userModel.findOne({ where: { email } });
    return user ? user.toJSON() : user;
  } catch (error) {
    logger.error(error);
    throw databaseError('Cannot get user');
  }
};

module.exports = {
  create,
  findByEmail
};
