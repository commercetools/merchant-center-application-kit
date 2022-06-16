import {
  renderAppWithRedux,
  TRenderAppOptions,
} from '@commercetools-frontend/application-shell/test-utils';
import { entryPointUriPath } from '../../constants/application';
import ApplicationRoutes from '../../routes';

const renderApp = (options?: TRenderAppOptions) => {
  const route = options.route || `/my-project/${entryPointUriPath}/channels`;
  renderAppWithRedux(<ApplicationRoutes />, {
    route,
    entryPointUriPath,
    project: {
      allAppliedPermissions: [
        {
          name: 'canViewChannels',
          value: true,
        },
      ],
    },
    ...options,
  });
};
