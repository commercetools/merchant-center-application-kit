/**
 * NOTE:
 *   These files can not be extracted for now as compiling the `html-template.js`
 *   runs in a webpack-loader context which does not "allow" access to use normal
 *   `fs.readFileSync` as it runs in a different context.
 */
const dataLayerScript = `
dataLayer = [{ 'gtm.start': new Date().getTime(), event: 'gtm.js' }];
`;

const loadingScreenScript = `
window.onAppLoaded = () => {
  const appLoader = document.querySelector('#app-loader');

  if (appLoader) {
    appLoader.remove();
  }
}
(function() {
  setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('loading-screen--hidden');
    }
  }, 250);

  setTimeout(() => {
    const longLoadingNotice = document.querySelector('.long-loading-notice');
    if (longLoadingNotice) {
      longLoadingNotice.classList.remove('long-loading-notice--hidden');
    }
  }, 1000);
})();
`;

module.exports = () => ({
  loadingScreenScript,
  dataLayerScript,
});
