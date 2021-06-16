const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { databaseError } = require('../errors');
const { user: userModel } = require('../models');
const { serializeUser } = require('../serializers/users');
const { pagination } = require('../helpers/pagination');
const { USER_CREATE_ERROR, USER_FIND_ERROR, LIST_USERS_ERROR } = require('../../config/constants');

const create = async user => {
  try {
    const hash = await bcrypt.hash(user.password, 12);
    const createdUser = (await userModel.create({ ...user, password: hash })).toJSON();
    return serializeUser(createdUser);
  } catch (error) {
    logger.error(error);
    throw databaseError(USER_CREATE_ERROR);
  }
};

const findByEmail = async email => {
  try {
    const user = await userModel.findOne({ where: { email } });
    return user ? user.toJSON() : user;
  } catch (error) {
    logger.error(error);
    throw databaseError(USER_FIND_ERROR);
  }
};

const checkPassword = (user, password) => bcrypt.compare(password, user.password);

const getAll = async (per_page, page) => {
  try {
    const users = await pagination(userModel, per_page, page);
    return users.map(user => serializeUser(user));
  } catch (error) {
    logger.error(error);
    throw databaseError(LIST_USERS_ERROR);
  }
};

const update = async user => {
  const userFound = await userModel.findByPk(user.id);
  const userUpdated = await userFound.update(user);
  return serializeUser(userUpdated);
};

module.exports = {
  create,
  findByEmail,
  checkPassword,
  getAll,
  update
};
