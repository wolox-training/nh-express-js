const users = require('./users');
const admin = require('./admin');
const weets = require('./weets');

module.exports = { ...users, ...admin, ...weets };
