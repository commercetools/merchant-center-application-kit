import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { branch } from 'recompose';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import { withUser } from '../fetch-user';

const getLocaleForUserOrFallbackToBrowser = user => {
  if (user) return user.language;
  return window.navigator.language || 'en';
};

export const ConfigureIntlProvider = props => {
  const locale = getLocaleForUserOrFallbackToBrowser(props.user);
  return (
    !props.isLoading && (
      <IntlProvider locale={locale} messages={props.i18n[locale]}>
        {props.children}
      </IntlProvider>
    )
  );
};

ConfigureIntlProvider.displayName = 'ConfigureIntlProvider';
ConfigureIntlProvider.propTypes = {
  i18n: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  // Injected
  user: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default branch(
  () => Boolean(storage.get(CORE_STORAGE_KEYS.TOKEN)),
  withUser()
)(ConfigureIntlProvider);
