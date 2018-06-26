import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { injectConfiguration } from '@commercetools-frontend/application-shell-connectors';
import PageNotFound from '../../from-core/page-not-found';

export class ForcePageReload extends React.PureComponent {
  static displayName = 'ForcePageReload';
  // The `forcedReload` ensures that the page is always reloaded
  // from the server, instead of from the browser cache.
  // https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  reloadPage = () => window.location.reload(/* forcedReload */ true);
  componentDidMount() {
    this.reloadPage();
  }
  render() {
    return null;
  }
}

export class RouteCatchAll extends React.PureComponent {
  static displayName = 'RouteCatchAll';
  static propTypes = {
    servedByProxy: PropTypes.string,
  };
  // NOTE: it's important that the return value is a `Route` component!
  render() {
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
    if (this.props.servedByProxy === 'true')
      return <Route component={ForcePageReload} />;

    // In case we are developing the app locally, we simply render a 404
    // page because we most likely don't have other "apps" running at the same
    // time.
    return <Route component={PageNotFound} />;
  }
}

export default injectConfiguration(['servedByProxy'], 'servedByProxy')(
  RouteCatchAll
);
