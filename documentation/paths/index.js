const users = require('./users');
const admin = require('./admin');
const weets = require('./weets');
const rates = require('./rates');

module.exports = { ...users, ...admin, ...weets, ...rates };
