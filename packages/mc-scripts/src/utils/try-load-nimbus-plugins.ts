type NimbusPluginOptions = {
  cwd?: string;
  UNSAFE_forceStub?: boolean;
};

function isModuleNotFound(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND'
  );
}

export function tryLoadNimbusWebpackPlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_NimbusOptionalDependencyPlugin,
    } = require('@commercetools/nimbus/plugins/webpack');
    return new UNSAFE_NimbusOptionalDependencyPlugin(options);
  } catch (error) {
    if (isModuleNotFound(error)) return null;
    throw error;
  }
}

export function tryLoadNimbusVitePlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_nimbusOptionalDependency,
    } = require('@commercetools/nimbus/plugins/vite');
    return UNSAFE_nimbusOptionalDependency(options);
  } catch (error) {
    if (isModuleNotFound(error)) return null;
    throw error;
  }
}
