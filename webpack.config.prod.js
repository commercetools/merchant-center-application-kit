const path = require('path');
const createWebpackConfigForProduction = require('../../config/create-webpack-config-for-production');

const entryPoint = path.resolve(__dirname, 'src/example/for-development.js');

module.exports = createWebpackConfigForProduction(entryPoint);
