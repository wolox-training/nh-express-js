const { USER_POSITIONS } = require('../../config/constants');

const serializePosition = position => {
  if (position < 5) {
    return USER_POSITIONS[0];
  } else if (position < 10) {
    return USER_POSITIONS[1];
  } else if (position < 20) {
    return USER_POSITIONS[2];
  } else if (position < 30) {
    return USER_POSITIONS[3];
  } else if (position < 50) {
    return USER_POSITIONS[4];
  }
  return USER_POSITIONS[5];
};

exports.serializeUser = user => ({
  name: user.name,
  last_name: user.last_name,
  email: user.email,
  position: serializePosition(user.position)
});
