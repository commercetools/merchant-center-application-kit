import path from 'path';
import loadConfig from '../src/load-config';
import { validateConfig } from '../src/validations';

describe.each`
  extension | fixtureApp
  ${'.js'}  | ${'app-js'}
  ${'.cjs'} | ${'app-cjs'}
  ${'.mjs'} | ${'app-mjs'}
  ${'.ts'}  | ${'app-ts'}
`('loading config for file extension "$extension"', ({ fixtureApp }) => {
  it('should load and parse the config', async () => {
    const applicationPath = path.join(__dirname, 'fixtures', fixtureApp);
    const config = await loadConfig(applicationPath);
    validateConfig(config);
    expect(config.entryPointUriPath).toBe('test');
  });
});

describe('validation', () => {
  describe('when configuration file is missing or invalid', () => {
    it('should load and parse the config', async () => {
      const applicationPath = path.join(
        __dirname,
        'fixtures',
        'app-without-config'
      );
      await expect(loadConfig(applicationPath)).rejects.toMatchInlineSnapshot(
        `[MissingOrInvalidConfigError: Missing or invalid Custom Application configuration file.]`
      );
    });
  });
});
