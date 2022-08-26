import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import upperFirst from 'lodash/upperFirst';

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

const ApplicationPageTitle = (props: Props) => {
  const location = useLocation();

  const [, projectKeyOrStaticPath, entryPointUriPath] =
    location.pathname.split('/');

  useLayoutEffect(() => {
    const compilePageTitle = (): Breadcrumb => {
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

    const breadcrumb = compilePageTitle();
    const truncatedPageTitle = () => {
      if (props.content && props.content.length > 0) {
        const customTitleParts = props.content.map((titlePart: string) => {
          if (titlePart.length <= maxTitleCharLength) {
            return titlePart;
          }
          return [
            titlePart.slice(0, maxTitleCharLength / 2),
            titlePart.slice(titlePart.length - maxTitleCharLength / 2),
          ].join('...');
        });

        if (staticPaths.includes(projectKeyOrStaticPath)) {
          return [
            ...customTitleParts,
            upperFirst(projectKeyOrStaticPath),
            'Merchant Center',
          ].join(' - ');
        }

        return [
          ...customTitleParts,
          upperFirst(entryPointUriPath),
          projectKeyOrStaticPath,
          'Merchant Center',
        ].join(' - ');
      }
      return `${upperFirst(breadcrumb.paths[0])} - ${breadcrumb.suffix}`;
    };

    document.title = truncatedPageTitle();
  }, [entryPointUriPath, location, projectKeyOrStaticPath, props.content]);

  return null;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';

export default ApplicationPageTitle;
