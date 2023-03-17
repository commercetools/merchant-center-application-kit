import { lazy } from 'react';

const NotificationsPlayground = lazy(() =>
  import(
    './notifications-playground' /* webpackChunkName: "notifications-playground" */
  )
);

export default NotificationsPlayground;
