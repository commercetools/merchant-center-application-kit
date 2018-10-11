module.exports = {
  '*.md': ['npm run format:md', 'git add'],
  '*.js': ['npm run lint -- --reporters=jest-silent-reporter --onlyChanged'],
};
