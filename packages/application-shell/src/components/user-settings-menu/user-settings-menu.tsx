import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ToggleFeature } from '@flopflip/react-broadcast';
import Downshift, {
  type ControllerStateAndHelpers,
  type DownshiftProps,
} from 'downshift';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  LOGOUT_REASONS,
  NO_VALUE_FALLBACK,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import Avatar from '@commercetools-uikit/avatar';
import {
  designTokens as uikitDesignTokens,
  useTheme,
} from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { DIMENSIONS } from '../../constants';
import useApplicationsMenu from '../../hooks/use-applications-menu';
import type { TUser } from '../../types/generated/mc';
import type { TFetchApplicationsMenuQuery } from '../../types/generated/proxy';
import messages from './messages';

type Props = Pick<
  TUser,
  'language' | 'firstName' | 'lastName' | 'email' | 'gravatarHash'
>;
type MenuBodyProps = Props & {
  downshiftProps: ControllerStateAndHelpers<{}>;
};
type OptionalFeatureToggleProps = {
  featureToggle?: string;
  children: ReactNode;
};
type MenuItemProps = {
  hasDivider?: boolean;
};
type MenuItemLabelProps = {
  children: ReactNode;
};
type UserSettingsAvatarContainerProps = {
  children: ReactNode;
};
type MenuConfig = TFetchApplicationsMenuQuery['applicationsMenu']['appBar'][0];

const MENU_LABEL_ID = 'user-menu-setting-menu-label';

const UserAvatar = (
  props: Pick<Props, 'firstName' | 'lastName' | 'gravatarHash'>
) => {
  const { themedValue } = useTheme();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleMouseOver = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const handleMouseOut = useCallback(() => {
    setIsMouseOver(false);
  }, []);
  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Spacings.Inline alignItems="center">
        <Avatar
          size="m"
          gravatarHash={props.gravatarHash}
          firstName={props.firstName}
          lastName={props.lastName}
          isHighlighted={isMouseOver}
          color={themedValue('accent', 'purple')}
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
  color: ${uikitDesignTokens.colorSolid};

  :hover {
    background-color: ${uikitDesignTokens.colorNeutral95};
  }

  ${(props) =>
    props.hasDivider === true
      ? css`
          border-bottom: 1px solid ${uikitDesignTokens.colorNeutral};
          margin: ${uikitDesignTokens.spacing10} 0;
        `
      : ''};
`;

const MenuItemLabel = (props: MenuItemLabelProps) => (
  <div
    css={css`
      padding: ${uikitDesignTokens.spacing20} ${uikitDesignTokens.spacing50};
    `}
  >
    {props.children}
  </div>
);

const UserSettingsAvatarContainer = (
  props: UserSettingsAvatarContainerProps
) => (
  <div
    css={css`
      padding: ${uikitDesignTokens.spacing30} ${uikitDesignTokens.spacing50};
    `}
  >
    {props.children}
  </div>
);

const getUserSettingsMenuStyles = () => {
  return css`
    position: absolute;
    background: ${uikitDesignTokens.colorSurface};
    border-radius: ${uikitDesignTokens.borderRadius2};
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
    width: ${uikitDesignTokens.constraint9};
    right: 40px;
    top: calc(${DIMENSIONS.header} + ${uikitDesignTokens.spacing20});
    padding: 0 0 ${uikitDesignTokens.spacing10} 0;
    overflow: hidden;
  `;
};

const getUserSettingsMenuItemLinkStyles = () => css`
  display: block;
`;

const UserSettingsMenuBody = (props: MenuBodyProps) => {
  // Focus on a menu item when it's opened through keyboard
  const menuElementRef = useRef<HTMLAnchorElement>(null);
  const { themedValue } = useTheme();
  useEffect(() => {
    menuElementRef.current?.focus();
  }, []);

  const environment = useApplicationContext((context) => context.environment);

  const applicationsAppBarMenu = useApplicationsMenu<'appBar'>('appBar', {
    queryOptions: {
      onError: reportErrorToSentry,
    },
    environment,
  });
  const accountMenuItems = applicationsAppBarMenu ?? [];

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
      css={getUserSettingsMenuStyles()}
    >
      <div {...props.downshiftProps.getMenuProps()}>
        <UserSettingsAvatarContainer>
          <Spacings.Inline scale="m" alignItems="center">
            <Avatar
              size="m"
              firstName={props.firstName}
              lastName={props.lastName}
              gravatarHash={props.gravatarHash}
              color={themedValue('accent', 'purple')}
            />
            <div>
              <Text.Subheadline as="h4">
                {[props.firstName, props.lastName].join(' ').trim()}
              </Text.Subheadline>
              <Text.Detail truncate tone="secondary">
                {props.email}
              </Text.Detail>
            </div>
          </Spacings.Inline>
        </UserSettingsAvatarContainer>
        {accountMenuItems.length > 0 ? <MenuItem hasDivider={true} /> : null}
        {accountMenuItems.map((menu) => (
          <OptionalFeatureToggle
            key={menu.key}
            featureToggle={menu.featureToggle ?? undefined}
          >
            <Link
              css={getUserSettingsMenuItemLinkStyles()}
              to={`/account/${menu.uriPath}`}
              onClick={() => props.downshiftProps.toggleMenu()}
              data-user-settings-menu
              ref={menuElementRef}
            >
              <MenuItem>
                <MenuItemLabel>
                  <Text.Body>{renderLabel(menu, props.language)}</Text.Body>
                </MenuItemLabel>
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
            <MenuItemLabel>
              <Text.Body intlMessage={messages.privacyPolicy} />
            </MenuItemLabel>
          </MenuItem>
        </a>
        <a
          css={getUserSettingsMenuItemLinkStyles()}
          href={SUPPORT_PORTAL_URL}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => props.downshiftProps.toggleMenu()}
          data-user-settings-menu
        >
          <MenuItem>
            <MenuItemLabel>
              <Text.Body intlMessage={messages.support} />
            </MenuItemLabel>
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
            <MenuItemLabel>
              <Text.Body intlMessage={messages.logout} />
            </MenuItemLabel>
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
      <AccessibleHidden>
        <span id={MENU_LABEL_ID}>
          <FormattedMessage {...messages.menuLabel} />
        </span>
      </AccessibleHidden>
      <Downshift stateReducer={stateReducer} labelId={MENU_LABEL_ID}>
        {(downshiftProps) => (
          <div>
            <button
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
