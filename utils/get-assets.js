/**
 * NOTE:
 *   These files can not be extracted for now as compiling the `html-template.js`
 *   runs in a webpack-loader context which does not "allow" access to use normal
 *   `fs.readFileSync` as it runs in a different context.
 */
const dataLayerScript = `
dataLayer = [{ 'gtm.start': new Date().getTime(), event: 'gtm.js' }];
`;

const loadingScreenStyles = `
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.loading-screen--hidden {
  display: none;
}

.loading-screen>*+* {
  margin: 24px 0 0;
}

.loading-spinner {
  width: 32px;
  height: 32px;
}

.long-loading-notice {
  color: #999;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
}

.long-loading-notice--hidden {
  visibility: hidden;
}

.loading-spinner-circle {
  fill: #213c45;
  opacity: 0.2;
}

@keyframes loading-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner-pointer {
  transform-origin: 20px 20px 0;
  animation: loading-spinner-animation 0.5s infinite linear;
}
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
  loadingScreenStyles,
  dataLayerScript,
});
