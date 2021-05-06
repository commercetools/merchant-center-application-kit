/* eslint-disable no-console,global-require,import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const mri = require('mri');
const {
  packageLocation: applicationStaticAssetsPath,
} = require('@commercetools-frontend/assets');
const { compileHtml } = require('@commercetools-frontend/mc-html-template');

const flags = mri(process.argv.slice(2));
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicAssetsPath = resolveApp('public');

const paths = {
  publicAssetsPath,
  // NOTE: previously, for running the prod server locally, we were copying
  // assets into public/assets and compiling the index.html into public folder.
  // To run the app then we would define the cdnUrl as http://localhost:3001/assets,
  // because of the assets subfolder.
  // However, on the webpack-dev-server, the index.html and the bundles are
  // served from the same folder. It's really complicated to get the config right
  // and eventually it's not worth the effort as it just feels like a bloody workaround.
  // Therefore, we do it a bit different now: keep the webpack-dev-server
  // config as is and adjust the mc-script to serve the files the same way.
  // Remember that for normal production usage, assets are served from a CDN.
  // So now we have a flat public folder instead of an assets subfolder.
  // Which means that the 3 static files (favicon, google**.html, robots.txt)
  // need to be put somewhere else (public-assets) and copy into the public
  // folder when the server starts.
  publicAssetsFolderPath: path.join(applicationStaticAssetsPath, 'html-page/*'),
  indexHtmlTemplatePath: path.join(publicAssetsPath, 'index.html.template'),
  indexHtmlPath: path.join(publicAssetsPath, 'index.html'),
};

shelljs.rm('-rf', publicAssetsPath);
shelljs.mkdir('-p', publicAssetsPath);
shelljs.cp('-R', paths.publicAssetsFolderPath, publicAssetsPath);

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const assetsFrom = resolveApp('dist/assets');
// Make sure that the `dist/assets` folder is available.
try {
  fs.accessSync(assetsFrom, fs.F_OK);
} catch (error) {
  throw new Error(
    'Could not find "dist/assets" folder. Did you run `mc-scripts build` first?'
  );
}
// Copy the `dist/assets` folder into the `public` folder.
shelljs.cp('-R', path.join(assetsFrom, '/*'), publicAssetsPath);

const generateStatic = async () => {
  const compiled = await compileHtml(paths.indexHtmlTemplatePath);

  fs.writeFileSync(paths.indexHtmlPath, compiled.indexHtmlContent, {
    encoding: 'utf8',
  });

  if (flags.transformer) {
    try {
      require.resolve(flags.transformer);
    } catch (error) {
      throw new Error(
        `Could not load transformer module "${flags.transformer}"\n${error.stack}`
      );
    }
    const transformerFn = require(flags.transformer);
    transformerFn(compiled);
  } else {
    console.log(JSON.stringify(compiled.headers));
  }
};

generateStatic().catch((error) => {
  console.error(error);
  process.exit(1);
});
