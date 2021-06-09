const { CONFLICT, FORBIDDEN } = require('../../app/errors');
const { EMAIL_CONFLICT, EMAIL_ERROR } = require('../../config/constants');

const newUser = {
  name: 'Nicolas Alberto',
  last_name: 'Henao Avendano',
  email: 'nicolas.henao@wolox.co',
  password: 'pass1234'
};

const newUserRes = {
  name: newUser.name,
  last_name: newUser.last_name,
  email: newUser.email
};

const repeatedEmailError = {
  message: EMAIL_CONFLICT,
  internal_code: CONFLICT
};

const badPassword = 'notgood';

const badPasswordError = {
  message: ['"password" length must be at least 8 characters long'],
  internal_code: FORBIDDEN
};

const externalEmail = 'nicolas.henao@personal.co';

const externalEmailError = {
  message: [EMAIL_ERROR],
  internal_code: FORBIDDEN
};

const missingDataError = {
  message: ['"name" is required'],
  internal_code: FORBIDDEN
};

module.exports = {
  newUser,
  newUserRes,
  repeatedEmailError,
  badPassword,
  badPasswordError,
  externalEmail,
  externalEmailError,
  missingDataError
};
