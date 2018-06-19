// If the file is required in "production" mode, we additionally check
// if the MC_ENV is development or not. The only case where this might
// happen is when you start the server locally to test the app in
// production mode.
const isDev =
  process.env.NODE_ENV !== 'production' || process.env.MC_ENV === 'development';

module.exports = function logout(request, response, next) {
  if (request.url.startsWith('/logout')) {
    response.setHeader(
      'Set-Cookie',
      [
        `mcAccessToken=''`, // <-- unset the value
        'Path=/',
        `Expires=${new Date(0).toUTCString()}`, // <-- put a date in the past
        'HttpOnly',
      ]
        .concat(
          isDev
            ? []
            : [
                // eslint-disable-next-line global-require
                `Domain=${require('../env').frontendHost.split('mc.')[1]}`,
                'Secure',
              ]
        )
        .join('; ')
    );
  }
  next();
};
