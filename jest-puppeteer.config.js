module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
  },
  server: {
    command: 'pnpm visual-testing-app:preview',
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
};
