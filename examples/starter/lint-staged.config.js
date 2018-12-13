module.exports = {
  '*.md': ['yarn format:md', 'git add'],
  '*.yaml': ['yarn format:yaml', 'git add'],
  '*.js': ['yarn lint:js --reporters=jest-silent-reporter --onlyChanged'],
  '*.css': ['yarn lint:css -- --reporters=jest-silent-reporter --onlyChanged'],
};
