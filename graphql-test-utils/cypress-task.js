const fs = require('fs');
const path = require('path');

module.exports = {
  // This will be available as `cy.task('getGraphQLSchema')`
  getGraphQLSchema(targetName) {
    const schemaPath = path.resolve(
      __dirname,
      `../../schemas/${targetName}.json`
    );
    if (fs.existsSync(schemaPath)) {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      return schema.data;
    }
    throw new Error(`Unknown schema target ${targetName}`);
  },
};
