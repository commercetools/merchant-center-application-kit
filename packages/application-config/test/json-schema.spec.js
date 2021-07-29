import validateConfig from '../src/validate-config';
import fixtureConfigSimple from './fixtures/config-simple.json';
import fixtureConfigFull from './fixtures/config-full.json';
import fixtureConfigOidc from './fixtures/config-oidc.json';
import fixtureConfigEnvVariables from './fixtures/config-env-variables.json';
import fixtureConfigIntlVariables from './fixtures/config-intl-variables.json';
import fixtureConfigFilePathVariables from './fixtures/config-file-path-variables.json';

describe.each`
  name                     | config
  ${'Simple'}              | ${fixtureConfigSimple}
  ${'Full'}                | ${fixtureConfigFull}
  ${'OIDC'}                | ${fixtureConfigOidc}
  ${'Env variables'}       | ${fixtureConfigEnvVariables}
  ${'Intl variables'}      | ${fixtureConfigIntlVariables}
  ${'File path variables'} | ${fixtureConfigFilePathVariables}
`('validating config "$name"', ({ config }) => {
  it('should detect the config as valid', () => {
    expect(() => validateConfig(config)).not.toThrowError();
  });
});

describe('invalid configurations', () => {
  it('should validate that "env" is defined', () => {
    expect(() =>
      validateConfig({
        ...fixtureConfigSimple,
        env: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'env'"`
    );
  });
  it('should validate that "env.production" is defined', () => {
    expect(() =>
      validateConfig({
        ...fixtureConfigSimple,
        env: {},
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `"/env must have required property 'production'"`
    );
  });
  it('should validate that "entryPointUriPath" is defined', () => {
    expect(() =>
      validateConfig({
        ...fixtureConfigSimple,
        entryPointUriPath: undefined,
      })
    ).toThrowErrorMatchingInlineSnapshot(
      `" must have required property 'entryPointUriPath'"`
    );
  });
  it('should validate that "cloudIdentifier" is one of the expected values', () => {
    expect(() =>
      validateConfig({
        ...fixtureConfigSimple,
        cloudIdentifier: 'wrong',
      })
    ).toThrowError(
      expect.objectContaining({
        message: expect.stringContaining(
          'cloudIdentifier must be equal to one of the allowed values: gcp-au,gcp-eu,gcp-us,aws-fra,aws-ohio'
        ),
      })
    );
  });
});
