exports.joiErrorMapper = message => message.details.map(error => error.message);
