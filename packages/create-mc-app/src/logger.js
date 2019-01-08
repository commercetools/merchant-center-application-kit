const { Signale } = require('signale');

module.exports = new Signale({
  config: { displayBadge: false, displayLabel: false },
  scope: 'create-mc-app',
  types: {
    log: { color: '' },
    success: { color: 'green' },
    error: { color: 'red' },
    info: { color: 'blue' },
    note: { color: 'magenta' },
  },
});
