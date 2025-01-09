import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

type Props = {
  locale?: string;
  children: ReactNode;
};

const Suite = ({ locale = 'en', children }: Props) => (
  <IntlProvider locale={locale}>
    <div>{children}</div>
  </IntlProvider>
);
Suite.displayName = 'Suite';

export default Suite;
