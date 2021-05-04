import processConfig from './process-headers';

const defaultApplicationConfig = {
  name: 'Application test',
  entryPointUriPath: 'test',
  cloudIdentifier: 'test',
  env: {
    env: 'test',
  },
  headers: {},
};

describe('header string', () => {
  describe('when value is a string', () => {
    it('should convert to a header string', () => {
      const testApplicationConfig = {
        ...defaultApplicationConfig,
        headers: {
          featurePolicies: {
            microphone: "'none'",
            camera: ["'https://example.com'"],
          },
        },
      };

      const processedApplicationConfig = processConfig(testApplicationConfig);

      expect(
        processedApplicationConfig['Feature-Policy']
      ).toMatchInlineSnapshot(
        `"microphone 'none'; camera 'https://example.com'"`
      );
    });
  });

  describe('when value is an array', () => {
    it('should convert to a header string', () => {
      const testApplicationConfig = {
        ...defaultApplicationConfig,
        headers: {
          featurePolicies: {
            microphone: "'none'",
            camera: ["'self'", "'https://example.com'"],
          },
        },
      };

      const processedApplicationConfig = processConfig(testApplicationConfig);

      expect(
        processedApplicationConfig['Feature-Policy']
      ).toMatchInlineSnapshot(
        `"microphone 'none'; camera 'self' 'https://example.com'"`
      );
    });
  });
});

describe('structured header string', () => {
  describe('when value is a string', () => {
    it('should convert to a header string', () => {
      const testApplicationConfig = {
        ...defaultApplicationConfig,
        headers: {
          permissionsPolicies: {
            microphone: '()',
            camera: '(self)',
          },
        },
      };

      const processedApplicationConfig = processConfig(testApplicationConfig);

      expect(
        processedApplicationConfig['Permissions-Policy']
      ).toMatchInlineSnapshot(`"microphone=(), camera=(self)"`);
    });
  });

  describe('when value is an array', () => {
    it('should convert to a header string', () => {
      const testApplicationConfig = {
        ...defaultApplicationConfig,
        headers: {
          permissionsPolicies: {
            microphone: '(self http://example.com)',
          },
        },
      };

      const processedApplicationConfig = processConfig(testApplicationConfig);

      expect(
        processedApplicationConfig['Permissions-Policy']
      ).toMatchInlineSnapshot(`"microphone=(self http://example.com)"`);
    });
  });
});
