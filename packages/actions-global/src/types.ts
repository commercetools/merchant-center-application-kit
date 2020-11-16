import type { TNotification } from '@commercetools-frontend/notifications';
import type {
  TAppNotification,
  TAppNotificationDomain,
  TAppNotificationKind,
  TAppNotificationApiError,
  TAppNotificationValuesApiError,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';

export type TShowNotification = TNotification & {
  domain: TAppNotificationDomain;
  kind: TAppNotificationKind;
  text?: string;
};

export type TApiErrorNotification = TNotification &
  TAppNotification<{
    domain: 'page';
    kind: 'api-error';
    values: TAppNotificationValuesApiError;
  }>;

export type TUnexpectedErrorNotification = TNotification &
  TAppNotification<{
    domain: 'page';
    kind: 'unexpected-error';
    values: TAppNotificationValuesUnexpectedError;
  }>;

export type TApiErrorNotificationOptions = {
  errors: TAppNotificationApiError | TAppNotificationApiError[];
};
