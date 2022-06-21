export type TCliGlobalOptions = {
  '--'?: string[];
  env?: string[];
};

export type TCliCommandBuildOptions = {
  'build-only'?: boolean;
};

export type TCliCommandCompileHtmlOptions = {
  transformer?: string;
  'print-security-headers'?: boolean;
};

export type TCliCommandConfigSyncOptions = {
  'dry-run'?: boolean;
};

export type TMcCliAuthToken = {
  token: string;
  expiresAt: number;
};
export type TMcCliCredentialsStorage = Record<string, TMcCliAuthToken>;

/**
 * Configuration options to extend the default configuration
 */
export type TPostcssConfigOptions = {
  /**
   * A list of paths where to look for files used by the `@import` statements.
   */
  postcssImportPaths?: string[];
  /**
   * A list of paths where to look for files with custom media queries.
   */
  postcssCustomMediaPaths?: string[];
  /**
   * A list of paths where to look for files with custom properties.
   */
  postcssCustomPropertiesPaths?: string[];
};

export type TWebpackConfigMode = 'development' | 'production';

export type TWebpackConfigToggleFlagsForDevelopment = {
  /**
   * Allow to disable index.html generation in case it's not necessary (e.g. for Storybook)
   */
  generateIndexHtml?: boolean;
  /**
   * Some environemnts do not require `core-js` and can hence disable
   * it explicitely. This will disable `core-js` for `preset-env` and the
   * `plugin-transform-runtime`.
   */
  disableCoreJs?: boolean;
};

export type TWebpackConfigToggleFlagsForProduction =
  TWebpackConfigToggleFlagsForDevelopment & {
    /**
     * Allow to disable CSS extraction in case it's not necessary (e.g. for Storybook)
     */
    enableExtractCss?: boolean;
    /**
     * Some plugins spawn workers to speed up the build. However this can cause trouble on
     * certain machines local and CI. This flag set to limit or disable any parallelism.
     * Options:
     *    `true` to default to the machines number of CPUs
     *    `false` to disable any paralelism
     *    `int` for a specific number of CPUs
     */
    parallelism: true;
  };

export type TWebpackConfigOptions<ConfigMode extends TWebpackConfigMode> = {
  /**
   * The absolute path to the application entry point file.
   */
  entryPoint?: string;
  /**
   * A list of folders where Webpack should look for source files.
   */
  sourceFolders?: string[];
  /**
   * Options related to Postcss plugins. See `createPostcssConfig` function.
   */
  postcssOptions?: TPostcssConfigOptions;
  /**
   * Options to enable/disable certain functionalities of the Webpack config.
   */
  toggleFlags?: ConfigMode extends 'development'
    ? TWebpackConfigToggleFlagsForDevelopment
    : ConfigMode extends 'production'
    ? TWebpackConfigToggleFlagsForProduction
    : never;
};
