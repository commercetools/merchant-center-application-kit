#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const loadPostCssConfig = require('postcss-load-config');

const filesToCompile = [
  'src/components/navbar/navbar-old/navbar.mod.css',
  'src/components/navbar/navbar-new/navbar.mod.css',
];

function getCompiledPaths(cssFilePath) {
  const fileName = path.basename(cssFilePath);
  const [folderPath] = cssFilePath.split(fileName);
  const compiledDir = path.join(folderPath, 'compiled');
  const compiledFileName = fileName.replace('.mod', '');

  if (!fs.existsSync(compiledDir)) {
    fs.mkdirSync(compiledDir);
  }

  return {
    dir: compiledDir,
    fileName: compiledFileName,
  };
}

async function compileCss() {
  const { plugins, options } = await loadPostCssConfig();

  const processor = postcss([
    ...plugins,
    require('postcss-modules')({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      getJSON: function (cssFilePath, json) {
        const compiledPaths = getCompiledPaths(cssFilePath);

        // This file contains the mapping between the class names referenced
        // in the components and the compiled CSS selectors.
        fs.writeFileSync(
          `${path.join(compiledPaths.dir, compiledPaths.fileName)}.json`,
          JSON.stringify(json),
          { encoding: 'utf8' }
        );

        // This file provides the type declaration for the JSON file created above.
        fs.writeFileSync(
          `${path.join(compiledPaths.dir, compiledPaths.fileName)}.json.d.ts`,
          `/* eslint-disable prettier/prettier */
    declare const styles: ${JSON.stringify(json)};
    export default styles;`,
          { encoding: 'utf8' }
        );
      },
    }),
  ]);

  for (const cssPath of filesToCompile) {
    const cssFilePath = path.join(__dirname, '..', cssPath);
    const compiledPaths = getCompiledPaths(cssFilePath);
    const css = fs.readFileSync(cssFilePath, { encoding: 'utf8' });
    const compiled = await processor.process(css, {
      ...options,
      from: cssFilePath,
    });
    fs.writeFileSync(
      path.join(compiledPaths.dir, compiledPaths.fileName),
      compiled.css,
      { encoding: 'utf8' }
    );
  }
}

compileCss().catch((error) => {
  console.error(error);
  process.exit(1);
});
