const createLoginMiddleware = (env) => (request, response, next) => {
  if (Boolean(env.disableAuthRoutesOfDevServer) || env.servedByProxy) {
    next();
  } else {
    response.render('login', { env });
  }
};

module.exports = createLoginMiddleware;
