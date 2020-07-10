const { validate } = require('../src');
const fixtureConfigSimple = require('./fixtures/config-simple.json');
const fixtureConfigFull = require('./fixtures/config-full.json');
const fixtureConfigEnvVariables = require('./fixtures/config-env-variables.json');

describe.each`
  name               | config
  ${'Simple'}        | ${fixtureConfigSimple}
  ${'Full'}          | ${fixtureConfigFull}
  ${'Env variables'} | ${fixtureConfigEnvVariables}
`('validating config "$name"', ({ config }) => {
  it('should detect the config as valid', async () => {
    await validate(config);
  });
});
