import React from 'react';
import PropTypes from 'prop-types';
import { AppShellProviderForUserTimeZone } from '@commercetools-frontend/application-shell-connectors';
import { IntlProvider } from 'react-intl';

const ConfigureIntlProvider = props => {
  // If there is no locale selected yet, we should avoid rendering
  // to avoid possible FOUC (flash of untranslated content),
  if (!props.locale) return null;
  return (
    <IntlProvider locale={props.locale} messages={props.messages}>
      <AppShellProviderForUserTimeZone timeZone={props.timeZone}>
        {props.children}
      </AppShellProviderForUserTimeZone>
    </IntlProvider>
  );
};

ConfigureIntlProvider.displayName = 'ConfigureIntlProvider';
ConfigureIntlProvider.propTypes = {
  locale: PropTypes.string,
  timeZone: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default ConfigureIntlProvider;
