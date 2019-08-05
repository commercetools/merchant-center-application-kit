import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

type CustomRenderOptions = {
  locale: string;
} & Omit<RenderOptions, 'queries'>;

const customRender = (
  node: React.ReactNode,
  { locale = 'en', ...rtlOptions }: Partial<CustomRenderOptions> = {}
) => ({
  ...render(<IntlProvider locale={locale}>{node}</IntlProvider>, rtlOptions),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
