import type { ReactNode, ElementType, MouseEvent, KeyboardEvent } from 'react';
import startCase from 'lodash.startcase';
import {
  Link,
  withRouter,
  matchPath,
  type RouteComponentProps,
  type LinkProps,
} from 'react-router-dom';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const pathWithoutSearch = (path: string) => path?.split('?')[0];
const noop = () => {};

type TLinkWrapperProps = {
  to?: LinkProps['to'] | null;
  children: ReactNode;
};

const LinkWrapper = (props: TLinkWrapperProps) => {
  const Component = (props.to ? Link : 'a') as ElementType;
  return <Component {...props}>{props.children}</Component>;
};
LinkWrapper.displayName = 'LinkWrapper';

type TTabHeaderProps = {
  /**
   * Any React node passed to LinkWrapper.
   */
  children: ReactNode;
  /**
   * Value of `data-track-component` attribute in DOM.
   */
  name: string;
  /**
   * Path that the TabHeader directs to when not disabled.
   */
  to?: string;
  /**
   * If `true`, indicates that the element is in a disabled state.
   */
  isDisabled?: boolean;
  /**
   * If set to true TabHeader will be visible as active only when there is an exact match of route.
   */
  exact?: boolean;
  /**
   * A callback function, called when TabHeader is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
};

export const TabHeader = (props: TTabHeaderProps & RouteComponentProps) => {
  const active = Boolean(
    matchPath(props.location.pathname, {
      // strip the search, otherwise the path won't match
      path: pathWithoutSearch(props.to || ''),
      exact: props.exact,
      strict: false,
    })
  );

  return (
    <li
      css={[
        css`
          color: var(--color-accent);
          cursor: pointer;
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 100;
          margin: var(--spacing-s) var(--spacing-m);
          text-align: center;
          min-width: 50px;
          cursor: pointer;
          position: relative;

          &:first-of-type > * {
            padding-left: 0;
          }

          ${!props.isDisabled &&
          !active &&
          `&:hover {
            color: ${vars.colorNeutral};
            }`}

          > * {
            color: var(--color-accent);
            text-decoration: inherit;
            cursor: inherit;
          }
        `,
        active &&
          css`
            color: ${vars.colorPrimary};

            @keyframes bottomBorder {
              from {
                background-color: none;
              }
              to {
                background-color: ${vars.colorPrimary};
              }
            }

            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 4px;
              border-radius: 2px;
              animation: bottomBorder 0.15s forwards;
            }
          `,
        props.isDisabled &&
          css`
            opacity: 0.5;
            cursor: default;
          `,
      ]}
      data-track-event="click"
      data-track-component={startCase(props.name)}
      data-testid={`header-list-item-${props.name}`}
      onClick={props.isDisabled ? noop : props.onClick}
    >
      <LinkWrapper
        to={props.isDisabled ? null : props.to}
        // @ts-ignore
        css={[
          css`
            font-size: 1.286rem;
            padding-bottom: var(--spacing-xs);
            display: block;
            padding: 16px 8px 16px 8px;
          `,
          props.isDisabled &&
            css`
              cursor: default;
            `,
        ]}
      >
        {props.children}
      </LinkWrapper>
    </li>
  );
};

TabHeader.displayName = 'TabHeader';
const defaultProps: Pick<TTabHeaderProps, 'isDisabled' | 'exact'> = {
  isDisabled: false,
  exact: false,
};
TabHeader.defaultProps = defaultProps;

export default withRouter(TabHeader);
