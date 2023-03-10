import { createSelector } from 'reselect';
import type {
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
} from '@commercetools-frontend/constants';
import { NOTIFICATION_DOMAINS } from '@commercetools-frontend/constants';
import type { TAppState } from './types';

// These selectors are okay memoization-wise, but once a single notifications
// is added or removed the memoization for all domain selectors is reset
export const selectNotifications = (state: TAppState) => state.notifications;

export const selectGlobalNotifications = createSelector<
  [typeof selectNotifications],
  TAppNotificationGlobal[]
>(
  selectNotifications,
  (notifications) =>
    notifications
      .filter(
        (notification) => notification.domain === NOTIFICATION_DOMAINS.GLOBAL
      )
      // Return only 1 at a time
      .slice(0, 1) as TAppNotificationGlobal[]
);

export const selectPageNotifications = createSelector<
  [typeof selectNotifications],
  TAppNotificationPage[]
>(
  selectNotifications,
  (notifications) =>
    notifications.filter(
      (notification) => notification.domain === NOTIFICATION_DOMAINS.PAGE
    ) as TAppNotificationPage[]
);

export const selectSideNotifications = createSelector<
  [typeof selectNotifications],
  TAppNotificationSide[]
>(
  selectNotifications,
  (notifications) =>
    notifications.filter(
      (notification) => notification.domain === NOTIFICATION_DOMAINS.SIDE
    ) as TAppNotificationSide[]
);
