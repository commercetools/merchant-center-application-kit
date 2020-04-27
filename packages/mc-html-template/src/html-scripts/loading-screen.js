// Assigning global callback used by ConfigureIntlProvider to remove
// loading screen.
window.onAppLoaded = function onAppLoaded() {
  const appLoaderEl = document.querySelector('#app-loader');

  if (appLoaderEl) {
    appLoaderEl.parentNode.removeChild(appLoaderEl);
  }
};
// Handles showing and hiding different loading screen elements
// Needs to be compatible with all browsers supported without transpilation.
(function removeLoaders() {
  setTimeout(function removeLoadingScreen() {
    const loadingScreenEl = document.querySelector('.loading-screen');
    if (loadingScreenEl) {
      loadingScreenEl.classList.remove('loading-screen--hidden');
    }
  }, 250);

  setTimeout(function removeLongLoadingNotice() {
    const longLoadingNoticeEl = document.querySelector('.long-loading-notice');
    if (longLoadingNoticeEl) {
      longLoadingNoticeEl.classList.remove('long-loading-notice--hidden');
    }
  }, 2000);
})();
