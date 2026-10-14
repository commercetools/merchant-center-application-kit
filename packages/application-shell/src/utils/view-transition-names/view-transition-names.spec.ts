import setupViewTransitionNames, {
  applyViewTransitionNames,
  NAMED_ELEMENTS,
  type TPageSwapEvent,
} from './view-transition-names';

const renderChrome = () => {
  document.body.innerHTML = `
    <nav data-mc-sidebar></nav>
    <div data-test="top-navigation"></div>
    <main data-mc-content></main>
  `;
  return {
    sidebar: document.querySelector<HTMLElement>('nav[data-mc-sidebar]')!,
    header: document.querySelector<HTMLElement>(
      '[data-test="top-navigation"]'
    )!,
    content: document.querySelector<HTMLElement>('main[data-mc-content]')!,
  };
};

// A `pageswap` event only carries a `viewTransition` when the navigation is
// actually animating.
const pageSwapEvent = (viewTransition: TPageSwapEvent['viewTransition']) =>
  Object.assign(new Event('pageswap'), { viewTransition }) as TPageSwapEvent;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('applyViewTransitionNames', () => {
  it('names the chrome while the outgoing page is captured', () => {
    const chrome = renderChrome();
    let finish!: () => void;
    const finished = new Promise<void>((resolve) => {
      finish = resolve;
    });

    applyViewTransitionNames(pageSwapEvent({ finished }));

    expect(chrome.sidebar.style.viewTransitionName).toBe('mc-sidebar');
    expect(chrome.header.style.viewTransitionName).toBe('mc-header');
    expect(chrome.content.style.viewTransitionName).toBe('mc-content');

    finish();
  });

  // `view-transition-name` makes an element a stacking context for as long as
  // it is set, which trapped the navbar's fly-out submenus and the content
  // portals. Clearing it also means a bfcache restore has no stale names.
  it('clears the names once the transition finishes', async () => {
    const chrome = renderChrome();
    const finished = Promise.resolve();

    applyViewTransitionNames(pageSwapEvent({ finished }));
    await finished;
    // let the `finally` callback run
    await Promise.resolve();

    expect(chrome.sidebar.style.viewTransitionName).toBe('');
    expect(chrome.header.style.viewTransitionName).toBe('');
    expect(chrome.content.style.viewTransitionName).toBe('');
  });

  it('clears the names when the transition is aborted', async () => {
    const chrome = renderChrome();
    const finished = Promise.reject(new Error('aborted'));
    finished.catch(() => {});

    applyViewTransitionNames(pageSwapEvent({ finished }));
    await finished.catch(() => {});
    await Promise.resolve();

    expect(chrome.header.style.viewTransitionName).toBe('');
  });

  it('does nothing when the navigation is not animating', () => {
    const chrome = renderChrome();

    applyViewTransitionNames(pageSwapEvent(null));

    expect(chrome.header.style.viewTransitionName).toBe('');
  });

  it('ignores chrome that is not on the page', () => {
    document.body.innerHTML = '<div data-test="top-navigation"></div>';
    const finished = Promise.resolve();

    expect(() =>
      applyViewTransitionNames(pageSwapEvent({ finished }))
    ).not.toThrow();
  });

  // Each name must match a `view-transition-name` on the skeleton regions in
  // `mc-html-template`. A name only paired on one side silently degrades to a
  // whole-page crossfade, with every test still green.
  it('declares exactly the names the skeleton pairs with', () => {
    expect(NAMED_ELEMENTS.map(([, name]) => name)).toEqual([
      'mc-sidebar',
      'mc-header',
      'mc-content',
    ]);
  });
});

describe('setupViewTransitionNames', () => {
  it('names the chrome on a real pageswap event and detaches on teardown', () => {
    const chrome = renderChrome();
    const teardown = setupViewTransitionNames();

    window.dispatchEvent(pageSwapEvent({ finished: new Promise(() => {}) }));
    expect(chrome.header.style.viewTransitionName).toBe('mc-header');

    chrome.header.style.viewTransitionName = '';
    teardown();

    window.dispatchEvent(pageSwapEvent({ finished: new Promise(() => {}) }));
    expect(chrome.header.style.viewTransitionName).toBe('');
  });
});
