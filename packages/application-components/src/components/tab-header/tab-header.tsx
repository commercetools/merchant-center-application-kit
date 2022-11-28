import { Link, matchPath, useLocation } from 'react-router-dom';
import startCase from 'lodash/startCase';
import { useIntl, type MessageDescriptor } from 'react-intl';
import type { ReactNode } from 'react';
import type { LocationDescriptor } from 'history';
import { warning } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import { getLinkStyles } from './tab.styles';

const pathWithoutSearch = (path: TTabHeaderProps['to']) =>
  typeof path === 'string' ? path.split('?')[0] : path.pathname;

const warnIfMissingContent = (props: TTabHeaderProps) => {
  const hasContent = Boolean(props.intlMessage) || Boolean(props.label);

  warning(
    hasContent,
    'TabHeader: one of either `label` or `intlMessage` is required but their values are `undefined`'
  );
};

const getDisabledLinkAtributes = (isDisabled: TTabHeaderProps['isDisabled']) =>
  isDisabled ? { tabIndex: -1, 'aria-disabled': true } : {};

export type TTabHeaderProps = {
  /**
   * A route path to redirect to when the tab is clicked.
   */
  to: string | LocationDescriptor;
  /**
   * The label of the tab.
   * * <br />
   * Required if `intlMessage` is not provided.
   */
  label?: string;
  /**
   * The label of the tab, using an `intl` message object.
   * <br />
   * Required if `label` is not provided.
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, ReactNode>;
  };
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled: boolean;
  /**
   * If `true`, marks the tab as active if the link matches exactly the route.
   */
  exactPathMatch: boolean;
};

export const TabHeader = (props: TTabHeaderProps) => {
  const intl = useIntl();
  const location = useLocation();
  const isActive = Boolean(
    matchPath(location.pathname, {
      // strip the search, otherwise the path won't match
      path: pathWithoutSearch(props.to),
      exact: props.exactPathMatch,
      strict: false,
    })
  );
  const isDisabled = props.isDisabled;

  let label = props.label;
  if (props.intlMessage) {
    label = intl.formatMessage(props.intlMessage);
  }

  const dataAttributeProps = {
    'data-track-event': 'click',
    ...(label && {
      'data-track-component': startCase(label),
    }),
  };

  warnIfMissingContent(props);

  return (
    <Link
      role="tab"
      aria-selected={isActive}
      to={props.to}
      css={getLinkStyles(isActive, isDisabled)}
      {...getDisabledLinkAtributes(isDisabled)}
      {...dataAttributeProps}
    >
      <Text.Subheadline as="h4" truncate={true}>
        {label}
      </Text.Subheadline>
    </Link>
  );
};

TabHeader.displayName = 'TabHeader';

const defaultProps: Pick<TTabHeaderProps, 'isDisabled' | 'exactPathMatch'> = {
  isDisabled: false,
  exactPathMatch: false,
};
TabHeader.defaultProps = defaultProps;

export default TabHeader;
