import type { Action } from 'redux';

import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './action-types';

export type TNotification = {
  id?: number;
};

export type TNotificationOnDismiss = (id: TNotification['id']) => void;

export type TNotificationMetaOptions = {
  dismissAfter?: number;
  onDismiss?: TNotificationOnDismiss;
};

export interface TAddNotificationAction<Payload extends TNotification>
  extends Action<typeof ADD_NOTIFICATION> {
  payload: Payload;
  meta?: TNotificationMetaOptions;
  dismiss?: () => void;
}

export interface TRemoveNotificationAction
  extends Action<typeof REMOVE_NOTIFICATION> {
  payload: TNotification;
}

export type TNotificationAction<Payload extends TNotification> =
  | TAddNotificationAction<Payload>
  | TRemoveNotificationAction;

export type TNotificationState<Payload extends TNotification> = Payload[];
