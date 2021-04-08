declare module '@commercetools-uikit/link' {
  import * as React from 'react';
  import * as H from 'history';
  import { MessageDescriptor } from 'react-intl';

  export const version: string;

  // <Link>
  export type LinkProps = {
    tone?: 'primary' | 'inverted';
    isExternal?: boolean;
    to?: string | H.LocationDescriptor;
    intlMessage?: MessageDescriptor;
    children?: React.ReactNode;
  };
  const Link: {
    (props: LinkProps): JSX.Element;
    displayName: string;
    defaultProps: Pick<LinkProps, 'tone' | 'isExternal'>;
  };
  export default Link;
}
