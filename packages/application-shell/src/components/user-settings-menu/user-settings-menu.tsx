import type { ControllerStateAndHelpers, DownshiftProps } from 'downshift';
import type { TUser } from '../../types/generated/mc';
import type {
  TApplicationsMenu,
  TFetchApplicationsMenuQuery,
} from '../../types/generated/proxy';

import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Downshift from 'downshift';
import { ToggleFeature } from '@flopflip/react-broadcast';
import Avatar from '@commercetools-uikit/avatar';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CaretDownIcon } from '@commercetools-uikit/icons';
import { customProperties } from '@commercetools-uikit/design-system';
import {
  LOGOUT_REASONS,
  NO_VALUE_FALLBACK,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import messages from './messages';

type Props = Pick<
  TUser,
  'language' | 'firstName' | 'lastName' | 'email' | 'gravatarHash'
> & {
  DEV_ONLY__loadAppbarMenuConfig?: () => Promise<TApplicationsMenu['appBar']>;
};
type MenuBodyProps = Props & {
  downshiftProps: ControllerStateAndHelpers<{}>;
};
type OptionalFeatureToggleProps = {
  featureToggle?: string;
  children: React.ReactNode;
};
type MenuItemProps = {
  hasDivider?: boolean;
};
type MenuConfig = TFetchApplicationsMenuQuery['applicationsMenu']['appBar'][0];

const UserAvatar = (
  props: Pick<Props, 'firstName' | 'lastName' | 'gravatarHash'>
) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const handleMouseOver = React.useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const handleMouseOut = React.useCallback(() => {
    setIsMouseOver(false);
  }, []);
  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Spacings.Inline alignItems="center">
        <Avatar
          gravatarHash={props.gravatarHash}
          firstName={props.firstName}
          lastName={props.lastName}
          isHighlighted={isMouseOver}
        />
        <CaretDownIcon
          size="small"
          color={isMouseOver ? 'neutral60' : 'solid'}
        />
      </Spacings.Inline>
    </div>
  );
};
UserAvatar.displayName = 'UserAvatar';

function getIsFocusedElementInMenu() {
  return Boolean(
    document.activeElement?.getAttribute('data-user-settings-menu')
  );
}

const stateReducer: DownshiftProps<{}>['stateReducer'] = (state, changes) => {
  switch (changes.type) {
    // So in case the user wants to navigate with the tab button
    // we need to make sure that the menu does not close
    case Downshift.stateChangeTypes.blurButton:
      return {
        ...changes,
        isOpen: (state.isOpen && getIsFocusedElementInMenu()) ?? false,
      };
    default:
      return changes;
  }
};

const OptionalFeatureToggle = (props: OptionalFeatureToggleProps) => {
  if (props.featureToggle) {
    return (
      <ToggleFeature flag={props.featureToggle}>{props.children}</ToggleFeature>
    );
  }
  return <>{props.children}</>;
};

const renderLabel = (
  menu: MenuConfig,
  applicationLanguage: Props['language']
) => {
  const localizedLabel = menu.labelAllLocales.find((loc) =>
    applicationLanguage.startsWith(loc.locale)
  );
  if (localizedLabel) return localizedLabel.value;
  return NO_VALUE_FALLBACK;
};

const MenuItem = styled.div<MenuItemProps>`
  width: 100%;
  cursor: pointer;
  color: ${customProperties.colorSolid};

  :hover {
    background-color: ${customProperties.colorNeutral90};
  }

  ${(props) =>
    props.hasDivider === true
      ? css`
          border-bottom: 1px solid ${customProperties.colorNeutral};
        `
      : ''};
`;

const getUserSettingsMenuItemLinkStyles = () => css`
  display: block;
`;

