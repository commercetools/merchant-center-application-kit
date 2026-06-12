type NimbusPluginOptions = {
  cwd?: string;
  UNSAFE_forceStub?: boolean;
};

export function tryLoadNimbusWebpackPlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_NimbusOptionalDependencyPlugin,
    } = require('@commercetools/nimbus/plugins/webpack');
    return new UNSAFE_NimbusOptionalDependencyPlugin(options);
  } catch {
    return null;
  }
}

export function tryLoadNimbusVitePlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_nimbusOptionalDependency,
    } = require('@commercetools/nimbus/plugins/vite');
    return UNSAFE_nimbusOptionalDependency(options);
  } catch {
    return null;
  }
}
