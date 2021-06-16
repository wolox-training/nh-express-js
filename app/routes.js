const weetsController = require('./controllers/weets');
const usersController = require('./controllers/users');
const { healthCheck } = require('./controllers/healthCheck');
const { validateToken } = require('./middlewares/jwtValidator');
const { validateUser, validateEmailPassword } = require('./middlewares/userValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weet', weetsController.getWeet);
  app.get('/users', validateToken, usersController.listUsers);
  app.post('/users', validateUser, usersController.signUp);
  app.post('/users/sessions', validateEmailPassword, usersController.signIn);
};
