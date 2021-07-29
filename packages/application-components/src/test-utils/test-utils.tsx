import type { RenderOptions } from '@testing-library/react';

import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

type CustomRenderOptions = {
  locale: string;
} & Omit<RenderOptions, 'queries'>;

const customRender = (
  node: ReactNode,
  { locale = 'en', ...rtlOptions }: Partial<CustomRenderOptions> = {}
) => ({
  ...render(<IntlProvider locale={locale}>{node}</IntlProvider>, rtlOptions),
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as renderComponent };
