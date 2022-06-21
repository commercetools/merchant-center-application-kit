import fs from 'fs';
import chalk from 'chalk';
import { compileHtml } from '@commercetools-frontend/mc-html-template';
import paths from '../config/paths';
import type { TCliCommandCompileHtmlOptions } from '../types';

const appDirectory = fs.realpathSync(process.cwd());

async function run(options: TCliCommandCompileHtmlOptions = {}) {
  console.log('Compiling index.html...');
  const compiled = await compileHtml(paths.appIndexHtmlTemplate);

  fs.writeFileSync(paths.appIndexHtml, compiled.indexHtmlContent, {
    encoding: 'utf8',
  });

  if (options.transformer) {
    try {
      const transformerPath = require.resolve(options.transformer, {
        paths: [appDirectory],
      });
      const transformerFn = require(transformerPath);
      transformerFn(compiled);
    } catch (error) {
      throw new Error(
        `Could not load transformer module "${options.transformer}"\n${
          error instanceof Error ? error.stack : ''
        }`
      );
    }
  } else if (options['print-security-headers']) {
    console.log(JSON.stringify(compiled.headers));
  }

  console.log(chalk.green('Compiled successfully.\n'));
}

export default run;
