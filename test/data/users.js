const { CONFLICT, FORBIDDEN, UNAUTHORIZED } = require('../../app/errors');
const {
  EMAIL_CONFLICT,
  EMAIL_ERROR,
  USER_CREDENTIALS_ERROR,
  NO_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  BEARER_ERROR
} = require('../../config/constants');

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

const newUserLogin = {
  email: newUser.email,
  password: newUser.password
};

const unknownEmail = 'john.doe@wolox.co';

const credentialsError = {
  message: USER_CREDENTIALS_ERROR,
  internal_code: UNAUTHORIZED
};

const wrongPassword = 'pass12345';

const externalEmailLogin = {
  message: [EMAIL_ERROR],
  internal_code: UNAUTHORIZED
};

const missingLoginError = {
  message: ['"email" is required'],
  internal_code: UNAUTHORIZED
};

const noTokenError = {
  message: NO_TOKEN_ERROR,
  internal_code: UNAUTHORIZED
};

const invalidToken = 'Bearer notvalid';

const invalidTokenError = {
  message: INVALID_TOKEN_ERROR,
  internal_code: UNAUTHORIZED
};

const notBearerToken = 'Basic notvalid';

const notBearerTokenError = {
  message: BEARER_ERROR,
  internal_code: UNAUTHORIZED
};

module.exports = {
  newUser,
  newUserRes,
  repeatedEmailError,
  badPassword,
  badPasswordError,
  externalEmail,
  externalEmailError,
  missingDataError,
  newUserLogin,
  unknownEmail,
  credentialsError,
  wrongPassword,
  externalEmailLogin,
  missingLoginError,
  noTokenError,
  invalidToken,
  invalidTokenError,
  notBearerToken,
  notBearerTokenError
};
