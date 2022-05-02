const createLoginMiddleware = require('./create-login-middleware');
const createLogoutMiddleware = require('./create-logout-middleware');
const createMcDevAuthenticationMiddleware = require('./create-mc-dev-authentication-middleware');

module.exports = {
  createLoginMiddleware,
  createLogoutMiddleware,
  createMcDevAuthenticationMiddleware,
};
