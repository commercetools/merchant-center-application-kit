const { logout } = require('../routes');

const createLogoutMiddleware = (env) => (request, response, next) => {
  logout(response);

  if (Boolean(env.disableAuthRoutesOfDevServer) || env.servedByProxy) {
    next();
  } else {
    response.render('logout', { env });
  }
};

module.exports = createLogoutMiddleware;
