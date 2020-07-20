const { logout } = require('../routes');

const createLogoutMiddleware = (env) => (request, response, next) => {
  logout(response);

  if (
    String(env.disableAuthRoutesOfDevServer) === 'true' ||
    env.servedByProxy
  ) {
    next();
  } else {
    response.render('logout', { env });
  }
};

module.exports = createLogoutMiddleware;
