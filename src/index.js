import ApiError from './components/notification-kinds/api-error';
import Generic from './components/notification-kinds/generic';
import UnexpectedError from './components/notification-kinds/unexpected-error';

export const NotificationKinds = { ApiError, Generic, UnexpectedError };

export {
  default as GetCustomNotificationComponent,
  NotificationProviderForCustomComponent,
} from './components/map-notification-to-component';
export { default as Notification } from './components/notification';
export {
  default as NotificationsConnector,
} from './components/notifications-connector';
export { selectPageNotifications } from './components/notifications-connector';
export { default as NotificationsList } from './components/notifications-list';
