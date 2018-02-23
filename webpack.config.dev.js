const path = require('path');
const createWebpackConfigForDevelopment = require('../../config/create-webpack-config-for-development');

const entryPoint = path.resolve(__dirname, 'src/example/for-development.js');

module.exports = createWebpackConfigForDevelopment(entryPoint);
