const {
  createPostcssConfig,
} = require('@commercetools-frontend/mc-scripts/postcss');

// Re-export the pre-configured `postcss.config.js`.
// This file is only used by file/scripts in this repository that use `postcss-load-config`.
module.exports = createPostcssConfig();
