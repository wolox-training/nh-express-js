const { factory } = require('factory-girl');
const { user } = require('../../app/models');

factory.define('user', user, {
  name: factory.chance('first'),
  last_name: factory.chance('last'),
  email: factory.sequence('user.email', n => `dummy.user${n}@wolox.co`),
  password: factory.chance('word', { length: 8 })
});

exports.generateUsers = async n => {
  const users = await factory.createMany('user', n);
  return users.map(u => u.dataValues);
};
