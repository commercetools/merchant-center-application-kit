---
'@commercetools-frontend/mc-html-template': minor
'@commercetools-frontend/mc-scripts': minor
---

Show an application-chrome skeleton while the Merchant Center loads, instead of a bare spinner on a blank page.

Authenticated users now see the real chrome layout — header bar, dark sidebar and content area — from first paint, with no 250ms delay. The skeleton is sized from the same constants the React chrome uses, and honours the persisted pinned-menu state, so nothing shifts when React mounts. Unauthenticated users keep the existing spinner unchanged.

Neither webfont is render-blocking any more, and nor is the application's own CSS on either build. They are loaded as preloads and upgraded once ready, from the loading-screen script rather than an inline `onload` attribute, which the Merchant Center's Content Security Policy does not allow. Because the loading screen's own script no longer waits behind a blocking stylesheet, the skeleton appears considerably earlier on a cold cache. The application is never revealed before its own stylesheets have applied, and never held back by a stylesheet that fails or stalls.

Cross-app navigation opts in to cross-document view transitions where the browser supports them, so it crossfades instead of flashing a blank page. Users who prefer reduced motion keep the benefit without the animation.

Two notes for anyone upgrading. `window.onAppLoaded()` no longer removes the
loading element synchronously in every case: when the application's own
stylesheets are still loading it defers removal until they resolve, bounded by a
two-second deadline after which the application is revealed regardless. Callers
that assumed the element was gone the moment the call returned should check that
assumption. And the two packages now share a build-time marker attribute, so they
are expected to be upgraded together — the repository already versions them in
lockstep, but a project pinning them independently should keep them aligned.

If your application renders `NimbusProvider` itself, pass `loadFonts={false}` so it does not add a second Inter stylesheet — the document now owns font loading, and the `data-nimbus-fonts` marker is kept on the link for that purpose. Leaving it on the default is harmless: the URL is identical, so the extra link resolves from the already-warm request rather than blocking anything.
