import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const availableLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN'];

const slugifyLocale = locale => {
  switch (locale) {
    case 'frFR':
      return 'fr-FR';
    case 'zhCN':
      return 'zh-CN';
    default:
      return locale;
  }
};

const namifyLocale = locale => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'es':
      return 'Español';
    case 'de':
      return 'Deutsch';
    case 'fr-FR':
      return 'Français';
    case 'zh-CN':
      return '简化字';
    default:
      return locale;
  }
};

const availableLocaleOptions = availableLocales.map(locale => ({
  label: namifyLocale(locale),
  value: locale,
}));

const IntlController = props => {
  const [locale, setLocale] = React.useState('en');
  const messages = require(`../../../../../../i18n/data/${locale}.json`);

  return (
    <IntlProvider locale={slugifyLocale(locale)} messages={messages}>
      {props.children({ locale, setLocale, availableLocaleOptions })}
    </IntlProvider>
  );
};
IntlController.displayName = 'IntlController';
IntlController.propTypes = {
  children: PropTypes.func.isRequired,
};

export default IntlController;
