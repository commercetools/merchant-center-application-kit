import * as storage from '@commercetools-frontend/storage';
import loadProjectKeyForRedirect from './load-project-key-for-redirect';

jest.mock('@commercetools-frontend/storage');

describe('when project key is cached in localStorage', () => {
  beforeEach(() => {
    storage.get.mockReturnValue('foo-1');
  });
  it('should return cached key', () => {
    expect(loadProjectKeyForRedirect('fallback')).toBe('foo-1');
  });
});

describe('when project key is not cached in localStorage', () => {
  beforeEach(() => {
    storage.get.mockReturnValue();
  });
  it('should return default key', () => {
    expect(loadProjectKeyForRedirect('fallback')).toBe('fallback');
  });
});
