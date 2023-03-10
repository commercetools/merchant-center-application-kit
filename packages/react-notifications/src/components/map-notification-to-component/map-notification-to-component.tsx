import { ElementType, ReactNode, createContext, useContext } from 'react';
import type {
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
} from '@commercetools-frontend/constants';

export type Props = {
  mapNotificationToComponent: (
    notification:
      | TAppNotificationGlobal
      | TAppNotificationPage
      | TAppNotificationSide
  ) => ElementType | null;
  children: ReactNode;
};

const Context = createContext<
  (
    notification:
      | TAppNotificationGlobal
      | TAppNotificationPage
      | TAppNotificationSide
  ) => ElementType | null
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

export const useCustomNotificationComponent = () => useContext(Context);

// Exports
export default NotificationProviderForCustomComponent;
