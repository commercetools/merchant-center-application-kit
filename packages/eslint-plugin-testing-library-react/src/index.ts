// Inspired by eslint-plugin-jest

import rules from './rules';
import all from './configs/all.json';
import recommended from './configs/recommended.json';

const configs = {
  all,
  recommended,
};

export { rules, configs };
