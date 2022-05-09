import path from 'path';
import mri from 'mri';
import glob from 'glob';
// @ts-ignore internal module
import Runner from 'jscodeshift/src/Runner';
import type { TRunnerOptions, TCliFlags, TCliCommandArguments } from './types';

export const run = () => {
  const flags = mri<TCliFlags>(process.argv.slice(2), {
    alias: { help: ['h'] },
    boolean: ['dry-run'],
  });
  const commands = flags._;

  if (commands.length === 0 || (flags.help && commands.length === 0)) {
    console.log(`
Usage: mc-codemod [global-options] [transform] [glob-pattern]

Global options:

  --dry-run             (optional) Executes the command but does not send any mutation request.

Transforms:

  remove-deprecated-modal-level-props     Remove deprecated "level" and "baseZIndex" props from modal page components.
  rename-js-to-jsx                        Rename ".js" files using React JSX syntax to ".jsx".
  `);
    process.exit(0);
  }

  const [transform, globPattern] = commands as TCliCommandArguments;

  const files = glob.sync(globPattern);

  const runJscodeshift = async (
    transformPath: string,
    filePaths: string[],
    options: TRunnerOptions
  ) => {
    await Runner.run(transformPath, filePaths, options);
  };

  const execute = async () => {
    switch (transform) {
      case 'remove-deprecated-modal-level-props':
      case 'rename-js-to-jsx': {
        const transformPath = path.join(
          __dirname,
          `transforms/${transform}.js`
        );

        await runJscodeshift(transformPath, files, {
          extensions: 'tsx,ts,jsx,js',
          ignorePattern: [
            '**/node_modules/**',
            '**/public/**',
            '**/dist/**',
            '**/build/**',
          ],
          parser: 'tsx',
          verbose: 0,
          dry: flags['dry-run'],
        });
        break;
      }
      default:
        throw new Error(`Unknown transform ${transform}.`);
    }
  };

  execute().catch((error) => {
    console.error(error.stack || error.message || error);
    process.exit(1);
  });
};
