const crypto = require('crypto');

module.exports = content => {
  const sha256Hash = crypto
    .createHash('sha256')
    .update(content)
    .digest('base64');

  // NOTE: We prefix the hash function type as the browser
  // needs it when validating the contents of a script against
  // CSP headers sent.
  return `sha256-${sha256Hash}`;
};
