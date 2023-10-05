import { useLayoutEffect } from 'react';
import isNil from 'lodash/isNil';
import { STORAGE_KEYS } from '@commercetools-frontend/constants';

const useLoadingMenuLayoutEffect = () => {
  const cachedIsForcedMenuOpen = window.localStorage.getItem(
    STORAGE_KEYS.IS_FORCED_MENU_OPEN
  );
  const isForcedMenuOpen = isNil(cachedIsForcedMenuOpen)
    ? null
    : (JSON.parse(cachedIsForcedMenuOpen) as boolean);
  useLayoutEffect(() => {
    if (isForcedMenuOpen) document.body.classList.add('body__menu-open');
    if (!isForcedMenuOpen) document.body.classList.remove('body__menu-open');
  }, [isForcedMenuOpen]);
};

export default useLoadingMenuLayoutEffect;
