import isEarlyShellRenderingEnabled from './is-early-shell-rendering-enabled';

describe('isEarlyShellRenderingEnabled', () => {
  it('is off when the option is not set', () => {
    expect(isEarlyShellRenderingEnabled({})).toBe(false);
  });

  it.each([true, 'true'])('is on for %p', (value) => {
    expect(
      isEarlyShellRenderingEnabled({ enableEarlyShellRendering: value })
    ).toBe(true);
  });

  // An unresolved placeholder reaches `window.app` verbatim.
  // eslint-disable-next-line no-template-curly-in-string
  it.each([false, 'false', '', '${env:ENABLE_EARLY_SHELL_RENDERING}'])(
    'is off for %p',
    (value) => {
      expect(
        isEarlyShellRenderingEnabled({ enableEarlyShellRendering: value })
      ).toBe(false);
    }
  );
});
