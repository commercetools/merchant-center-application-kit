describe('tryLoadNimbusWebpackPlugin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns a plugin instance when @commercetools/nimbus is installed', () => {
    const MockPlugin = jest.fn();
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => ({
        UNSAFE_NimbusOptionalDependencyPlugin: MockPlugin,
      }),
      { virtual: true }
    );

    const { tryLoadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    const plugin = tryLoadNimbusWebpackPlugin();

    expect(plugin).toBeInstanceOf(MockPlugin);
    expect(MockPlugin).toHaveBeenCalledWith(undefined);
  });

  it('passes options through to the plugin constructor', () => {
    const MockPlugin = jest.fn();
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => ({
        UNSAFE_NimbusOptionalDependencyPlugin: MockPlugin,
      }),
      { virtual: true }
    );

    const { tryLoadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    const options = { cwd: '/app/root', UNSAFE_forceStub: true };
    tryLoadNimbusWebpackPlugin(options);

    expect(MockPlugin).toHaveBeenCalledWith(options);
  });

  it('returns null when @commercetools/nimbus is not installed', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => {
        const error = Object.assign(new Error('Cannot find module'), {
          code: 'MODULE_NOT_FOUND',
        });
        throw error;
      },
      { virtual: true }
    );

    const { tryLoadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    const plugin = tryLoadNimbusWebpackPlugin();

    expect(plugin).toBeNull();
  });

  it('re-throws non-MODULE_NOT_FOUND errors', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/webpack',
      () => {
        throw new TypeError('Unexpected token');
      },
      { virtual: true }
    );

    const { tryLoadNimbusWebpackPlugin } = require('./try-load-nimbus-plugins');
    expect(() => tryLoadNimbusWebpackPlugin()).toThrow('Unexpected token');
  });
});

describe('tryLoadNimbusVitePlugin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns a plugin when @commercetools/nimbus is installed', () => {
    const mockPlugin = { name: 'nimbus-optional-dependency' };
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => ({
        UNSAFE_nimbusOptionalDependency: jest.fn(() => mockPlugin),
      }),
      { virtual: true }
    );

    const { tryLoadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    const plugin = tryLoadNimbusVitePlugin();

    expect(plugin).toBe(mockPlugin);
  });

  it('passes options through to the plugin factory', () => {
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

    const { tryLoadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    const options = { cwd: '/app/root', UNSAFE_forceStub: true };
    tryLoadNimbusVitePlugin(options);

    expect(mockFactory).toHaveBeenCalledWith(options);
  });

  it('returns null when @commercetools/nimbus is not installed', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => {
        const error = Object.assign(new Error('Cannot find module'), {
          code: 'MODULE_NOT_FOUND',
        });
        throw error;
      },
      { virtual: true }
    );

    const { tryLoadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    const plugin = tryLoadNimbusVitePlugin();

    expect(plugin).toBeNull();
  });

  it('re-throws non-MODULE_NOT_FOUND errors', () => {
    jest.mock(
      '@commercetools/nimbus/plugins/vite',
      () => {
        throw new TypeError('Unexpected token');
      },
      { virtual: true }
    );

    const { tryLoadNimbusVitePlugin } = require('./try-load-nimbus-plugins');
    expect(() => tryLoadNimbusVitePlugin()).toThrow('Unexpected token');
  });
});
