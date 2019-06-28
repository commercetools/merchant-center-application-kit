import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

const customRender = (node, { locale = 'en', ...rtlOptions } = {}) => ({
  ...render(<IntlProvider locale={locale}>{node}</IntlProvider>, rtlOptions),
});

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
