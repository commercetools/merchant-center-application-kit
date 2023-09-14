import path from 'path';
import { LOADED_CONFIG_TYPES } from '../src/constants';
import loadConfig from '../src/load-config';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from '../src/schemas/generated/custom-application.schema';
import type { JSONSchemaForCustomViewConfigurationFiles } from '../src/schemas/generated/custom-view.schema';
import { validateConfig } from '../src/validations';

describe.each`
  extension | fixtureApp
  ${'.js'}  | ${'app-js'}
  ${'.cjs'} | ${'app-cjs'}
  ${'.mjs'} | ${'app-mjs'}
  ${'.ts'}  | ${'app-ts'}
`(
  'loading config for file extension "$extension"',
  ({ fixtureApp }: { fixtureApp: string }) => {
    it('should load and parse the config for Custom Applications', () => {
      const applicationPath = path.join(
        __dirname,
        'fixtures/custom-applications',
        fixtureApp
      );
      const { config } = loadConfig(applicationPath);
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_APPLICATION, config);
      expect(
        (config as JSONSchemaForCustomApplicationConfigurationFiles)
          .entryPointUriPath
      ).toBe('test');
    });
  }
);

describe.each`
  extension | fixtureApp
  ${'.js'}  | ${'view-js'}
  ${'.cjs'} | ${'view-cjs'}
  ${'.mjs'} | ${'view-mjs'}
  ${'.ts'}  | ${'view-ts'}
`(
  'loading config for file extension "$extension"',
  ({ fixtureApp }: { fixtureApp: string }) => {
    it('should load and parse the config for Custom Views', () => {
      const applicationPath = path.join(
        __dirname,
        'fixtures/custom-views',
        fixtureApp
      );
      const { config } = loadConfig(applicationPath);
      validateConfig(LOADED_CONFIG_TYPES.CUSTOM_VIEW, config);
      expect((config as JSONSchemaForCustomViewConfigurationFiles).type).toBe(
        'CustomPanel'
      );
    });
  }
);

describe('validation', () => {
  describe('when configuration file is missing or invalid', () => {
    it('should throw an error', () => {
      const applicationPath = path.join(
        __dirname,
        'fixtures/custom-applications/app-without-config'
      );
      expect(() =>
        loadConfig(applicationPath)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Missing or invalid configuration file."`
      );
    });
  });
});
