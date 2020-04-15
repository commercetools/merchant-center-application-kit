import type {
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
} from '@commercetools-frontend/constants';

import React from 'react';

export type Props = {
  mapNotificationToComponent: (
    notification:
      | TAppNotificationGlobal
      | TAppNotificationPage
      | TAppNotificationSide
  ) => React.ElementType | null;
  children: React.ReactNode;
};

const Context = React.createContext<
  (
    notification:
      | TAppNotificationGlobal
      | TAppNotificationPage
      | TAppNotificationSide
  ) => React.ElementType | null
>(() => null);

function NotificationProviderForCustomComponent(props: Props) {
  return (
    <Context.Provider value={props.mapNotificationToComponent}>
      {props.children}
    </Context.Provider>
  );
}
NotificationProviderForCustomComponent.displayName =
  'NotificationProviderForCustomComponent';

export const useCustomNotificationComponent = () => React.useContext(Context);

// Exports
export default NotificationProviderForCustomComponent;
