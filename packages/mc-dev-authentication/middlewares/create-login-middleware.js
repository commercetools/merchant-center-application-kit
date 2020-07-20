const createLoginMiddleware = (env) => (request, response, next) => {
  if (
    String(env.disableAuthRoutesOfDevServer) === 'true' ||
    env.servedByProxy
  ) {
    next();
  } else {
    response.render('login', { env });
  }
};

module.exports = createLoginMiddleware;
