import { useEffect, useState } from 'react';
import { LocationDescriptor } from 'history';
import { matchPath, useLocation } from 'react-router-dom';

const pathWithoutSearch = (path: string | LocationDescriptor) =>
  typeof path === 'string' ? path.split('?')[0] : path.pathname;

const useCustomViewLocatorSelector = (
  customViewLocatorCodes: Record<string, LocationDescriptor> = {}
) => {
  const location = useLocation();
  const [currentCustomViewLocatorCode, setCurrentCustomViewLocatorCode] =
    useState<string>();

  useEffect(() => {
    const customViewLocator = Object.entries(customViewLocatorCodes).find(
      ([, locator]) => {
        return matchPath(location.pathname, {
          // strip the search, otherwise the path won't match
          path: pathWithoutSearch(locator),
          exact: false,
          strict: false,
        });
      }
    );
    setCurrentCustomViewLocatorCode(customViewLocator?.[0]);
  }, [customViewLocatorCodes, location]);

  return { currentCustomViewLocatorCode };
};

export default useCustomViewLocatorSelector;
