import { ReactNode } from 'react';
import type { RenderOptions } from '@testing-library/react';

import { render } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';

type CustomRenderOptions = {
  locale: string;
  route: string;
  history: MemoryHistory;
} & Omit<RenderOptions, 'queries'>;

const customRender = (
  node: ReactNode,
  {
    locale = 'en',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...rtlOptions
  }: Partial<CustomRenderOptions> = {}
) => ({
  ...render(
    <IntlProvider locale={locale}>
      <Router history={history}>{node}</Router>
    </IntlProvider>,
    rtlOptions
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as renderComponent };
