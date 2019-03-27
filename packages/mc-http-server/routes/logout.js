const devAuthentication = require('@commercetools-frontend/mc-dev-authentication');

/* eslint-disable global-require */
// If the file is required in "production" mode, we additionally check
// if the MC_ENV is development or not. The only case where this might
// happen is when you start the server locally to test the app in
// production mode.
const isDev =
  process.env.NODE_ENV !== 'production' || process.env.MC_ENV === 'development';

module.exports = env => (request, response, next) => {
  devAuthentication.routes.logout(
    response,
    isDev
      ? []
      : [
          `Domain=${
            require('../load-options').env.frontendHost.split('mc.')[1]
          }`,
          'Secure',
        ]
  );

  if (!env.servedByProxy) {
    response.render('logout', { env });
  } else {
    next();
  }
};
