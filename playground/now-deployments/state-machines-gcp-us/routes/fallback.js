module.exports = (request, response) => {
  response.end(
    'This is not a real route. If you are seeing this, you most likely are accessing the custom application\n' +
      'directly from the hosted domain. Instead, you need to access the custom application from within the Merchant Center\n' +
      'domain, as custom applications are served behind a proxy router.\n' +
      'To do so, you need to first register the custom application in Merchant Center > Settings > Custom Applications.'
  );
};
