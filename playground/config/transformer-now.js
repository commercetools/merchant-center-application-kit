const fs = require('fs');
const path = require('path');

const regions = {
  'gcp-eu': ['bru'],
  'gcp-us': ['sfo'],
};
const headersStaticFiles = { 'cache-control': 's-maxage=31536000,immutable' };

// This transformer will generate a `now.json` config file, based on the application
// environment config and custom headers.
module.exports = ({ env, headers }) => {
  const environmentKey = `${env.env}-${env.location}`;
  const config = {
    version: 2,
    public: true,
    regions: regions[env.location],
    builds: [
      { src: 'public/**', use: '@now/static' },
      { src: 'routes/fallback.js', use: '@now/node' },
    ],
    routes: [
      {
        src: '/(.*).(js.map|js|css|txt|html|png)',
        dest: '/public/$1.$2',
        headers: headersStaticFiles,
      },
      { src: '/(login|logout)', dest: '/routes/fallback.js' },
      {
        src: '/(.*)',
        // eslint-disable-next-line
        headers: Object.assign({ 'Cache-Control': 'no-cache' }, headers),
        dest: '/public/index.html',
      },
    ],
  };
  fs.writeFileSync(
    path.join(
      __dirname,
      `../now-deployments/state-machines-${env.location}/${environmentKey}.now.json`
    ),
    JSON.stringify(config, null, 2),
    { encoding: 'utf8' }
  );
};
