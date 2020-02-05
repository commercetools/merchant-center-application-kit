module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: 'google-chrome-unstable',
  },
  server: {
    command: 'yarn visual-testing-app:serve',
    port: 3001,
  },
};
