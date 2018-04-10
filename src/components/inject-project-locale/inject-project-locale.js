import React from 'react';
import { wrapDisplayName } from 'recompose';
import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';

export const defaultDataLocale = 'en';

export const getSelectedDataLocale = () =>
  storage.get(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE) || defaultDataLocale;

const InjectProjectLocale = (localeKey = 'language') => WrappedComponent => {
  const EnhancedComponent = componentProps => (
    <WrappedComponent
      {...componentProps}
      {...{ [localeKey]: getSelectedDataLocale() }}
    />
  );
  EnhancedComponent.displayName = wrapDisplayName(
    WrappedComponent,
    'InjectProjectLocale'
  );
  return EnhancedComponent;
};

export default InjectProjectLocale;
