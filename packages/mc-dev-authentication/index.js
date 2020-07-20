const path = require('path');
const middlewares = require('./middlewares');
const routes = require('./routes');
const config = require('./config');

const views = path.join(__dirname, 'views');

module.exports = {
  config,
  middlewares,
  routes,
  views,
};
