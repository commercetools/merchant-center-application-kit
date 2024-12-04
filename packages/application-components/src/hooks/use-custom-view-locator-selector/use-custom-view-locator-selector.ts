import { LocationDescriptor } from 'history';
import { matchPath, useLocation } from 'react-router-dom';

const pathWithoutSearch = (path: string | LocationDescriptor) =>
  typeof path === 'string' ? path.split('?')[0] : path.pathname;

const useCustomViewLocatorSelector = (
  customViewLocatorCodes: Record<string, LocationDescriptor> = {}
) => {
  const location = useLocation();

  const customViewLocator = Object.entries(customViewLocatorCodes).find(
    ([, locator]) => {
      return matchPath(pathWithoutSearch(locator) || '', location.pathname);
    }
  );

  return { currentCustomViewLocatorCode: customViewLocator?.[0] };
};

export default useCustomViewLocatorSelector;
