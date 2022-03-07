import { Link, matchPath, useLocation } from 'react-router-dom';
import startCase from 'lodash.startcase';
import { FormattedMessage, type MessageDescriptor } from 'react-intl';
import type { ReactNode, ElementType, MouseEvent, KeyboardEvent } from 'react';
import type { LocationDescriptor } from 'history';
import { getTabHeaderStyles, getLinkWrapperStyles } from './tab.styles';
import { warning } from '@commercetools-uikit/utils';

const pathWithoutSearch = (path: TTabHeaderProps['to']) =>
  typeof path === 'string' ? path.split('?')[0] : path.pathname;

const noop = () => {};

const warnIfMissingContent = (props: TTabHeaderProps) => {
  const hasContent = Boolean(props.intlMessage) || Boolean(props.children);

  warning(
    hasContent,
    'TabHeader: one of either `children` or `intlMessage` is required but their values are `undefined`'
  );
};

type TLinkWrapperProps = {
  to: TTabHeaderProps['to'] | null;
  children: ReactNode;
};

/* This wrapper component provides disabled mode for `TabHeader`.
If `to` prop is `null` the wrapping `<a>` element (used instead of `<Link>`) has no `href` attribute.
Therefore, it is not clickable and falls out of the tabbing sequence.  */
const LinkWrapper = (props: TLinkWrapperProps) => {
  const Component = (props.to ? Link : 'a') as ElementType;
  return <Component {...props}>{props.children}</Component>;
};
LinkWrapper.displayName = 'LinkWrapper';

export type TTabHeaderProps = {
  /**
   * Path that the TabHeader directs to when not disabled.
   */
  to: string | LocationDescriptor;
  /**
   * Any React node passed to TabHeader.
   * * <br />
   * Required if `intlMessage` is not provided.
   */
  children?: ReactNode;
  /**
   * An `intl` message object that will be rendered with `FormattedMessage`.
   * <br />
   * Required if `children` is not provided.
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * Name visible in DOM for the sake of tracking and testing.
   */
  name?: string;
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled?: boolean;
  /**
   * If set to true TabHeader will be visible as active only upon exact match of route.
   */
  exact?: boolean;
  /**
   * A callback function, called when TabHeader is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
};

export const TabHeader = (props: TTabHeaderProps) => {
  const location = useLocation();
  const isActive = Boolean(
    matchPath(location.pathname, {
      // strip the search, otherwise the path won't match
      path: pathWithoutSearch(props.to),
      exact: props.exact,
      strict: false,
    })
  );
  const isDisabled = Boolean(props.isDisabled);

  const dataAttributeProps = {
    'data-track-event': 'click',
    ...(props.name &&
      props.name.length > 0 && {
        'data-track-component': startCase(props.name),
        'data-testid': `tab-header-item-${props.name}`,
      }),
  };

  warnIfMissingContent(props);

  return (
    <div
      role="tab"
      aria-selected={isActive}
      css={getTabHeaderStyles(isActive, isDisabled)}
      onClick={isDisabled ? noop : props.onClick}
      {...dataAttributeProps}
    >
      <LinkWrapper
        to={isDisabled ? null : props.to}
        // @ts-ignore
        css={getLinkWrapperStyles(isDisabled)}
      >
        {props.intlMessage ? (
          <FormattedMessage {...props.intlMessage} />
        ) : (
          props.children
        )}
      </LinkWrapper>
    </div>
  );
};

TabHeader.displayName = 'TabHeader';

const defaultProps: Pick<TTabHeaderProps, 'isDisabled' | 'exact'> = {
  isDisabled: false,
  exact: false,
};
TabHeader.defaultProps = defaultProps;

export default TabHeader;
