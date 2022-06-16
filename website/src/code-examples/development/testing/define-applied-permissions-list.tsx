import {
  renderAppWithRedux,
  mapResourceAccessToAppliedPermissions,
  TRenderAppOptions,
} from '@commercetools-frontend/application-shell/test-utils';
import { PERMISSIONS } from '../../constants';

const renderApp = (options?: TRenderAppOptions) => {
  const route = options.route || `/my-project/${entryPointUriPath}/channels`;
  renderAppWithRedux(<ApplicationRoutes />, {
    route,
    entryPointUriPath,
    project: {
      allAppliedPermissions: mapResourceAccessToAppliedPermissions([
        PERMISSIONS.View,
      ]),
    },
    ...options,
  });
};
