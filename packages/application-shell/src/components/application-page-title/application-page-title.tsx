import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Breadcrumb<Query extends {} = {}> = {
  suffix: string;
  paths: string[];
  location: TEnhancedLocation<Query>;
};
type Props<Query extends {} = {}> = {
  // Allow to render a custom page title.
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
const getPageSuffix = (path: string): string => {
  switch (path) {
    case 'login':
    case 'logout':
      return 'Merchant Center';
    case 'account':
      return 'Account';
    default:
      return path;
  }
};

/**
 * Converts a URI path into a human readable string of both generated and manually composed string.
 * Format is something like this: <?resource_name(manually inputed)> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
 *
 * Example:
 *   <product name> - Products - almond-40 - Merchant Center
 */

const compilePageTitle = <Query extends {}>(
  location: TEnhancedLocation<Query>
): Breadcrumb<Query> => {
  const [, projectKeyOrStaticPath, ...locationPaths] =
    location.pathname.split('/');
  const suffix = getPageSuffix(projectKeyOrStaticPath);
  const paths = getLimitedPaths(
    locationPaths.length === 0 ? [projectKeyOrStaticPath] : locationPaths
  );
  return {
    suffix,
    paths,
    location,
  };
};

const ApplicationPageTitle = <Query extends {} = {}>(props: Props<Query>) => {
  const location = useLocation();
  const breadcrumb = compilePageTitle(location as TEnhancedLocation<Query>);
  const pageTitle = props.renderPageTitle
    ? props.renderPageTitle(breadcrumb)
    : `${breadcrumb.paths.join(' - ')} - ${breadcrumb.suffix}`;

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <>{props.children}</>;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';

export default ApplicationPageTitle;
