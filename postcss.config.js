// NOTE: we use a deep link here because the package is not always built by default.
const createPostcssConfig = require('@commercetools-frontend/mc-scripts/src/config/create-postcss-config');

// Re-export the pre-configured `postcss.config.js`.
// This file is only used by file/scripts in this repository that use `postcss-load-config`.
module.exports = createPostcssConfig();
