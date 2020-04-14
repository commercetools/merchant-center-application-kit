import React from 'react';
import isNil from 'lodash/isNil';
import { STORAGE_KEYS } from '../../constants';

const useInitialForcedMenuState = () => {
  const cachedIsForcedMenuOpen = window.localStorage.getItem(
    STORAGE_KEYS.IS_FORCED_MENU_OPEN
  );
  const isForcedMenuOpen = isNil(cachedIsForcedMenuOpen)
    ? null
    : (JSON.parse(cachedIsForcedMenuOpen) as boolean);
  React.useLayoutEffect(() => {
    if (isForcedMenuOpen) document.body.classList.add('body__menu-open');
    if (!isForcedMenuOpen) document.body.classList.remove('body__menu-open');
  }, [isForcedMenuOpen]);
};

export default useInitialForcedMenuState;
