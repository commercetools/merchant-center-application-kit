import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';

const availableLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];

const namifyLocale = (locale) => {
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
    case 'ja':
      return '日本人';
    default:
      return locale;
  }
};

const availableLocaleOptions = availableLocales.map((locale) => ({
  label: namifyLocale(locale),
  value: locale,
}));

const IntlController = (props) => {
  const [activeLocale, setActiveLocale] = React.useState('en');
  return (
    <AsyncLocaleData locale={activeLocale} applicationMessages={{}}>
      {({ locale, messages }) => (
        <IntlProvider locale={locale || activeLocale} messages={messages}>
          {props.children({
            locale: locale || activeLocale,
            setLocale: setActiveLocale,
            availableLocaleOptions,
          })}
        </IntlProvider>
      )}
    </AsyncLocaleData>
  );
};
IntlController.displayName = 'IntlController';
IntlController.propTypes = {
  children: PropTypes.func.isRequired,
};

export default IntlController;
