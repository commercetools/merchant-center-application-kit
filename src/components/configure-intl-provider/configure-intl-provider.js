import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const ConfigureIntlProvider = props => {
  if (!props.locale) return null;
  return (
    <IntlProvider locale={props.locale} messages={props.messages}>
      {props.children}
    </IntlProvider>
  );
};

ConfigureIntlProvider.displayName = 'ConfigureIntlProvider';
ConfigureIntlProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default ConfigureIntlProvider;
