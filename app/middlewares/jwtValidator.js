const jwt = require('jwt-simple');
const errors = require('../errors');
const config = require('../../config');
const {
  BEARER_ERROR,
  NO_TOKEN_ERROR,
  INVALID_TOKEN_ERROR,
  ADMIN_TOKEN_ERROR
} = require('../../config/constants');

const tokenValidation = header => {
  if (!header) return errors.unauthorized(NO_TOKEN_ERROR);
  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer') return errors.unauthorized(BEARER_ERROR);
  if (!token) return errors.unauthorized(NO_TOKEN_ERROR);
  try {
    const payload = jwt.decode(token, config.common.jwt.secret);
    return payload;
  } catch (err) {
    return errors.unauthorized(INVALID_TOKEN_ERROR);
  }
};

const validateToken = (req, res, next) => {
  const header = req.header('Authorization');
  const payload = tokenValidation(header);
  if ('type' in payload) {
    req.user_id = payload.id;
    return next();
  }
  return next(payload);
};

const validateAdmin = (req, res, next) => {
  const header = req.header('Authorization');
  const payload = tokenValidation(header);
  if ('type' in payload) {
    if (payload.type === 'admin') return next();
    return next(errors.unauthorized(ADMIN_TOKEN_ERROR));
  }
  return next(payload);
};

module.exports = {
  validateToken,
  validateAdmin
};
