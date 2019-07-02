import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

const customRender = (node, { locale = 'en', ...rtlOptions } = {}) => ({
  ...render(<IntlProvider locale={locale}>{node}</IntlProvider>, rtlOptions),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