const UserSettingsMenuBody = (props: MenuBodyProps) => {
  // Focus on a menu item when it's opened through keyboard
  const menuElementRef = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    menuElementRef.current?.focus();
  }, []);

  const environment = useApplicationContext((context) => context.environment);
  const applicationsAppBarMenu = useApplicationsMenu<'appBar'>('appBar', {
    queryOptions: {
      onError: reportErrorToSentry,
    },
    environment,
    loadMenuConfig: props.DEV_ONLY__loadAppbarMenuConfig,
  });

  return (
    <div
      onKeyDown={(event) => {
        if (
          event.key === 'Esc' ||
          (event.key === 'Tab' && !getIsFocusedElementInMenu())
        ) {
          props.downshiftProps.closeMenu();
        }
      }}
      css={css`
        position: absolute;
        background: ${customProperties.colorSurface};
        border: 1px ${customProperties.colorPrimary40} solid;
        border-radius: ${customProperties.borderRadius6};
        box-shadow: ${customProperties.shadow7};
        width: 315px;
        right: 14px;
        top: 40px;
        padding: ${customProperties.spacingXs};
        overflow: hidden;
      `}
    >
      <div {...props.downshiftProps.getMenuProps()}>
        <Spacings.Inset scale="xs">
          <Spacings.Inline scale="xs" alignItems="center">
            <Avatar
              firstName={props.firstName}
              lastName={props.lastName}
              gravatarHash={props.gravatarHash}
            />
            <div>
              <Text.Body isBold>
                {[props.firstName, props.lastName].join(' ').trim()}
              </Text.Body>
              <Text.Body truncate>{props.email}</Text.Body>
            </div>
          </Spacings.Inline>
        </Spacings.Inset>
        {applicationsAppBarMenu?.map((menu) => (
          <OptionalFeatureToggle
            key={menu.key}
            featureToggle={menu.featureToggle}
          >
            <Link
              css={getUserSettingsMenuItemLinkStyles()}
              to={`/account/${menu.uriPath}`}
              onClick={() => props.downshiftProps.toggleMenu()}
              data-user-settings-menu
              ref={menuElementRef}
            >
              <MenuItem>
                <Spacings.Inset scale="s">
                  {renderLabel(menu, props.language)}
                </Spacings.Inset>
              </MenuItem>
            </Link>
          </OptionalFeatureToggle>
        ))}
        <MenuItem hasDivider={true} />
        <a
          css={getUserSettingsMenuItemLinkStyles()}
          href={`https://commercetools.com/privacy#suppliers`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => props.downshiftProps.toggleMenu()}
          data-user-settings-menu
          ref={!applicationsAppBarMenu ? menuElementRef : undefined}
        >
          <MenuItem>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.privacyPolicy} />
            </Spacings.Inset>
          </MenuItem>
        </a>
        <a
          css={getUserSettingsMenuItemLinkStyles()}
          href={SUPPORT_PORTAL_URL}
          rel="noopener noreferrer"
          target="_blank"
          data-track-component="Navigation-Support-links"
          data-track-event="click"
          data-track-label="support_textlink"
          onClick={() => props.downshiftProps.toggleMenu()}
          data-user-settings-menu
        >
          <MenuItem>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.support} />
            </Spacings.Inset>
          </MenuItem>
        </a>
        <MenuItem hasDivider={true} />
        <a
          css={getUserSettingsMenuItemLinkStyles()}
          // NOTE: we want to redirect to a new page so that the
          // server can remove things like cookie for access token.
          href={`/logout?reason=${LOGOUT_REASONS.USER}`}
          data-test="logout-button"
          data-user-settings-menu
        >
          <MenuItem>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.logout} />
            </Spacings.Inset>
          </MenuItem>
          <div tabIndex={0} onFocus={() => props.downshiftProps.closeMenu()} />
        </a>
      </div>
    </div>
  );
};
UserSettingsMenuBody.displayName = 'UserSettingsMenuBody';

const UserSettingsMenu = (props: Props) => {
  const intl = useIntl();

  return (
    <div data-test="user-settings-menu">
      <Downshift stateReducer={stateReducer}>
        {(downshiftProps) => (
          <div>
            <button
              role="user-menu-toggle"
              css={css`
                cursor: pointer;
                border: none;
                padding: 0;
                display: flex;
                background: transparent;
              `}
              {...downshiftProps.getToggleButtonProps({
                'aria-label': intl.formatMessage(
                  downshiftProps.isOpen
                    ? messages.closeMenuLabel
                    : messages.openMenuLabel
                ),
              })}
            >
              <UserAvatar
                firstName={props.firstName}
                lastName={props.lastName}
                gravatarHash={props.gravatarHash}
              />
            </button>
            {downshiftProps.isOpen && (
              <UserSettingsMenuBody
                {...props}
                downshiftProps={downshiftProps}
              />
            )}
          </div>
        )}
      </Downshift>
    </div>
  );
};
UserSettingsMenu.displayName = 'UserSettingsMenu';

export default UserSettingsMenu;

// For testing
export { UserAvatar, UserSettingsMenuBody };
