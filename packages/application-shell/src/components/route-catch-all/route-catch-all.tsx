import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { PageNotFound } from '@commercetools-frontend/application-components';
import useIsServedByProxy from '../../hooks/use-is-served-by-proxy';
import { location } from '../../utils/location';

const ForcePageReload = () => {
  useEffect(() => {
    location.reload();
  }, []);
  return null;
};

const RouteCatchAll = () => {
  // NOTE: it's important that the return value is a `Route` component!
  const servedByProxy = useIsServedByProxy();
  // In case the application is served by a proxy server, we assume that
  // the reverse proxy router handles requests forwarding to the specified
  // service.
  // For example, if the current "loaded" app is products and I click
  // on a link to discounts, the products app does not know about the
  // discount routes, thus falling back to this "catch all route" component.
  // At this point we force a page reload, effectively handing the
  // route control logic to the reverse proxy in our cluster. There,
  // the router mapping will match the discounts route and it will forward
  // the request to the discounts app.
  // If no route matches, the application fallback will handle the request
  // instead, showing e.g. a 404 page.
  if (servedByProxy)
    return (
      <Route>
        <ForcePageReload />
      </Route>
    );

  // In case we are developing the app locally, we simply render a 404
  // page because we most likely don't have other "apps" running at the same
  // time.
  return (
    <Route>
      <PageNotFound />
    </Route>
  );
};

export default RouteCatchAll;
