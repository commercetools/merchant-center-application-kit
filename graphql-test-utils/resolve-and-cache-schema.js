const fs = require('fs');
const path = require('path');

const schemas = new Map();

const resolveAndCacheSchema = (targetName) => {
  if (schemas.has(targetName)) {
    return schemas.get(targetName);
  }
  const schemaPath = path.resolve(__dirname, `../schemas/${targetName}.json`);
  if (fs.existsSync(schemaPath)) {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    schemas.set(targetName, schema.data);
    return schema.data;
  }
  throw new Error(`Unknown schema target ${targetName}`);
};

module.exports = resolveAndCacheSchema;
