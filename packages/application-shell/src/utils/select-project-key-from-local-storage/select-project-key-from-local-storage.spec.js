import { localStorage } from '@commercetools-frontend/storage';
import selectProjectKeyFromLocalStorage from './select-project-key-from-local-storage';

jest.mock('@commercetools-frontend/storage');

describe('when project key is cached in localStorage', () => {
  beforeEach(() => {
    localStorage.get.mockReturnValue('foo-1');
  });
  it('should return cached key', () => {
    expect(selectProjectKeyFromLocalStorage()).toBe('foo-1');
  });
});

describe('when project key is not cached in localStorage', () => {
  beforeEach(() => {
    localStorage.get.mockReturnValue(null);
  });
  it('should return default key', () => {
    expect(selectProjectKeyFromLocalStorage()).toBe(null);
  });
});
