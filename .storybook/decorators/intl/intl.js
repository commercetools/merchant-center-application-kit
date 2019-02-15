import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { select } from '@storybook/addon-knobs';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);

const availableLocales = ['en', 'de', 'es'];

export default storyFn => {
  const locale = select('global locale', availableLocales, availableLocales[0]);
  const messages = require(`../../../packages/i18n/data/${locale}.json`);
  return (
    <IntlProvider locale={locale} messages={messages}>
      {storyFn()}
    </IntlProvider>
  );
};
