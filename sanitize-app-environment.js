const serialize = require('serialize-javascript');

const sanitizeAppEnvironment = env => serialize(env, { isJSON: true });

module.exports = sanitizeAppEnvironment;
