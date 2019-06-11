import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);

const customRender = (node, { locale = 'en', ...rtlOptions } = {}) => ({
  ...render(<IntlProvider locale={locale}>{node}</IntlProvider>, rtlOptions),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
