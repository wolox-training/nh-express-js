const Joi = require('joi');
const errors = require('../errors');
const logger = require('../logger');
const { joiErrorMapper } = require('../helpers/errors');

const rateSchema = Joi.object({
  score: Joi.number()
    .valid(-1, 1)
    .required()
});

const validateRate = (req, res, next) => {
  const { error } = rateSchema.validate(req.body);
  if (error) {
    logger.error(error);
    const mappedErrors = joiErrorMapper(error);
    return next(errors.forbidden(mappedErrors));
  }
  return next();
};

module.exports = {
  validateRate
};
