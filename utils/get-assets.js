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
// Assining global callback used by ConfigureIntlProvider to remove
// loading screen.
window.onAppLoaded = function() {
  var appLoaderEl = document.querySelector('#app-loader');

  if (appLoaderEl) {
    appLoaderEl.parentNode.removeChild(appLoaderEl);
  }
};
// Handles showing and hiding different loading screen elements
// Needs to be compatible with all browsers supported without transpilation.
(function() {
  setTimeout(function() {
    var loadingScreenEl = document.querySelector('.loading-screen');
    if (loadingScreenEl) {
      loadingScreenEl.classList.remove('loading-screen--hidden');
    }
  }, 250);

  setTimeout(function() {
    var longLoadingNoticeEl = document.querySelector('.long-loading-notice');
    if (longLoadingNoticeEl) {
      longLoadingNoticeEl.classList.remove('long-loading-notice--hidden');
    }
  }, 2000);
})();
`;

module.exports = () => ({
  loadingScreenScript,
  dataLayerScript,
});
