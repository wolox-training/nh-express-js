const jwt = require('jwt-simple');
const errors = require('../errors');
const config = require('../../config');
const { BEARER_ERROR, NO_TOKEN_ERROR, INVALID_TOKEN_ERROR } = require('../../config/constants');

const validateToken = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return next(errors.unauthorized(NO_TOKEN_ERROR));

  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer') return next(errors.unauthorized(BEARER_ERROR));

  if (!token) return next(errors.unauthorized(NO_TOKEN_ERROR));
  try {
    jwt.decode(token, config.common.jwt.secret);
    return next();
  } catch (err) {
    return next(errors.unauthorized(INVALID_TOKEN_ERROR));
  }
};

module.exports = {
  validateToken
};
