const { factory } = require('factory-girl');
const { weet } = require('../../app/models');

factory.define('weet', weet, {
  content: factory.chance('sentence'),
  user_id: 1
});

exports.generateWeets = async n => {
  const weets = await factory.createMany('weet', n);
  return weets.map(w => w.dataValues);
};
