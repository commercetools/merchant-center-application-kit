import { useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { useAsyncLocaleData } from '@commercetools-frontend/i18n';

const availableLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN'];

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
    default:
      return locale;
  }
};

const availableLocaleOptions = availableLocales.map((locale) => ({
  label: namifyLocale(locale),
  value: locale,
}));

const loadApplicationMessages = () => Promise.resolve({});

const IntlController = (props) => {
  const [activeLocale, setActiveLocale] = useState('en');
  const { messages } = useAsyncLocaleData({
    locale: activeLocale,
    applicationMessages: loadApplicationMessages,
  });
  return (
    <IntlProvider locale={activeLocale} messages={messages}>
      {props.children({
        locale: activeLocale,
        setLocale: setActiveLocale,
        availableLocaleOptions,
      })}
    </IntlProvider>
  );
};
IntlController.displayName = 'IntlController';
IntlController.propTypes = {
  children: PropTypes.func.isRequired,
};

export default IntlController;
