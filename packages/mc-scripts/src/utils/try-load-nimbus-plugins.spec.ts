function mockNimbusNotInstalled(entry: string) {
  jest.mock(
    entry,
    () => {
      const error = Object.assign(new Error('Cannot find module'), {
        code: 'MODULE_NOT_FOUND',
      });
      throw error;
    },
    { virtual: true }
  );
}

describe('loadNimbusWebpackPlugin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns nimbus plugin instance when @commercetools/nimbus is installed', () => {
    const MockPlugin = jest.fn();
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => ({
        UNSAFE_NimbusOptionalDependencyPlugin: MockPlugin,
      }),
      { virtual: true }
    );

    const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    const plugin = loadNimbusWebpackPlugin();

    expect(plugin).toBeInstanceOf(MockPlugin);
    expect(MockPlugin).toHaveBeenCalledWith(undefined);
  });

  it('passes options through to the nimbus plugin constructor', () => {
    const MockPlugin = jest.fn();
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => ({
        UNSAFE_NimbusOptionalDependencyPlugin: MockPlugin,
      }),
      { virtual: true }
    );

    const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    const options = { cwd: '/app/root', UNSAFE_forceStub: true };
    loadNimbusWebpackPlugin(options);

    expect(MockPlugin).toHaveBeenCalledWith(options);
  });

  describe('when @commercetools/nimbus is not installed', () => {
    it('returns an mc-scripts fallback stub plugin (not null)', () => {
      mockNimbusNotInstalled('@commercetools/nimbus/plugins/webpack');

      const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
      const plugin = loadNimbusWebpackPlugin();

      expect(plugin).not.toBeNull();
      expect(typeof plugin.apply).toBe('function');
    });

    it('redirects Nimbus runtime imports to the mc-scripts stub via NormalModuleReplacementPlugin', () => {
      mockNimbusNotInstalled('@commercetools/nimbus/plugins/webpack');

      const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
      const applyToCompiler = jest.fn();
      const NormalModuleReplacementPlugin = jest
        .fn()
        .mockImplementation(() => ({ apply: applyToCompiler }));
      const compiler = { webpack: { NormalModuleReplacementPlugin } };

      loadNimbusWebpackPlugin().apply(compiler);

      expect(NormalModuleReplacementPlugin).toHaveBeenCalledTimes(1);
      const [regex, replacement] = NormalModuleReplacementPlugin.mock.calls[0];
      expect(replacement).toBe(
        '@commercetools-frontend/mc-scripts/nimbus-stub'
      );
      // matches nimbus + subpaths, excludes /plugins, ignores siblings
      expect(regex.test('@commercetools/nimbus')).toBe(true);
      expect(regex.test('@commercetools/nimbus/components/Button')).toBe(true);
      expect(regex.test('@commercetools/nimbus/plugins/webpack')).toBe(false);
      expect(regex.test('@commercetools/nimbus-icons')).toBe(false);
      expect(regex.test('react')).toBe(false);
      expect(applyToCompiler).toHaveBeenCalledWith(compiler);
    });

    it('throws a clear error on webpack 4 (no compiler.webpack)', () => {
      mockNimbusNotInstalled('@commercetools/nimbus/plugins/webpack');

      const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
      expect(() => loadNimbusWebpackPlugin().apply({})).toThrow(
        'requires webpack 5+'
      );
    });
  });

  it('re-throws non-MODULE_NOT_FOUND errors', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => {
        throw new TypeError('Unexpected token');
      },
      { virtual: true }
    );

    const { loadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    expect(() => loadNimbusWebpackPlugin()).toThrow('Unexpected token');
  });
});

describe('loadNimbusVitePlugin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns nimbus plugin when @commercetools/nimbus is installed', () => {
    const mockPlugin = { name: 'nimbus-optional-dependency' };
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => ({
        UNSAFE_nimbusOptionalDependency: jest.fn(() => mockPlugin),
      }),
      { virtual: true }
    );

    const { loadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    const plugin = loadNimbusVitePlugin();

    expect(plugin).toBe(mockPlugin);
  });

  it('passes options through to the nimbus plugin factory', () => {
    const mockFactory = jest.fn(() => ({
      name: 'nimbus-optional-dependency',
    }));
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => ({
        UNSAFE_nimbusOptionalDependency: mockFactory,
      }),
      { virtual: true }
    );

    const { loadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    const options = { cwd: '/app/root', UNSAFE_forceStub: true };
    loadNimbusVitePlugin(options);

    expect(mockFactory).toHaveBeenCalledWith(options);
  });

  describe('when @commercetools/nimbus is not installed', () => {
    it('returns an mc-scripts fallback stub plugin (not null)', () => {
      mockNimbusNotInstalled('@commercetools/nimbus/plugins/vite');

      const { loadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
      const plugin = loadNimbusVitePlugin();

      expect(plugin).not.toBeNull();
      expect(plugin.enforce).toBe('pre');
      expect(typeof plugin.resolveId).toBe('function');
      expect(typeof plugin.load).toBe('function');
    });

    it('resolves Nimbus runtime imports to a virtual empty stub, leaving /plugins and siblings alone', () => {
      mockNimbusNotInstalled('@commercetools/nimbus/plugins/vite');

      const { loadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
      const plugin = loadNimbusVitePlugin();

      const stubId = plugin.resolveId('@commercetools/nimbus');
      expect(stubId).toBeTruthy();
      expect(plugin.resolveId('@commercetools/nimbus/components/Button')).toBe(
        stubId
      );
      expect(
        plugin.resolveId('@commercetools/nimbus/plugins/vite')
      ).toBeUndefined();
      expect(plugin.resolveId('@commercetools/nimbus-icons')).toBeUndefined();
      expect(plugin.resolveId('react')).toBeUndefined();

      expect(plugin.load(stubId)).toBe('module.exports = {};');
      expect(plugin.load('some-other-id')).toBeUndefined();
    });
  });

  it('re-throws non-MODULE_NOT_FOUND errors', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => {
        throw new TypeError('Unexpected token');
      },
      { virtual: true }
    );

    const { loadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    expect(() => loadNimbusVitePlugin()).toThrow('Unexpected token');
  });
});
