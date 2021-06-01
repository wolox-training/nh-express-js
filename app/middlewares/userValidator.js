const Joi = require('joi');
const errors = require('../errors');
const logger = require('../logger');

const userSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),

  last_name: Joi.string()
    .alphanum()
    .required(),

  email: Joi.string()
    .email()
    .pattern(/^(\w|\.)+@wolox\.(com\.ar|co|mx|cl)$/)
    .required(),

  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    logger.error(error);
    return next(errors.forbidden(error));
  }
  return next();
};

module.exports = {
  validateUser
};
