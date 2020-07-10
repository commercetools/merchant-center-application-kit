const JsonSchema = require('@hyperjump/json-schema');
const schemaJson = require('../schema.json');
const fixtureConfigSimple = require('./fixtures/config-simple.json');
const fixtureConfigFull = require('./fixtures/config-full.json');
const fixtureConfigForDevelopment = require('./fixtures/config-for-development.json');

const schemaId =
  'https://unpkg.com/@commercetools-frontend/application-config/schema.json';

JsonSchema.add(schemaJson, schemaId);

describe.each`
  name                 | config
  ${'Simple'}          | ${fixtureConfigSimple}
  ${'Full'}            | ${fixtureConfigFull}
  ${'For development'} | ${fixtureConfigForDevelopment}
`('validating config "$name"', ({ config }) => {
  it('should detect the config as valid', async () => {
    const schema = await JsonSchema.get(schemaId);
    const output = await JsonSchema.validate(
      schema,
      config,
      JsonSchema.DETAILED
    );
    if (!output.valid) {
      console.error('Invalid JSON:\n', JSON.stringify(output, null, 2));
    }
    expect(output.valid).toBe(true);
  });
});
