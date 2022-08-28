import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import upperFirst from 'lodash/upperFirst';

type ApplicationPageTitleProps = {
  /**
   * Allow to render a custom page title.
   * Overrides default page title with the format:
   * <?resource_name(manually inputed)> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
   */
  content?: string[];
};

const maxTitleCharLength = 24;
const staticPaths = ['account', 'login'];
const defaultProps: Pick<ApplicationPageTitleProps, 'content'> = {
  content: [],
};

/**
 * Allows to extend the page title.
 * When provided, the array items will be used as a prefix for the default title this component will generate.
 *
 * It will follow a pattern like this:
 * <content.join(' - ')> - <?page_location> - <application_identifier> - <project_key> - Merchant Center
 *
 */

const ApplicationPageTitle = (props: ApplicationPageTitleProps) => {
  const location = useLocation();

  const [, projectKeyOrStaticPath, entryPointUriPath] =
    location.pathname.split('/');

  useLayoutEffect(() => {
    const truncatedPageTitle = () => {
      const customTitleParts =
        props.content &&
        props.content.map((titlePart: string) => {
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
          ...(customTitleParts || []),
          upperFirst(projectKeyOrStaticPath),
          'Merchant Center',
        ].join(' - ');
      }

      return [
        ...(customTitleParts || []),
        upperFirst(entryPointUriPath),
        projectKeyOrStaticPath,
        'Merchant Center',
      ].join(' - ');
    };

    document.title = truncatedPageTitle();
  }, [entryPointUriPath, location, projectKeyOrStaticPath, props.content]);

  return null;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';
ApplicationPageTitle.defaultProps = defaultProps;

export default ApplicationPageTitle;
