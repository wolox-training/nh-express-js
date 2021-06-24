const weetsController = require('./controllers/weets');
const usersController = require('./controllers/users');
const adminController = require('./controllers/admin');
const ratesController = require('./controllers/rates');
const { healthCheck } = require('./controllers/healthCheck');
const { validateToken, validateAdmin } = require('./middlewares/jwtValidator');
const { validateUser, validateEmailPassword } = require('./middlewares/userValidator');
const { validateRate } = require('./middlewares/rateValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', validateToken, weetsController.getWeets);
  app.post('/weets', validateToken, weetsController.createWeet);
  app.post('/weets/:id/ratings', [validateRate, validateToken], ratesController.rate);
  app.get('/users', validateToken, usersController.listUsers);
  app.post('/users', validateUser, usersController.signUp);
  app.post('/users/sessions', validateEmailPassword, usersController.signIn);
  app.post('/admin/users', [validateUser, validateAdmin], adminController.signUp);
};
