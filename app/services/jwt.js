const jwt = require('jwt-simple');
const config = require('../../config');

exports.createToken = payload => jwt.encode(payload, config.common.jwt.secret);
