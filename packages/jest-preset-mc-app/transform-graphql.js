const loader = require('graphql-tag/loader');

module.exports = {
  process(sourceText) {
    return { code: loader.call({ cacheable() {} }, sourceText) };
  },
};
