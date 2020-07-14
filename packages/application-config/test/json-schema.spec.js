const { validateConfig } = require('../src');
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
    await validateConfig(config);
  });
});

describe('invalid configurations', () => {
  it('should validate that "env" is defined', () =>
    expect(
      validateConfig({
        ...fixtureConfigSimple,
        env: undefined,
      })
    ).rejects.toMatchInlineSnapshot(
      `[Error:  should have required property 'env']`
    ));
  it('should validate that "env.production" is defined', () =>
    expect(
      validateConfig({
        ...fixtureConfigSimple,
        env: {},
      })
    ).rejects.toMatchInlineSnapshot(
      `[Error: .env should have required property 'production']`
    ));
  it('should validate that "entryPointUriPath" is defined', () =>
    expect(
      validateConfig({
        ...fixtureConfigSimple,
        entryPointUriPath: undefined,
      })
    ).rejects.toMatchInlineSnapshot(
      `[Error:  should have required property 'entryPointUriPath']`
    ));
  it('should validate that "cloudIdentifier" is one of the expected values', () =>
    expect(
      validateConfig({
        ...fixtureConfigSimple,
        cloudIdentifier: 'wrong',
      })
    ).rejects.toMatchInlineSnapshot(`
      [Error: .cloudIdentifier should match pattern "(\\$\\{env:\\w+\\})+"
      .cloudIdentifier should be equal to one of the allowed values: gcp-au,gcp-eu,gcp-us,aws-fra,aws-ohio
      .cloudIdentifier should match exactly one schema in oneOf]
    `));
});
