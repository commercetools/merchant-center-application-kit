module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  },
  server: {
    command: 'yarn visual-testing-app:preview',
    port: 3000,
    launchTimeout: 10000,
  },
};
