const bcrypt = require('bcryptjs');
const { adminUser } = require('../data/admin');

const adminUserMock = () =>
  Promise.resolve({
    ...adminUser,
    password: bcrypt.hashSync(adminUser.password, 12),
    id: 1,
    type: 'admin'
  });

module.exports = {
  adminUserMock
};
