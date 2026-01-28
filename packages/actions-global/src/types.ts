import type { ReactNode } from 'react';
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
  text?: ReactNode;
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
