const crypto = require('crypto');

module.exports = content => {
  const sha256Hash = crypto
    .createHash('sha256')
    .update(content)
    .digest('base64');

  return `sha256-${sha256Hash}`;
};
