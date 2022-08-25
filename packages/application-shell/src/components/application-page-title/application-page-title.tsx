import type { TEnhancedLocation } from '@commercetools-frontend/browser-history';

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import startCase from 'lodash/startCase';

type Breadcrumb = {
  suffix: string;
  paths: string[];
};
type Props = {
  /**
   * Allow to render a custom page title.
   * Overrides default page title with the format:
   * <?resource_name(manually inputed)> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
   */
  content?: string[];
};
type TPathname = {
  pathname: string;
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
  const pathsProjection = paths.join('-');

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

const staticPaths = ['account', 'login'];

const isStaticPath = (path: string) => {
  return staticPaths.includes(path);
};

/**
 * Allows to extend the page title.
 * When provided, the array items will be used as a prefix for the default title this component will generate.
 *
 * It will follow a pattern like this:
 * <content.join(' - ')> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
 *
 */

const compilePageTitle = (location: TPathname): Breadcrumb => {
  const [, projectKeyOrStaticPath, entryPointUriPath] =
    location.pathname.split('/');

  const suffix = isStaticPath(projectKeyOrStaticPath)
    ? ' Merchant Center'
    : `${projectKeyOrStaticPath} - Merchant Center`;

  const paths = isStaticPath(projectKeyOrStaticPath)
    ? getLimitedPaths([projectKeyOrStaticPath])
    : getLimitedPaths(
        entryPointUriPath.length === 0
          ? [projectKeyOrStaticPath]
          : [entryPointUriPath]
      );
  return {
    suffix,
    paths,
  };
};

const ApplicationPageTitle = <Query extends {} = {}>(props: Props) => {
  const location = useLocation();

  useLayoutEffect(() => {
    const breadcrumb = compilePageTitle(location as TEnhancedLocation<Query>);

    const truncatedPageTitle = () => {
      if (props.content && props.content.length > 0) {
        const titleParts = [
          ...props.content,
          startCase(breadcrumb.paths[0]),
          breadcrumb.suffix,
        ];

        return titleParts
          .map((title) => {
            if (
              title.length > maxTitleCharLength &&
              title.split(' - ')[1] !== 'Merchant Center' //We do not want to truncate the suffix
            ) {
              return (title = `${title.slice(0, 12)} ... ${title.slice(
                title.length - 12
              )}`);
            }
            return title;
          })
          .join(' - ');
      } else {
        return `${startCase(breadcrumb.paths[0])} - ${breadcrumb.suffix}`;
      }
    };

    document.title = truncatedPageTitle();
  }, [location, props.content]);

  return null;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';

export default ApplicationPageTitle;
