import type {
  TAppNotificationGlobal,
  TAppNotificationPage,
  TAppNotificationSide,
  TAppNotificationDomain,
} from '@commercetools-frontend/constants';
import type { TAppState } from './types';

import { createSelector } from 'reselect';
import { NOTIFICATION_DOMAINS } from '@commercetools-frontend/constants';

// These selectors are okay memoization-wise, but once a single notifications
// is added or removed the memoization for all domain selectors is reset
export const selectNotifications = (state: TAppState) => state.notifications;

export const selectGlobalNotifications = createSelector<
  TAppState,
  TAppState['notifications'],
  TAppNotificationGlobal[]
>(
  selectNotifications,
  (notifications) =>
    // https://stackoverflow.com/a/42487130
    (notifications as { domain: TAppNotificationDomain }[])
      .filter(
        (notification) => notification.domain === NOTIFICATION_DOMAINS.GLOBAL
      )
      // Return only 1 at a time
      .slice(0, 1) as TAppNotificationGlobal[]
);

export const selectPageNotifications = createSelector<
  TAppState,
  TAppState['notifications'],
  TAppNotificationPage[]
>(
  selectNotifications,
  (notifications) =>
    // https://stackoverflow.com/a/42487130
    (notifications as { domain: TAppNotificationDomain }[]).filter(
      (notification) => notification.domain === NOTIFICATION_DOMAINS.PAGE
    ) as TAppNotificationPage[]
);

export const selectSideNotifications = createSelector<
  TAppState,
  TAppState['notifications'],
  TAppNotificationSide[]
>(
  selectNotifications,
  (notifications) =>
    // https://stackoverflow.com/a/42487130
    (notifications as { domain: TAppNotificationDomain }[]).filter(
      (notification) => notification.domain === NOTIFICATION_DOMAINS.SIDE
    ) as TAppNotificationSide[]
);
