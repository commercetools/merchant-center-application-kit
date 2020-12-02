declare module '@commercetools-uikit/messages' {
  import * as React from 'react';
  import { MessageDescriptor } from 'react-intl';

  export const version: string;

  export type MessageProps = {
    intlMessage: MessageDescriptor;
    children?: React.ReactNode | null;
  };

  export const ErrorMessage: {
    (props: MessageProps): JSX.Element;
    displayName: string;
  };

  export const WarningMessage: {
    (props: MessageProps): JSX.Element;
    displayName: string;
  };
}
