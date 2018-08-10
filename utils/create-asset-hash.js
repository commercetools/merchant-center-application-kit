const crypto = require('crypto');

module.exports = content => {
  const sha256Hash = crypto
    .createHash('sha256')
    .update(content)
    .digest('base64');

  /**
   * NOTE:
   *   We prefix the hash function type as the browser
   *   needs it when validating the contents of a script against
   *   CSP headers sent.
   *   For more information head to: developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Sources
   */
  return `sha256-${sha256Hash}`;
};
