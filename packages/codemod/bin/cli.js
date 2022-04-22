const path = require('path');
const mri = require('mri');
const glob = require('glob');
const { run: jscodeshift } = require('jscodeshift/src/Runner');

const flags = mri(process.argv.slice(2), {
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

  react-js-to-jsx       Rename ".js" files using React JSX syntax to ".jsx".
  `);
  process.exit(0);
}

const [transform, globPattern] = commands;

const files = glob.sync(globPattern);

switch (transform) {
  case 'react-js-to-jsx':
    break;
  default:
    throw new Error(`Unknown transform ${transform}.`);
}

const transformPath = path.join(__dirname, `../transforms/${transform}.js`);
const options = {
  dry: flags['dry-run'],
};

const execute = async () => {
  await jscodeshift(transformPath, files, options);
};

execute().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
