import * as storage from '@commercetools-frontend/storage';
import selectProjectKeyFromLocalStorage from './select-project-key-from-local-storage';

jest.mock('@commercetools-frontend/storage');

describe('when project key is cached in localStorage', () => {
  beforeEach(() => {
    storage.get.mockReturnValue('foo-1');
  });
  it('should return cached key', () => {
    expect(selectProjectKeyFromLocalStorage('fallback')).toBe('foo-1');
  });
});

describe('when project key is not cached in localStorage', () => {
  beforeEach(() => {
    storage.get.mockReturnValue();
  });
  it('should return default key', () => {
    expect(selectProjectKeyFromLocalStorage('fallback')).toBe('fallback');
  });
});
