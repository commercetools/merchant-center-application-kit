/**
 * https://emotion.sh/docs/emotion-11#css-prop-types
 *
 * However, if you are stuck with older version of TypeScript or using the
 * classic runtime implicitly by using our `@emotion/babel-preset-css-prop`
 * then it’s not possible to leverage `css` prop support being added conditionally
 * based on a type of rendered component.
 * For those cases we have added a special file that can be imported once
 * to add support for the `css` prop globally, for all components.
 *
 * TODO: remove this once we use upgrade to TS >4.1
 */
/// <reference types="@emotion/react/types/css-prop" />

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
