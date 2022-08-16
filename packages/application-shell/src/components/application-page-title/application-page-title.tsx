import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import startCase from 'lodash/startCase';

type Breadcrumb<Query extends {} = {}> = {
  suffix: string;
  paths: string[];
  location: TEnhancedLocation<Query>;
};
type Props<Query extends {} = {}> = {
  // Allow to render a custom page title.
  /**
   * Overrides default page title with the format:
   * <?resource_name(manually inputed)> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
   */
  renderPageTitle?: (breadcrumb: Breadcrumb<Query>) => string;
  children: React.ReactNode;
};

const maxTitleCharLength = 24;

const compilePath = (paths: string[], hasTruncatedPaths = false): string[] => {
  if (hasTruncatedPaths) {
    return [...paths.slice(0, 1), '...', ...paths.slice(1)];
  }
  return paths;
};

const getLimitedPaths = (
  paths: string[],
  hasTruncatedPaths = false
): string[] => {
  // We want to keep a minimum of 2 paths
  if (paths.length <= 2) {
    return compilePath(paths, hasTruncatedPaths);
  }

  // Calculate the length projection
  const pathsProjection = paths.join(' - ');

  // If the length exceeds the max allowed length, we need to remove one of the paths
  // from the list, except from the first and last.
  if (pathsProjection.length > maxTitleCharLength) {
    return getLimitedPaths(
      [
        // we always remove the second item
        ...paths.slice(0, 1),
        ...paths.slice(2),
      ],
      true
    );
  }
  return compilePath(paths, hasTruncatedPaths);
};

const isStaticPath = (path: string) => {
  const reservedStaticPaths = ['account', 'login'];
  return reservedStaticPaths.includes(path);
};

/**
 * Converts a URI path into a default mapping.
 * Format is something like this: <?page_location> - <project_key> - Merchant Center
 *
 * Example:
 *   /almond-40/products/<id> should display as <product name> - Products - almond-40 - Merchant Center
 */

const compilePageTitle = <Query extends {}>(
  location: TEnhancedLocation<Query>
): Breadcrumb<Query> => {
  const [, projectKeyOrStaticPath, ...locationPaths] =
    location.pathname.split('/');

  const suffix = isStaticPath(projectKeyOrStaticPath)
    ? ' Merchant Center'
    : `${projectKeyOrStaticPath} - Merchant Center`;

  const paths = isStaticPath(projectKeyOrStaticPath)
    ? getLimitedPaths([projectKeyOrStaticPath])
    : getLimitedPaths(
        locationPaths.length === 0 ? [projectKeyOrStaticPath] : locationPaths
      );
  return {
    suffix,
    paths,
    location,
  };
};

const convertToReadablePrefix = (prefix: string): string => {
  switch (prefix) {
    case 'app-kit-playground':
      return 'App Kit Playground';
    case 'dashboard':
      return 'DashBoard';
    case 'products':
      return 'Products';
    case 'orders':
      return 'Orders';
    case 'settings':
      return 'Settings';
    case 'projects':
      return 'Projects';
    case 'login':
      return 'Login';
    case 'account':
      return 'Account';
    default:
      return startCase(prefix);
  }
};

const ApplicationPageTitle = <Query extends {} = {}>(props: Props<Query>) => {
  const location = useLocation();
  const breadcrumb = compilePageTitle(location as TEnhancedLocation<Query>);
  const pageTitle = props.renderPageTitle
    ? props.renderPageTitle(breadcrumb)
    : `${convertToReadablePrefix(breadcrumb.paths[0])} - ${breadcrumb.suffix}`;

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <>{props.children}</>;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';

export default ApplicationPageTitle;
