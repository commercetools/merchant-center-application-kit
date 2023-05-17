declare module 'react-dev-utils/checkRequiredFiles' {
  function checkRequiredFiles(files: string[]): boolean;
  export default checkRequiredFiles;
}

declare module 'react-dev-utils/clearConsole' {
  function clearConsole(): void;
  export default clearConsole;
}

declare module 'react-dev-utils/formatWebpackMessages' {
  import type { StatsCompilation } from 'webpack';
  function formatWebpackMessages(json: StatsCompilation): {
    errors: string[];
    warnings: string[];
  };
  export default formatWebpackMessages;
}

declare module 'react-dev-utils/FileSizeReporter' {
  import type { Stats } from 'webpack';
  type OpaqueFileSizes = {
    root: string;
    sizes: Record<string, number>;
  };
  export function measureFileSizesBeforeBuild(
    buildFolder: string
  ): Promise<OpaqueFileSizes>;
  export function printFileSizesAfterBuild(
    stats: Stats,
    previousFileSizes: OpaqueFileSizes,
    buildFolder: string,
    maxBundleGzipSize?: number,
    maxChunkGzipSize?: number
  ): Promise<{
    root: string;
    sizes: Record<string, number>;
  }>;
}

declare module 'react-dev-utils/printBuildError' {
  function printBuildError(error: Error): void;
  export default printBuildError;
}

declare module 'react-dev-utils/openBrowser' {
  function openBrowser(url: string): boolean | number;
  export default openBrowser;
}

declare module 'react-dev-utils/WebpackDevServerUtils' {
  import type { Compiler, Configuration } from 'webpack';
  import webpack from 'webpack';
  export type Urls = {
    lanUrlForConfig?: string;
    lanUrlForTerminal?: string;
    localUrlForTerminal: string;
    localUrlForBrowser: string;
  };
  export type CreateCompilerOptions = {
    /**
     * The name that will be printed to the terminal.
     */
    appName: string;
    /**
     * The webpack configuration options to be provided to the webpack constructor.
     */
    config: Configuration;
    /**
     * To provide the `urls` argument, use `prepareUrls()` described below.
     */
    urls: Urls;
    /**
     * If `true`; yarn instructions will be emitted in the terminal instead of npm.
     */
    useYarn?: boolean | undefined;
    /**
     * Takes the `require('webpack')` entry point.
     */
    webpack: typeof webpack;
  };
  export function choosePort(
    host: string,
    defaultPort: number
  ): Promise<number | null>;
  export function createCompiler(options: CreateCompilerOptions): Compiler;
  export function prepareUrls(
    protocol: string,
    host: string,
    port: number
  ): Urls;
}
