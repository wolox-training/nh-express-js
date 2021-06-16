const { UNAUTHORIZED } = require('../../app/errors');
const { ADMIN_TOKEN_ERROR } = require('../../config/constants');

const adminUser = {
  name: 'Nicolas Alberto',
  last_name: 'Henao Avendano',
  email: 'nicolas.admin@wolox.co',
  password: 'pass1234'
};

const adminUserRes = {
  name: adminUser.name,
  last_name: adminUser.last_name,
  email: adminUser.email
};

const adminTokenError = {
  message: ADMIN_TOKEN_ERROR,
  internal_code: UNAUTHORIZED
};

module.exports = {
  adminUser,
  adminUserRes,
  adminTokenError
};
