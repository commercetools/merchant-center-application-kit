/* eslint-disable no-console,global-require,import/no-dynamic-require */

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const mri = require('mri');
const {
  packageLocation: applicationStaticAssetsPath,
} = require('@commercetools-frontend/assets');
const { compileHtml } = require('@commercetools-frontend/mc-html-template');

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });

if (flags.help) {
  console.log(`
  Usage: mc-scripts static [options]

  Options:
  --config=<path>           (required) The path to the environment config (defined as a JSON file, e.g. "env.json").
  --csp=<path>              (optional) The path to the custom CSP directives config (defined as a JSON file, e.g. "csp.json").
  --use-local-assets        (optional) If this option is enabled, the "dist/assets" will be used to start the http-server package. This requires that the assets have been built before running this script.
  --transformer=<path>      (optional) The path to a JS module that can be used to generate a configuration for a specific cloud provider (e.g. Netlify, Now).
  `);
  process.exit(0);
}

if (!flags.config) {
  throw new Error('Missing required option "--config"');
}

const useLocalAssets = flags['use-local-assets'];

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  envPath: flags.config,
  cspPath: flags.csp,
  publicAssetsPath: resolveApp('public'),
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
  publicAssetsFolderPath: path.join(
    `${applicationStaticAssetsPath}/html-page/*`
  ),
};

shelljs.rm('-rf', paths.publicAssetsPath);
shelljs.mkdir('-p', paths.publicAssetsPath);
shelljs.cp('-R', paths.publicAssetsFolderPath, paths.publicAssetsPath);

// This should only be used locally, as we're relying on relative paths
// outside of this package.
if (useLocalAssets) {
  // Resolve the absolute path of the caller location. This is necessary
  // to point to files within that folder.
  const assetsFrom = resolveApp('dist/assets');
  // Make sure that the `dist/assets` folder is available.
  try {
    fs.accessSync(assetsFrom, fs.F_OK);
  } catch (error) {
    throw new Error(
      'Could not find "dist/assets" folder. Did you run `yarn build` before starting the server?'
    );
  }
  // Copy the `dist/assets` folder into the `public` folder.
  shelljs.cp('-R', path.join(assetsFrom, '/*'), paths.publicAssetsPath);
}

const generateStatic = async () => {
  const compiled = await compileHtml({
    envPath: paths.envPath,
    cspPath: paths.cspPath,
    publicAssetsPath: paths.publicAssetsPath,
    useLocalAssets,
  });

  fs.writeFileSync(
    path.join(paths.publicAssetsPath, 'index.html'),
    compiled.indexHtmlContent,
    { encoding: 'utf8' }
  );

  if (flags.transformer) {
    try {
      require.resolve(flags.transformer);
    } catch (error) {
      throw new Error(
        `Could not load transformer module "${flags.transformer}"\n${
          error.stack
        }`
      );
    }
    const transformerFn = require(flags.transformer);
    transformerFn(compiled);
  } else {
    console.log(JSON.stringify(compiled.headers));
  }
};

generateStatic().catch(error => {
  console.error(error);
  process.exit(1);
});
