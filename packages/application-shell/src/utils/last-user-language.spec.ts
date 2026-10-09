import { STORAGE_KEYS } from '@commercetools-frontend/constants';
import {
  readLastUserLanguage,
  writeLastUserLanguage,
} from './last-user-language';

describe('last user language', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    window.localStorage.clear();
  });

  it('reads back what it wrote', () => {
    writeLastUserLanguage('de');
    expect(readLastUserLanguage()).toBe('de');
  });

  it('is undefined when nothing was stored', () => {
    expect(readLastUserLanguage()).toBeUndefined();
  });

  it('stores under its own key, not the staff-bar override', () => {
    writeLastUserLanguage('de');
    expect(window.localStorage.getItem(STORAGE_KEYS.LAST_USER_LANGUAGE)).toBe(
      'de'
    );
    expect(
      window.localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_LANGUAGE)
    ).toBeNull();
  });

  // Some privacy modes throw on access rather than returning null, which
  // would take the shell down on a guess that is only an optimisation.
  it('returns undefined when reading throws', () => {
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readLastUserLanguage()).toBeUndefined();
  });

  it('does not throw when writing throws', () => {
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => writeLastUserLanguage('de')).not.toThrow();
  });
});
