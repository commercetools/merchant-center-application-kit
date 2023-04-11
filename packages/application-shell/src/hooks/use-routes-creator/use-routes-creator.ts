import type { History } from 'history';
import {
  useHistory,
  useRouteMatch,
  generatePath,
  useLocation,
} from 'react-router-dom';

export interface RouteParams extends Record<string, string> {}

/**
 * The route path to match. Usually it starts with `/:projectKey/my-entry-point`.
 */
export type RoutePath = string;

export type TMakeRouteOptions<Params extends RouteParams> = {
  params: Partial<Params>;
  goTo: History['push'];
  location: ReturnType<typeof useLocation>;
};

export type TRoute<Params extends RouteParams> = {
  path: string;
  getUrl: (params?: Params, nextQueryParams?: URLSearchParams) => string;
  go: (params?: Params, nextQueryParams?: URLSearchParams) => void;
};

const makeRoute = <Params extends RouteParams>(
  routePath: RoutePath,
  routeOptions: TMakeRouteOptions<Params>
): TRoute<Params> => {
  const getUrl: TRoute<Params>['getUrl'] = (nextParams, nextQueryParams) => {
    const baseUrl = generatePath(routePath, {
      ...routeOptions.params,
      ...nextParams,
    });

    if (nextQueryParams) {
      return `${baseUrl}?${nextQueryParams.toString()}`;
    }

    return baseUrl;
  };

  const go: TRoute<Params>['go'] = (nextParams, nextQueryParams) => {
    routeOptions.goTo(getUrl(nextParams, nextQueryParams));
  };

  return { path: routePath, getUrl, go };
};

function useRoutesCreator() {
  const { params } = useRouteMatch();
  const { push: goTo, location } = useHistory();

  const createRoute = <ParamKeys>(routePath: RoutePath) =>
    makeRoute<ParamKeys extends string ? Record<ParamKeys, string> : never>(
      routePath,
      { goTo, params, location }
    );

  return { createRoute };
}

export default useRoutesCreator;
