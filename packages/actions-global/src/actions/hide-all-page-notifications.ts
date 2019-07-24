import { HIDE_ALL_PAGE_NOTIFICATIONS } from '@commercetools-frontend/constants';

type HideAllPageNotificationAction = {
  type: typeof HIDE_ALL_PAGE_NOTIFICATIONS;
};

export default function hideAllPageNotifications(): HideAllPageNotificationAction {
  return { type: HIDE_ALL_PAGE_NOTIFICATIONS };
}
