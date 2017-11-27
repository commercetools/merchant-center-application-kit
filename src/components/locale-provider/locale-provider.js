import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import FetchUser from '../fetch-user';

const getLocaleForUserOrFallbackToBrowser = user => {
  if (user) return user.language;
  return window.navigator.language || 'en';
};

const LocaleProvider = props => (
  <FetchUser>
    {({ user }) => {
      const locale = getLocaleForUserOrFallbackToBrowser(user);

      return (
        <IntlProvider locale={locale} messages={props.i18n[locale]}>
          {props.children}
        </IntlProvider>
      );
    }}
  </FetchUser>
);

LocaleProvider.displayName = 'LocaleProvider';
LocaleProvider.propTypes = {
  i18n: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default LocaleProvider;
