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
  it('should load and parse the config', () => {
    const applicationPath = path.join(__dirname, 'fixtures', fixtureApp);
    const config = loadConfig(applicationPath);
    validateConfig(config);
    expect(config.entryPointUriPath).toBe('test');
  });
});

describe('validation', () => {
  describe('when configuration file is missing or invalid', () => {
    it('should load and parse the config', () => {
      const applicationPath = path.join(
        __dirname,
        'fixtures',
        'app-without-config'
      );
      expect(() =>
        loadConfig(applicationPath)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Missing or invalid Custom Application configuration file."`
      );
    });
  });
});
