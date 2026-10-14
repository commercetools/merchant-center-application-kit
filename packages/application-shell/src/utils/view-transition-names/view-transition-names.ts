/**
 * Names the shell chrome for cross-document view transitions, but only while
 * the outgoing page is being captured.
 *
 * The name has to exist on both documents for the browser to morph an element
 * rather than crossfade it. The incoming document carries its half statically,
 * on the HTML skeleton in `mc-html-template`. This side cannot be static:
 * `view-transition-name` makes an element a stacking context for as long as it
 * is set, and neither the navbar nor the main content area was one before.
 * Setting it permanently trapped the navbar's fly-out submenus and the content
 * area's portals, which could no longer paint above the header.
 *
 * Applying the names in `pageswap` keeps the stacking context alive only for
 * the moment of the capture, and clearing them once the transition finishes
 * means a bfcache restore does not come back with stale names.
 */

type TNamedElement = [selector: string, viewTransitionName: string];

// Keep these paired with the `view-transition-name` declarations on the
// skeleton regions in `mc-html-template`'s `loading-screen.css`. Renaming one
// side alone silently degrades to a whole-page crossfade.
const NAMED_ELEMENTS: TNamedElement[] = [
  ['nav[data-mc-sidebar]', 'mc-sidebar'],
  ['[data-test="top-navigation"]', 'mc-header'],
  ['main[data-mc-content]', 'mc-content'],
];

type TPageSwapEvent = Event & {
  viewTransition?: { finished: Promise<unknown> } | null;
};

const applyViewTransitionNames = (event: TPageSwapEvent) => {
  // No transition means this navigation is not animating, so naming anything
  // would only create stacking contexts for no benefit.
  if (!event.viewTransition) return;

  const named = NAMED_ELEMENTS.flatMap(([selector, viewTransitionName]) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return [];

    element.style.viewTransitionName = viewTransitionName;
    return [element];
  });

  const clearNames = () => {
    named.forEach((element) => {
      element.style.viewTransitionName = '';
    });
  };

  // `then(onFulfilled, onRejected)` rather than `finally`: an aborted
  // transition rejects `finished`, and `finally` would re-throw it as an
  // unhandled rejection.
  event.viewTransition.finished.then(clearNames, clearNames);
};

const setupViewTransitionNames = () => {
  const listener = applyViewTransitionNames as EventListener;
  window.addEventListener('pageswap', listener);

  return () => {
    window.removeEventListener('pageswap', listener);
  };
};

export type { TPageSwapEvent };
export { applyViewTransitionNames, NAMED_ELEMENTS };
export default setupViewTransitionNames;
