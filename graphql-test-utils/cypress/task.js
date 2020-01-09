const loadSchema = require('../load-schema');

module.exports = {
  // This will be available as `cy.task('getGraphQLSchema')`
  getGraphQLSchema(targetName) {
    return loadSchema(targetName);
  },
};
