const JsonSchema = require('@hyperjump/json-schema');
const schemaJson = require('../schema.json');
const fixtureConfigSimple = require('./fixtures/config-simple.json');

const schemaId =
  'https://unpkg.com/@commercetools-frontend/application-config/schema.json';

JsonSchema.add(schemaJson, schemaId);

describe('simple config', () => {
  it('should validate config', async () => {
    const schema = await JsonSchema.get(schemaId);
    const output = await JsonSchema.validate(
      schema,
      fixtureConfigSimple,
      JsonSchema.DETAILED
    );
    if (!output.valid) {
      console.error('Invalid JSON:\n', JSON.stringify(output, null, 2));
    }
    expect(output.valid).toBe(true);
  });
});
