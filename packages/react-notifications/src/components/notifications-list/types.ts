import type {
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
} from '@commercetools-frontend/constants';

export type TAppState = {
  notifications: (
    | TAppNotificationGlobal
    | TAppNotificationPage
    | TAppNotificationSide
  )[];
};
