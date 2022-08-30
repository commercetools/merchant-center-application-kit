import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import upperFirst from 'lodash/upperFirst';

type TApplicationPageTitleProps = {
  /**
   * Prepend additional title parts to the default page title.
   * The parts are concatenated with a `-` separator and might be truncated
   * in the middle if each one exceeds 24 characters length.
   *
   * The default page title has always the format:
   *   <application_identifier> - <project_key> - Merchant Center
   *
   * Overwriting the default page title is recommended in detail pages
   * where there is a human-readable resource identifier, for example a product name.
   *
   * @example
   *
   * <ApplicationPageTitle additionalParts={['T-Shirt red']} />
   * // T-Shirt red - Products - my-shop - Merchant Center
   */
  additionalParts: string[];
};

const maxTitleCharLength = 24;
const staticPaths = ['account', 'login'];

const defaultProps: Pick<TApplicationPageTitleProps, 'additionalParts'> = {
  additionalParts: [],
};

const usePageTitle = (props: TApplicationPageTitleProps) => {
  const location = useLocation();

  const [, projectKeyOrStaticPath, entryPointUriPath] =
    location.pathname.split('/');

  const customTitleParts = props.additionalParts.map((titlePart: string) => {
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

const ApplicationPageTitle = (props: TApplicationPageTitleProps) => {
  const pageTitle = usePageTitle(props);

  useLayoutEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return null;
};
ApplicationPageTitle.displayName = 'ApplicationPageTitle';
ApplicationPageTitle.defaultProps = defaultProps;

export default ApplicationPageTitle;
