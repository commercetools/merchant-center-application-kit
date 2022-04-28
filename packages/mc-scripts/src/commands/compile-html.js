/* eslint-disable no-console,global-require,import/no-dynamic-require */
const fs = require('fs');
const mri = require('mri');
const chalk = require('react-dev-utils/chalk');
const { compileHtml } = require('@commercetools-frontend/mc-html-template');
const paths = require('../config/paths');

const flags = mri(process.argv.slice(2), {
  boolean: ['print-security-headers'],
});
const appDirectory = fs.realpathSync(process.cwd());

const generateStatic = async () => {
  console.log('Compiling index.html...');
  const compiled = await compileHtml(paths.appIndexHtmlTemplate);

  fs.writeFileSync(paths.appIndexHtml, compiled.indexHtmlContent, {
    encoding: 'utf8',
  });

  if (flags.transformer) {
    try {
      const transformerPath = require.resolve(flags.transformer, {
        paths: [appDirectory],
      });
      const transformerFn = require(transformerPath);
      transformerFn(compiled);
    } catch (error) {
      throw new Error(
        `Could not load transformer module "${flags.transformer}"\n${error.stack}`
      );
    }
  } else if (flags['print-security-headers']) {
    console.log(JSON.stringify(compiled.headers));
  }

  console.log(chalk.green('Compiled successfully.\n'));
};

generateStatic().catch((error) => {
  if (error && error.message) {
    console.error(error.message);
  }
  process.exit(1);
});
