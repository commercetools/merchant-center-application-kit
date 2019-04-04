module.exports = (response, additionalCookieParameters = []) => {
  // NOTE: removing the cookie only works if your are running the MC API
  // locally, otherwise the cookie won't get removed as it's set to a
  // proper domain (e.g. commercetools.com), which we can't unset from localhost.
  response.setHeader(
    'Set-Cookie',
    [
      `mcAccessToken=''`, // <-- unset the value
      'Path=/',
      `Expires=${new Date(0).toUTCString()}`, // <-- put a date in the past
      'HttpOnly',
    ]
      .concat(additionalCookieParameters)
      .join('; ')
  );
};
