import { renderHook } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import useCustomViewLocatorSelector from './use-custom-view-locator-selector';

const mockConfig = {
  'locator-a': '/route/locator-a',
  'locator-b': '/route/locator-b',
  'locator-c': '/route/locator-c',
};

const createMockHistory = (location: string) =>
  createMemoryHistory({ initialEntries: [location] });

const render = (location: string) =>
  renderHook(() => useCustomViewLocatorSelector(mockConfig), {
    wrapper: ({ children }) => (
      <Router history={createMockHistory(location)}>{children}</Router>
    ),
  });

describe('useCustomViewLocatorSelector', () => {
  it.each`
    location              | expectedLocator
    ${'/route/locator-a'} | ${'locator-a'}
    ${'/route/locator-b'} | ${'locator-b'}
    ${'/route/locator-c'} | ${'locator-c'}
  `(
    'should return the view locator code based on the current location',
    ({
      location,
      expectedLocator,
    }: {
      location: string;
      expectedLocator: string;
    }) => {
      const { result } = render(location);
      expect(result.current.currentCustomViewLocatorCode).toEqual(
        expectedLocator
      );
    }
  );

  it('should return nothing if the current location does not match anything in provided config', () => {
    const { result } = render('/route/locator-d');
    expect(result.current.currentCustomViewLocatorCode).toBeUndefined();
  });
});
