// Needs to be compatible with all browsers supported without transpilation:
// this file is inlined into the HTML document verbatim (only minified).
(function initLoadingScreen() {
  const SPINNER_SHOW_DELAY = 250;
  const LONG_LOADING_DELAY = 2000;
  // Mirrors WINDOW_SIZES.WIDE in application-shell/src/constants.ts.
  const WIDE_VIEWPORT = 1200;
  // Mirrors `staticUrlPathsInPositionOfProjectKey` in
  // `selectProjectKeyFromUrl`, which the shell's NavBar gate depends on.
  // Matching is case-sensitive there, so it must be here too.
  const PROJECT_KEYLESS_SEGMENTS = [
    'login',
    'logout',
    'account',
    'agent-sphere',
  ];
  // Mirrors `PROJECT_KEYLESS_PATHS_IN_PROJECT_CONTEXT` in
  // `application-shell/src/constants.ts`: these paths carry no project key, but
  // the shell resolves one from storage and does render the NavBar.
  const PROJECT_KEYLESS_SEGMENTS_WITH_NAVBAR = ['agent-sphere'];

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      // Storage access throws in some privacy modes. Treat it as absent rather
      // than letting the page end up with no loading state at all.
      return null;
    }
  }

  // Count of app stylesheets (marked `data-mc-css` by the build) still
  // pending. The app must not be revealed while this is above zero, or it
  // flashes unstyled.
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

  // Called by ConfigureIntlProvider once React is ready.
  window.onAppLoaded = function onAppLoaded() {
    isAppReady = true;
    removeAppLoaderWhenReady();
  };

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
    // `linkEl.sheet` is always null on a preload, so completion is detected via
    // Resource Timing instead. This matters: this script can run late enough
    // (deferred behind another blocking stylesheet) that the `load` event on a
    // fast preload has already fired and would otherwise be missed forever.
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
    // Scoped to `as="style"`: other preload types (e.g. `as="fetch"` prefetch
    // hints, `rel="modulepreload"`) share this document and must not be touched.
    const linkEls = document.querySelectorAll(
      'link[rel="preload"][as="style"]'
    );

    for (let index = 0; index < linkEls.length; index += 1) {
      const linkEl = linkEls[index];
      // Only app CSS gates the reveal; fonts already use `display=swap`.
      const isCounted = linkEl.getAttribute('data-mc-css') !== null;

      if (isCounted) {
        window.__CSS_REMAINING__ += 1;
      }

      // Attached before the already-loaded check, so a response arriving
      // mid-loop cannot be missed.
      linkEl.addEventListener('load', function onStylesheetLoad() {
        upgradeStylesheetPreload(linkEl, isCounted);
      });
      linkEl.addEventListener('error', function onStylesheetError() {
        upgradeStylesheetPreload(linkEl, isCounted);
      });

      if (hasAlreadyLoaded(linkEl)) {
        upgradeStylesheetPreload(linkEl, isCounted);
      }
    }
  }

  // Reimplements `selectProjectKeyFromUrl`, because the shell renders the
  // NavBar on a truthy project key rather than on a route allowlist. Deriving
  // the same value is what keeps the skeleton from painting a sidebar the
  // shell then removes: on `/` the key is empty, so there is no NavBar. The
  // exception is `PROJECT_KEYLESS_SEGMENTS_WITH_NAVBAR`, where the shell
  // resolves the key from storage instead of from the URL.
  function selectProjectKeyFromPath(segments) {
    const candidate =
      segments[1] === 'custom-views' ? segments[4] : segments[1];

    return PROJECT_KEYLESS_SEGMENTS.indexOf(candidate) === -1
      ? candidate
      : undefined;
  }

  // Returns null when the bare spinner should be shown instead of the skeleton.
  function selectSkeletonVariant() {
    if (readStorage('isAuthenticated') !== 'true') {
      return null;
    }

    const segments = window.location.pathname.split('/');

    // Custom Views mount their own shell inside a host application and never
    // render the app chrome, so the skeleton would be wrong there.
    if (segments[1] === 'custom-views') {
      return null;
    }

    const hasNavbar =
      Boolean(selectProjectKeyFromPath(segments)) ||
      PROJECT_KEYLESS_SEGMENTS_WITH_NAVBAR.indexOf(segments[1]) !== -1;

    return { hasNavbar: hasNavbar };
  }

  function isNavbarExpanded() {
    // Both checks matter: React collapses the navbar below WIDE_VIEWPORT
    // regardless of the persisted flag, so honouring the flag alone would
    // cause a layout jump on mount.
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
    // Own try/catch so instrumentation can never block the stylesheet upgrade.
    try {
      if (!window.performance || !window.performance.mark) {
        return;
      }

      window.performance.mark('mc:skeleton-visible');

      if (window.performance.measure) {
        // Suffixed rather than reusing the mark name, or getEntriesByName
        // would return two entries of different entryType. `:from-nav`
        // matches the convention the shell's performance-marks module uses,
        // so one query shape reads every mark. Omitting end/duration
        // measures from the time origin to now.
        window.performance.measure('mc:skeleton-visible:from-nav', {
          start: 0,
        });
      }
    } catch (error) {
      // Instrumentation is best-effort.
    }
  }

  function scheduleLongLoadingNotice(containerEl) {
    setTimeout(function showLongLoadingNotice() {
      // Scoped to the revealed container: both variants carry a notice, and an
      // unscoped lookup would always hit the skeleton's copy first.
      const noticeEl =
        containerEl && containerEl.querySelector('.long-loading-notice');

      if (noticeEl) {
        noticeEl.classList.remove('long-loading-notice--hidden');
      }
    }, LONG_LOADING_DELAY);
  }

  upgradeStylesheetPreloads();

  // Hard deadline so a stylesheet that never resolves can't leave the app
  // invisible; it degrades to visible-but-unstyled instead. Upgrades the
  // stragglers before zeroing the counter, or their CSS would never apply even
  // once the response does arrive. `false` skips the decrement, since the
  // counter is zeroed right after.
  setTimeout(function releaseStylesheetGate() {
    const pendingEls = document.querySelectorAll(
      'link[rel="preload"][as="style"]'
    );

    for (let index = 0; index < pendingEls.length; index += 1) {
      upgradeStylesheetPreload(pendingEls[index], false);
    }

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
