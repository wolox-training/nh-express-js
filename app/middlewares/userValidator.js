const Joi = require('joi');
const errors = require('../errors');
const logger = require('../logger');
const { joiErrorMapper } = require('../helpers/errors');
const { EMAIL_REGEX, EMAIL_ERROR } = require('../../config/constants');

const userSchema = Joi.object({
  name: Joi.string().required(),

  last_name: Joi.string().required(),

  email: Joi.string()
    .email()
    .pattern(EMAIL_REGEX)
    .required()
    .messages({ 'string.pattern.base': EMAIL_ERROR }),

  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

const emailPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(EMAIL_REGEX)
    .required()
    .messages({ 'string.pattern.base': EMAIL_ERROR }),

  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    logger.error(error);
    const mappedErrors = joiErrorMapper(error);
    return next(errors.forbidden(mappedErrors));
  }
  return next();
};

const validateEmailPassword = (req, res, next) => {
  const { error } = emailPasswordSchema.validate(req.body);
  if (error) {
    logger.error(error);
    const mappedErrors = joiErrorMapper(error);
    return next(errors.forbidden(mappedErrors));
  }
  return next();
};

module.exports = {
  validateUser,
  validateEmailPassword
};
