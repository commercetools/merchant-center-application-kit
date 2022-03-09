import { Link, matchPath, useLocation } from 'react-router-dom';
import startCase from 'lodash/startCase';
import { FormattedMessage, type MessageDescriptor } from 'react-intl';
import type { ReactNode } from 'react';
import type { LocationDescriptor } from 'history';
import { warning } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import { getTabHeaderStyles, getLinkWrapperStyles } from './tab.styles';

const pathWithoutSearch = (path: TTabHeaderProps['to']) =>
  typeof path === 'string' ? path.split('?')[0] : path.pathname;

const warnIfMissingContent = (props: TTabHeaderProps) => {
  const hasContent = Boolean(props.intlMessage) || Boolean(props.label);

  warning(
    hasContent,
    'TabHeader: one of either `label` or `intlMessage` is required but their values are `undefined`'
  );
};

const getDisabledTabHeaderAriaAttributes = (
  isDisabled: TTabHeaderProps['isDisabled']
) => (isDisabled ? { 'aria-disabled': true } : {});

const getDisabledLinkAtributes = (isDisabled: TTabHeaderProps['isDisabled']) =>
  isDisabled ? { tabIndex: -1 } : {};

export type TTabHeaderProps = {
  /**
   * Path that the TabHeader directs to when not disabled.
   */
  to: string | LocationDescriptor;
  /**
   * A label for the TabHeader.
   * * <br />
   * Required if `intlMessage` is not provided.
   */
  label?: string;
  /**
   * An `intl` message object that will be rendered with `FormattedMessage`.
   * <br />
   * Required if `label` is not provided.
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled?: boolean;
  /**
   * If set to `true` TabHeader will be visible as active only upon exact match of route.
   */
  exact?: boolean;
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
    ...(props.label && {
      'data-track-component': startCase(props.label),
    }),
  };

  warnIfMissingContent(props);

  return (
    <div
      role="tab"
      aria-selected={isActive}
      // TODO: add aria-controls when TabPanel component is ready
      css={getTabHeaderStyles(isActive, isDisabled)}
      {...getDisabledTabHeaderAriaAttributes(isDisabled)}
      {...dataAttributeProps}
    >
      <Link
        to={props.to}
        // @ts-ignore
        css={getLinkWrapperStyles(isDisabled)}
        {...getDisabledLinkAtributes(isDisabled)}
      >
        <Text.Subheadline as="h4" truncate={true}>
          {props.intlMessage ? (
            <FormattedMessage {...props.intlMessage} />
          ) : (
            props.label
          )}
        </Text.Subheadline>
      </Link>
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
