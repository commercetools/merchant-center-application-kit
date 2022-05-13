import path from 'path';
import fs from 'fs-extra';
import webpack, { type Configuration, type Stats } from 'webpack';
import chalk from 'chalk';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import FileSizeReporter from 'react-dev-utils/FileSizeReporter';
import printBuildError from 'react-dev-utils/printBuildError';
import { packageLocation as applicationStaticAssetsPath } from '@commercetools-frontend/assets';
import paths from '../config/paths';
import createWebpackConfigForProduction from '../config/create-webpack-config-for-production';

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

async function run() {
  const hasWebpackConfig = fs.existsSync(paths.appWebpackConfig);

  // Warn and crash if required files are missing
  if (!checkRequiredFiles([])) {
    process.exit(1);
  }

  // First, read the current file sizes in build directory.
  // This lets us display how much they changed later.
  const previousFileSizes = await measureFileSizesBeforeBuild(paths.appBuild);

  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  fs.emptyDirSync(paths.appBuild);
  // Copy default files
  copyDefaultFiles();

  try {
    // Start the webpack build
    const result = await build();

    if (result.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(result.warnings.join('\n\n'));
      console.log(
        `\nSearch for the ${chalk.underline(
          chalk.yellow('keywords')
        )} to learn more about each warning.`
      );
      console.log(
        `To ignore, add ${chalk.cyan(
          '// eslint-disable-next-line'
        )} to the line before.\n`
      );
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }

    console.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(
      result.stats,
      previousFileSizes,
      paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    );
    console.log();
  } catch (error) {
    if (error instanceof Error) {
      printBuildError(error);
    }
    throw new Error(`Failed to compile`);
  }

  // Create the production build and print the deployment instructions.
  async function build(): Promise<{
    stats: Stats;
    warnings: string[];
  }> {
    console.log('Creating an optimized production build...');

    const config: Configuration = hasWebpackConfig
      ? require(paths.appWebpackConfig)
      : createWebpackConfigForProduction();
    const compiler = webpack(config);

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        let messages;
        if (err) {
          if (!err.message) {
            return reject(err);
          }
          let errMessage = err.message;
          // Add additional information for postcss errors
          if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
            errMessage +=
              '\nCompileError: Begins at CSS selector ' +
              // @ts-ignore
              err['postcssNode'].selector;
          }
          messages = formatWebpackMessages({
            errors: [errMessage],
            warnings: [],
          });
        } else {
          messages = formatWebpackMessages(
            stats?.toJson({ all: false, warnings: true, errors: true })
          );
        }
        if (messages.errors.length) {
          // Only keep the first error. Others are often indicative
          // of the same problem, but confuse the reader with noise.
          if (messages.errors.length > 1) {
            messages.errors.length = 1;
          }
          return reject(new Error(messages.errors.join('\n\n')));
        }
        if (
          process.env.CI &&
          (typeof process.env.CI !== 'string' ||
            process.env.CI.toLowerCase() !== 'false') &&
          messages.warnings.length
        ) {
          console.log(
            chalk.yellow(
              '\nTreating warnings as errors because process.env.CI = true.\n' +
                'Most CI servers set it automatically.\n'
            )
          );
          return reject(new Error(messages.warnings.join('\n\n')));
        }

        return resolve({
          stats: stats!,
          warnings: messages.warnings,
        });
      });
    });
  }

  function copyDefaultFiles() {
    fs.copySync(
      path.join(applicationStaticAssetsPath, 'html-page'),
      paths.appBuild,
      { dereference: true }
    );
  }
}

export default run;
