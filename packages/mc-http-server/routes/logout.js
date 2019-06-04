const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');

module.exports = env => (request, response, next) => {
  if (!env.servedByProxy) {
    devAuthentication.routes.logout(response);
    response.render('logout', { env });
  } else {
    next();
  }
};
