import type {
  TAppNotification,
  TAppNotificationDomain,
  TAppNotificationKind,
  TAppNotificationApiError,
  TAppNotificationValuesApiError,
  TAppNotificationValuesUnexpectedError,
} from '@commercetools-frontend/constants';

export type TShowNotification = {
  domain: TAppNotificationDomain;
  kind: TAppNotificationKind;
  text?: string;
};

export type TApiErrorNotification = TAppNotification<{
  domain: 'page';
  kind: 'api-error';
  values: TAppNotificationValuesApiError;
}>;

export type TUnexpectedErrorNotification = TAppNotification<{
  domain: 'page';
  kind: 'unexpected-error';
  values: TAppNotificationValuesUnexpectedError;
}>;

export type TApiErrorNotificationOptions = {
  errors: TAppNotificationApiError | TAppNotificationApiError[];
};
