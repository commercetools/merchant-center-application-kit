module.exports = env => (request, response, next) => {
  if (!env.servedByProxy) {
    response.render('login', { env });
  } else {
    next();
  }
};
