module.exports = config => (request, response, next) => {
  if (config.enableDevAuthentication) {
    response.render('login', { env: config.env });
  } else {
    next();
  }
};
