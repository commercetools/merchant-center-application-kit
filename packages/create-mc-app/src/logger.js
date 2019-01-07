const signale = require('signale');

signale.config({
  displayBadge: false,
});

const logger = signale.scope('create-mc-app');

module.exports = logger;
