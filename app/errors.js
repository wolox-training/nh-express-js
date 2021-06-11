const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.CONFLICT = 'conflict';
exports.conflict = message => internalError(message, exports.CONFLICT);

exports.FORBIDDEN = 'forbidden';
exports.forbidden = message => internalError(message, exports.FORBIDDEN);

exports.UNAUTHORIZED = 'unauthorized';
exports.unauthorized = message => internalError(message, exports.UNAUTHORIZED);
