const path = require('path');
const routes = require('./routes');
const config = require('./config');

const views = path.join(__dirname, 'views');

module.exports = {
  config,
  routes,
  views,
};
