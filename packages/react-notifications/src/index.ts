import type { TProps as MapNotificationToComponentProps } from './components/map-notification-to-component';

// Re-export type for convenience
export type TMapNotificationToComponentProps = MapNotificationToComponentProps;

export { default as version } from './version';
export { default as NotificationProviderForCustomComponent } from './components/map-notification-to-component';
export { default as Notification } from './components/notification';
export {
  default as NotificationsList,
  selectPageNotifications,
} from './components/notifications-list';
export { default as Notifier } from './components/notifier';
export { default as ApiErrorMessage } from './components/notification-kinds/api-error-message';
