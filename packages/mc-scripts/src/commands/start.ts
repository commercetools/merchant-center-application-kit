import chalk from 'chalk';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import clearConsole from 'react-dev-utils/clearConsole';
import openBrowser from 'react-dev-utils/openBrowser';
import {
  choosePort,
  createCompiler,
  prepareUrls,
  type CreateCompilerOptions,
} from 'react-dev-utils/WebpackDevServerUtils';
import webpack, { type Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import createWebpackConfigForDevelopment from '../config/create-webpack-config-for-development';
import paths from '../config/paths';
import createDevServerConfig from '../config/webpack-dev-server.config';
import doesFileExist from '../utils/does-file-exist';

async function run() {
  const useYarn = doesFileExist(paths.yarnLockFile);
  const isInteractive = process.stdout.isTTY;

  // Whether or not `react-refresh` is enabled, `react-refresh` is not 100% stable at this time,
  // which is why it's disabled by default.

  const hasWebpackConfig = doesFileExist(paths.appWebpackConfig);

  // Warn and crash if required files are missing
  if (!checkRequiredFiles([])) {
    process.exit(1);
  }

  // Tools like Cloud9 rely on this.
  const DEFAULT_PORT = parseInt(String(process.env.HTTP_PORT), 10) || 3001;
  const HOST = process.env.HOST || '0.0.0.0';

  // We attempt to use the default port but if it is busy, we offer the user to
  // run on a different port. `detect()` Promise resolves to the next free port.
  const port = await choosePort(HOST, DEFAULT_PORT);

  if (port == null) {
    console.warn('Could not find a free port. Aborting.');
    // We have not found a port.
    return;
  }

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const appName = require(paths.appPackageJson).name;
  const urls = prepareUrls(protocol, HOST, port);
  // Get webpack config
  const config = (
    hasWebpackConfig
      ? require(paths.appWebpackConfig)
      : createWebpackConfigForDevelopment()
  ) as Configuration;

  // Create a webpack compiler that is configured with custom messages.
  const compiler = createCompiler({
    appName,
    config,
    useYarn,
    webpack,
    urls,
  } as CreateCompilerOptions);

  // Serve webpack assets generated by the compiler over a web sever.
  const serverConfig = await createDevServerConfig({
    port,
    publicPath: config.output?.publicPath as string,
  });
  const devServer = new WebpackDevServer(serverConfig, compiler);

  await devServer.start();

  if (isInteractive) {
    clearConsole();
  }

  console.log(chalk.cyan('Starting the development server...\n'));
  openBrowser(urls.localUrlForBrowser);

  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
}

export default run;
