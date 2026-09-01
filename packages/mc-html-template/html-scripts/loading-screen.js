// Drives the loading screen shown before React mounts:
// - reveals either the authenticated app-chrome skeleton or the bare spinner
// - upgrades non-blocking stylesheet preloads once they have loaded
// - exposes `window.onAppLoaded`, which ConfigureIntlProvider calls when React
//   is ready, and which removes the loader
//
// Needs to be compatible with all browsers supported without transpilation:
// this file is inlined into the HTML document verbatim (only minified).
(function initLoadingScreen() {
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
      // Storage access throws in some privacy modes. Treat it as absent rather
      // than letting the page end up with no loading state at all.
      return null;
    }
  }

  /* ---------------------------------------------------------------- *
   * Loader removal, gated on our own stylesheets                     *
   * ---------------------------------------------------------------- */

  // Count of app stylesheets (marked `data-mc-css` by the build) that have not
  // finished loading. React must not be revealed while any is outstanding or
  // the app flashes unstyled.
  window.__CSS_REMAINING__ = 0;

  let isAppReady = false;

  function removeAppLoader() {
    const appLoaderEl = document.querySelector('#app-loader');

    if (appLoaderEl) {
      appLoaderEl.parentNode.removeChild(appLoaderEl);
    }
  }

  function removeAppLoaderWhenReady() {
    if (isAppReady && window.__CSS_REMAINING__ <= 0) {
      removeAppLoader();
    }
  }

  // Assigning global callback used by ConfigureIntlProvider to remove the
  // loading screen.
  window.onAppLoaded = function onAppLoaded() {
    isAppReady = true;
    removeAppLoaderWhenReady();
  };

  /* ---------------------------------------------------------------- *
   * Non-blocking stylesheet preloads                                 *
   * ---------------------------------------------------------------- */

  function upgradeStylesheetPreload(linkEl, isCounted) {
    if (linkEl.getAttribute('data-mc-upgraded') !== null) {
      return;
    }

    linkEl.setAttribute('data-mc-upgraded', '');
    linkEl.rel = 'stylesheet';

    if (isCounted) {
      window.__CSS_REMAINING__ -= 1;
      removeAppLoaderWhenReady();
    }
  }

  function hasAlreadyLoaded(linkEl) {
    // `linkEl.sheet` is always null on a preload - a preload has no associated
    // stylesheet - so completion is detected through Resource Timing, which is
    // populated for cross-origin responses without Timing-Allow-Origin.
    //
    // This matters more than it looks: this script is a parser-inserted classic
    // script, so it is deferred while a script-blocking stylesheet is
    // outstanding (Inter still is). By the time it runs, same-origin preloads
    // started at parse time have usually already fired `load`, so relying on
    // the event alone would leave them unupgraded forever.
    if (!window.performance || !window.performance.getEntriesByName) {
      return false;
    }

    const entries = window.performance.getEntriesByName(linkEl.href);

    for (let index = 0; index < entries.length; index += 1) {
      if (entries[index].responseEnd > 0) {
        return true;
      }
    }

    return false;
  }

  function upgradeStylesheetPreloads() {
    // Scoped to `as="style"` on purpose: other preload types share this
    // document. FEC-1301 adds `as="fetch"` prefetch hints and Vite already
    // emits `rel="modulepreload"`; rewriting either would break them.
    const linkEls = document.querySelectorAll(
      'link[rel="preload"][as="style"]'
    );

    for (let index = 0; index < linkEls.length; index += 1) {
      const linkEl = linkEls[index];
      // Only app CSS gates the reveal. Fonts use `display=swap`, so gating on a
      // third-party font request would delay the app for no visual benefit.
      const isCounted = linkEl.getAttribute('data-mc-css') !== null;

      if (isCounted) {
        window.__CSS_REMAINING__ += 1;
      }

      // Listeners are attached before the already-loaded check so a response
      // arriving mid-loop cannot be missed.
      linkEl.addEventListener('load', function onStylesheetLoad() {
        upgradeStylesheetPreload(linkEl, isCounted);
      });
      linkEl.addEventListener('error', function onStylesheetError() {
        // A failed stylesheet must never hold the app hostage.
        upgradeStylesheetPreload(linkEl, isCounted);
      });

      if (hasAlreadyLoaded(linkEl)) {
        upgradeStylesheetPreload(linkEl, isCounted);
      }
    }
  }

  /* ---------------------------------------------------------------- *
   * Variant selection                                                *
   * ---------------------------------------------------------------- */

  function getFirstPathSegment() {
    return (window.location.pathname.split('/')[1] || '').toLowerCase();
  }

  // Returns null when the bare spinner should be shown instead of the skeleton.
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
    // the only thing that knows when it actually became visible. Kept in its own
    // try/catch so instrumentation can never prevent the stylesheet upgrade.
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
      // unhidden - an unscoped lookup would hit the skeleton's copy first and
      // leave unauthenticated users without theirs.
      const noticeEl =
        containerEl && containerEl.querySelector('.long-loading-notice');

      if (noticeEl) {
        noticeEl.classList.remove('long-loading-notice--hidden');
      }
    }, LONG_LOADING_DELAY);
  }

  /* ---------------------------------------------------------------- *
   * Run                                                              *
   * ---------------------------------------------------------------- */

  upgradeStylesheetPreloads();

  // Hard deadline. A stylesheet that never resolves must not leave the app
  // invisible: before this gate existed `onAppLoaded` removed the loader
  // unconditionally, so an unbounded wait would be a new availability
  // regression. Degrade to visible-but-unstyled instead.
  setTimeout(function releaseStylesheetGate() {
    window.__CSS_REMAINING__ = 0;
    removeAppLoaderWhenReady();
  }, LONG_LOADING_DELAY);

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
