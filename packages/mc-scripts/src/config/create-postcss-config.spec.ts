import createPostcssConfig from './create-postcss-config';

const getPluginNames = () =>
  (createPostcssConfig().plugins as { postcssPlugin?: string }[]).map(
    (plugin) => plugin.postcssPlugin
  );

describe('createPostcssConfig', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('when building for production', () => {
    it('should add vendor prefixes with autoprefixer', () => {
      process.env.NODE_ENV = 'production';
      expect(getPluginNames()).toContain('autoprefixer');
    });
  });

  describe.each(['development', 'test'])('when NODE_ENV is %s', (nodeEnv) => {
    // The `development` browser targets need no prefixes. Autoprefixer would
    // change nothing and log "You do not need Autoprefixer anymore".
    it('should not use autoprefixer', () => {
      process.env.NODE_ENV = nodeEnv;
      expect(getPluginNames()).not.toContain('autoprefixer');
    });
  });
});
