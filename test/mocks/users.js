const { newUser } = require('../data/users');

const userListMock = () =>
  Promise.resolve([
    {
      ...newUser,
      position: 1
    },
    {
      ...newUser,
      position: 6
    },
    {
      ...newUser,
      position: 11
    },
    {
      ...newUser,
      position: 21
    },
    {
      ...newUser,
      position: 31
    },
    {
      ...newUser,
      position: 51
    }
  ]);

module.exports = {
  userListMock
};
