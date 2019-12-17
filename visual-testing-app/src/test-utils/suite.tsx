import React from 'react';
import { IntlProvider } from 'react-intl';

type Props = {
  locale: string;
  children: React.ReactNode;
};
const defaultProps: Pick<Props, 'locale'> = {
  locale: 'en',
};

const Suite = (props: Props) => (
  <IntlProvider locale={props.locale}>
    <div>{props.children}</div>
  </IntlProvider>
);
Suite.displayName = 'Suite';
Suite.defaultProps = defaultProps;

export default Suite;
