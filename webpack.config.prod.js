const path = require('path');
const createWebpackConfigForProduction = require('../../config/create-webpack-config-for-production');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(distPath, 'src/example/for-development.js');

module.exports = createWebpackConfigForProduction({ distPath, entryPoint });
