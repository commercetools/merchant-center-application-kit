import { createSelector } from 'reselect';
import { DOMAINS } from '@commercetools-local/constants';

export const isNotificationVisible = (activePlugin, notificationPlugin) => {
  // When the notification is global we always show it
  if (!notificationPlugin) return true;

  // when no plugin is active we hide all plugin notifications
  if (!activePlugin) return false;

  // When a plugin is active we only show notifications of that plugin
  return activePlugin === notificationPlugin;
};

export const selectNotifications = state => state.notifications;

// These selectors are okay memoization-wise, but once a single notifications
// is added or removed the memoization for all domain selectors is reset
export const selectGlobalNotifications = createSelector(
  selectNotifications,
  notifications =>
    notifications.filter(notification => notification.domain === DOMAINS.GLOBAL)
);

export const selectPageNotifications = createSelector(
  selectNotifications,
  notifications =>
    notifications.filter(notification => notification.domain === DOMAINS.PAGE)
);

export const selectSideNotifications = createSelector(
  selectNotifications,
  notifications =>
    notifications.filter(notification => notification.domain === DOMAINS.SIDE)
);

export const selectLatestGlobalNotificationAsList = createSelector(
  selectGlobalNotifications,
  notifications => notifications.slice(0, 1)
);

export const selectNotificationsByDomain = createSelector(
  selectLatestGlobalNotificationAsList,
  selectPageNotifications,
  selectSideNotifications,
  state => state.activePlugin,
  (
    globalNotifications,
    pageNotifications,
    sideNotifications,
    activePlugin
  ) => ({
    global: globalNotifications.filter(notification =>
      isNotificationVisible(activePlugin, notification.plugin)
    ),
    page: pageNotifications.filter(notification =>
      isNotificationVisible(activePlugin, notification.plugin)
    ),
    side: sideNotifications.filter(notification =>
      isNotificationVisible(activePlugin, notification.plugin)
    ),
  })
);
