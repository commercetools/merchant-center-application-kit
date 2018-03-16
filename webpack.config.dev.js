const path = require('path');
const createWebpackConfigForDevelopment = require('../../config/create-webpack-config-for-development');

const distPath = path.resolve(__dirname, 'dist');
const entryPoint = path.resolve(distPath, 'src/example/for-development.js');

module.exports = createWebpackConfigForDevelopment({ distPath, entryPoint });
