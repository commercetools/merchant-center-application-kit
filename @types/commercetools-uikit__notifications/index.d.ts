declare module '@commercetools-uikit/notifications' {
  import * as React from 'react';
  import { MessageDescriptor } from 'react-intl';

  export const version: string;

  // <ContentNotification>
  export type ContentNotificationProps = {
    type: 'success' | 'info' | 'warning' | 'error';
    children?: React.ReactNode;
    intlMessage?: MessageDescriptor;
  };
  export const ContentNotification: {
    (props: ContentNotificationProps): JSX.Element;
    displayName: string;
  };
}
