import canPaintShell from './can-paint-shell';

const loaded = {
  isLoadingLocaleData: false,
  isLoadingUser: false,
  hasPaintedShell: false,
};

describe('canPaintShell', () => {
  it('waits while the catalogue is still loading', () => {
    expect(
      canPaintShell({
        ...loaded,
        isLoadingLocaleData: true,
        loadedLocale: 'de',
        userLanguage: 'de',
      })
    ).toBe(false);
  });

  it('waits while the user is still unknown', () => {
    expect(
      canPaintShell({
        ...loaded,
        isLoadingUser: true,
        loadedLocale: 'de',
        userLanguage: 'de',
      })
    ).toBe(false);
  });

  describe('first paint', () => {
    it('paints on a hint hit', () => {
      expect(
        canPaintShell({ ...loaded, loadedLocale: 'de', userLanguage: 'de' })
      ).toBe(true);
    });

    // The flash this gate exists to prevent: the hint's catalogue is ready and
    // the user has arrived, but the catalogue is not the one they chose.
    it('holds on a hint miss, so the guess is never painted', () => {
      expect(
        canPaintShell({ ...loaded, loadedLocale: 'en', userLanguage: 'de' })
      ).toBe(false);
    });

    it('paints once the user’s own catalogue has loaded', () => {
      expect(
        canPaintShell({ ...loaded, loadedLocale: 'de', userLanguage: 'de' })
      ).toBe(true);
    });

    // A French browser hinted `fr-FR` against `user.language: 'fr-FR'` is a
    // hit, not a miss. Before the hint was mapped with
    // `mapLocaleToIntlLocale`, `getSupportedLocale` degraded `fr` to `en` and
    // sent these users through the miss path.
    it('treats a French browser as a hit rather than holding', () => {
      expect(
        canPaintShell({
          ...loaded,
          loadedLocale: 'fr-FR',
          userLanguage: 'fr-FR',
        })
      ).toBe(true);
    });

    it('paints when the user has no language at all', () => {
      expect(
        canPaintShell({
          ...loaded,
          loadedLocale: 'en',
          userLanguage: undefined,
        })
      ).toBe(true);
    });

    it('paints when the user language is null', () => {
      expect(
        canPaintShell({ ...loaded, loadedLocale: 'en', userLanguage: null })
      ).toBe(true);
    });
  });

  describe('after the first paint', () => {
    // A language change keeps the old catalogue on screen instead of blanking
    // the shell, so the gate must not re-engage.
    it('keeps painting through a locale change', () => {
      expect(
        canPaintShell({
          ...loaded,
          hasPaintedShell: true,
          loadedLocale: 'en',
          userLanguage: 'de',
        })
      ).toBe(true);
    });

    it('still waits for a catalogue load', () => {
      expect(
        canPaintShell({
          ...loaded,
          hasPaintedShell: true,
          isLoadingLocaleData: true,
          loadedLocale: 'de',
          userLanguage: 'de',
        })
      ).toBe(false);
    });
  });
});
