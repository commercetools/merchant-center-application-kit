import path from 'path';
import cac from 'cac';
import glob from 'glob';
// @ts-ignore internal module
import Runner from 'jscodeshift/src/Runner';
import pkgJson from '../package.json';
import type {
  TRunnerOptions,
  TCliGlobalOptions,
  TCliTransformName,
} from './types';

const cli = cac('mc-codemod');

const transforms: { name: TCliTransformName; description: string }[] = [
  {
    name: 'remove-deprecated-modal-level-props',
    description:
      'Remove deprecated "level" and "baseZIndex" props from modal page components.',
  },
  {
    name: 'rename-js-to-jsx',
    description: 'Rename ".js" files using React JSX syntax to ".jsx".',
  },
  {
    name: 'rename-mod-css-to-module-css',
    description: 'Rename ".mod.css" files to ".module.css" and update imports.',
  },
  {
    name: 'redesign-cleanup',
    description:
      'Remove code related to the old design when using the "useTheme" hook, for example the usage of "themedValue".',
  },
  {
    name: 'react-default-props-migration',
    description:
      'Migrate React components using defaultProps as a component property to a destructured object param.',
  },
];

const executeCodemod = async (
  transform: TCliTransformName,
  globPattern: string,
  globalOptions: TCliGlobalOptions
) => {
  const absoluteGlobPattern = path.resolve(globPattern);
  const files = glob.sync(
    path.join(absoluteGlobPattern, '**/*.{ts,tsx,js,jsx}'),
    {
      ignore: [
        '**/node_modules/**',
        '**/public/**',
        '**/dist/**',
        '**/build/**',
      ],
    }
  );

  const runJscodeshift = async (
    transformPath: string,
    filePaths: string[],
    options: TRunnerOptions
  ) => {
    await Runner.run(transformPath, filePaths, options);
  };
  switch (transform) {
    case 'redesign-cleanup':
    case 'react-default-props-migration':
    case 'remove-deprecated-modal-level-props':
    case 'rename-js-to-jsx':
    case 'rename-mod-css-to-module-css': {
      const transformPath = path.join(__dirname, `transforms/${transform}.js`);

      await runJscodeshift(transformPath, files, {
        extensions: 'tsx,ts,jsx,js',
        parser: 'tsx',
        verbose: 0,
        dry: globalOptions.dryRun,
      });
      break;
    }
    default:
      throw new Error(`Unknown transform ${transform}.`);
  }
};

export const run = () => {
  cli.option(
    '--dry-run',
    `(optional) Executes the command but does not send any mutation request.`,
    { default: false }
  );

  // Default command
  cli
    .command('')
    .usage('\n\n  Codemods for updating Custom Applications.')
    .action(() => {
      cli.outputHelp();
    });

  // Transform commands
  transforms.forEach((transform) => {
    cli
      .command(`${transform.name} <glob-pattern>`, transform.description)
      .usage(`${transform.name} <glob-pattern>\n\n  ${transform.description}`)
      .action((globPattern: string, globalOptions: TCliGlobalOptions) =>
        executeCodemod(transform.name, globPattern, globalOptions)
      );
  });

  cli.help();
  cli.version(pkgJson.version);

  cli.parse();
};

export default run;
