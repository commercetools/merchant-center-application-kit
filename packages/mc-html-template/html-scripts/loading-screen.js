// Assigning global callback used by ConfigureIntlProvider to remove
// loading screen.
window.onAppLoaded = function onAppLoaded() {
  const appLoaderEl = document.querySelector('#app-loader');

  if (appLoaderEl) {
    appLoaderEl.parentNode.removeChild(appLoaderEl);
  }
};

// Handles showing and hiding different loading screen elements.
// Needs to be compatible with all browsers supported without transpilation:
// this file is inlined into the HTML document verbatim (only minified).
(function initLoadingScreen() {
  // Authenticated loads paint the skeleton immediately: unlike the bare
  // spinner, the skeleton *is* the intended layout, so there is nothing to
  // avoid flashing.
  const SPINNER_SHOW_DELAY = 250;
  const LONG_LOADING_DELAY = 2000;
  // Mirrors WINDOW_SIZES.WIDE in packages/application-shell/src/constants.ts.
  const WIDE_VIEWPORT = 1200;
  // Mirrors `staticUrlPathsInPositionOfProjectKey` in
  // packages/application-shell-connectors: the shell renders no NavBar here.
  const NAVBARLESS_ROUTES = ['login', 'logout', 'account'];

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      // Storage access throws in some privacy modes. Treat it as absent
      // rather than letting the page end up with no loading state at all.
      return null;
    }
  }

  function getFirstPathSegment() {
    return (window.location.pathname.split('/')[1] || '').toLowerCase();
  }

  // Returns null when the bare spinner should be used instead of the skeleton.
  function selectSkeletonVariant() {
    if (readStorage('isAuthenticated') !== 'true') {
      return null;
    }

    const segment = getFirstPathSegment();

    // Custom Views mount their own shell inside a host application and never
    // render the app chrome, so the skeleton would be wrong there.
    if (segment === 'custom-views') {
      return null;
    }

    return { hasNavbar: NAVBARLESS_ROUTES.indexOf(segment) === -1 };
  }

  function isNavbarExpanded() {
    // Two inputs, not one: `useNavbarStateManager` resets `isMenuOpen` to false
    // at or below WINDOW_SIZES.WIDE regardless of the persisted flag, so
    // mirroring only the flag would jump 176px when React restores a collapsed
    // navbar.
    return (
      readStorage('isForcedMenuOpen') === 'true' &&
      window.innerWidth > WIDE_VIEWPORT
    );
  }

  function revealSkeleton(variant) {
    const skeletonEl = document.querySelector('.loading-skeleton');

    if (!skeletonEl) {
      return null;
    }

    if (!variant.hasNavbar) {
      skeletonEl.classList.add('loading-skeleton--no-navbar');
    } else if (isNavbarExpanded()) {
      skeletonEl.classList.add('loading-skeleton--menu-expanded');
    }

    skeletonEl.classList.remove('loading-skeleton--hidden');

    return skeletonEl;
  }

  function markSkeletonVisible() {
    // Part of FEC-1297's `mc:*` mark set, emitted here because the skeleton is
    // the only thing that knows when it actually became visible.
    // Kept in its own try/catch so instrumentation can never prevent the
    // stylesheet upgrade below from running.
    try {
      if (!window.performance || !window.performance.mark) {
        return;
      }

      window.performance.mark('mc:skeleton-visible');

      if (window.performance.measure) {
        // Omitting `end`/`duration` measures from the time origin
        // (navigationStart) to now.
        window.performance.measure('mc:skeleton-visible', { start: 0 });
      }
    } catch (error) {
      // Instrumentation is best-effort.
    }
  }

  function scheduleLongLoadingNotice(containerEl) {
    setTimeout(function showLongLoadingNotice() {
      // Both variants carry a notice, but only the revealed one may be
      // unhidden — an unscoped lookup would hit the skeleton's copy first and
      // leave unauthenticated users without theirs.
      const noticeEl =
        containerEl && containerEl.querySelector('.long-loading-notice');

      if (noticeEl) {
        noticeEl.classList.remove('long-loading-notice--hidden');
      }
    }, LONG_LOADING_DELAY);
  }

  const variant = selectSkeletonVariant();
  const skeletonEl = variant ? revealSkeleton(variant) : null;

  if (skeletonEl) {
    markSkeletonVisible();
    scheduleLongLoadingNotice(skeletonEl);
    return;
  }

  setTimeout(function showLoadingScreen() {
    const loadingScreenEl = document.querySelector('.loading-screen');

    if (loadingScreenEl) {
      loadingScreenEl.classList.remove('loading-screen--hidden');
    }
  }, SPINNER_SHOW_DELAY);

  scheduleLongLoadingNotice(document.querySelector('.loading-screen'));
})();
