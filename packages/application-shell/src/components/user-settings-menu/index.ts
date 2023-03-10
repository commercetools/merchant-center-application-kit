import { lazy } from 'react';

const UserSettingsMenu = lazy(
  () =>
    import('./user-settings-menu' /* webpackChunkName: "user-settings-menu" */)
);

export default UserSettingsMenu;
