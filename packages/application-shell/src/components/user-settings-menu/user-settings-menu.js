import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import flowRight from 'lodash/flowRight';
import Downshift from 'downshift';
import { ToggleFeature } from '@flopflip/react-broadcast';
import {
  CaretDownIcon,
  Text,
  Spacings,
  Avatar,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import {
  LOGOUT_REASONS,
  NO_VALUE_FALLBACK,
  SUPPORT_PORTAL_URL,
} from '@commercetools-frontend/constants';
import withApplicationsMenu from '../with-applications-menu';
import handleApolloErrors from '../handle-apollo-errors';
import messages from './messages';

const UserAvatar = props => {
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
UserAvatar.propTypes = {
  gravatarHash: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

function stateReducer(state, changes) {
  switch (changes.type) {
    // So in case the user wants to navigate with the tab button
    // we need to make sure that the menu does not close
    case Downshift.stateChangeTypes.blurButton:
      return {
        ...changes,
        isOpen: true,
      };
    default:
      return changes;
  }
}

const OptionalFeatureToggle = props =>
  props.featureToggle ? (
    <ToggleFeature flag={props.featureToggle}>{props.children}</ToggleFeature>
  ) : (
    props.children
  );
OptionalFeatureToggle.displayName = 'OptionalFeatureToggle';
OptionalFeatureToggle.propTypes = {
  featureToggle: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const renderLabel = (menu, applicationLanguage) => {
  const localizedLabel = menu.labelAllLocales.find(loc =>
    applicationLanguage.startsWith(loc.locale)
  );
  if (localizedLabel) return localizedLabel.value;
  return NO_VALUE_FALLBACK;
};

const MenuItem = styled.div`
  width: 100%;
  cursor: pointer;
  color: ${customProperties.colorSolid};

  :hover {
    background-color: ${customProperties.colorNeutral90};
  }

  ${props =>
    props.hasDivider
      ? css`
          border-bottom: 1px solid ${customProperties.colorNeutral};
        `
      : ''};
`;

const UserSettingsMenuBody = props => {
  const menuLinks =
    (props.applicationsMenuQuery &&
      props.applicationsMenuQuery.applicationsMenu &&
      props.applicationsMenuQuery.applicationsMenu.appBar) ||
    [];

  return (
    <div
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
        {menuLinks.map(menu => (
          <OptionalFeatureToggle
            key={menu.key}
            featureToggle={menu.featureToggle}
          >
            <Link
              to={`/account/${menu.uriPath}`}
              onClick={props.downshiftProps.toggleMenu}
            >
              <MenuItem>
                <Spacings.Inset scale="s">
                  {renderLabel(menu, props.locale)}
                </Spacings.Inset>
              </MenuItem>
            </Link>
          </OptionalFeatureToggle>
        ))}
        <MenuItem hasDivider={true} />
        <a
          href={`https://commercetools.com/privacy#suppliers`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.downshiftProps.toggleMenu}
        >
          <MenuItem>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.privacyPolicy} />
            </Spacings.Inset>
          </MenuItem>
        </a>
        <a
          href={SUPPORT_PORTAL_URL}
          rel="noopener noreferrer"
          target="_blank"
          data-track-component="Navigation-Support-links"
          data-track-event="click"
          data-track-label="support_textlink"
          onClick={props.downshiftProps.toggleMenu}
        >
          <MenuItem>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.support} />
            </Spacings.Inset>
          </MenuItem>
        </a>
        <MenuItem hasDivider={true} />
        <a
          // NOTE: we want to redirect to a new page so that the
          // server can remove things like cookie for access token.
          href={`/logout?reason=${LOGOUT_REASONS.USER}`}
          data-test="logout-button"
        >
          <MenuItem tabIndex="0">
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.logout} />
            </Spacings.Inset>
          </MenuItem>
        </a>
      </div>
    </div>
  );
};
UserSettingsMenuBody.displayName = 'UserSettingsMenuBody';
UserSettingsMenuBody.propTypes = {
  locale: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string.isRequired,
  gravatarHash: PropTypes.string.isRequired,
  downshiftProps: PropTypes.shape({
    toggleMenu: PropTypes.func.isRequired,
    getMenuProps: PropTypes.func.isRequired,
  }).isRequired,
  // graphql
  applicationsMenuQuery: PropTypes.shape({
    applicationsMenu: PropTypes.shape({
      appBar: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  }),
};

const ConnectedUserSettingsMenuBody = flowRight(
  withApplicationsMenu({
    queryName: 'applicationsMenuQuery',
    queryOptions: {
      // We can assume here that the navbar already fetched the data, since this
      // component gets rendered only when the user opens the menu
      fetchPolicy: 'cache-only',
    },
    skipRemoteQuery: ownProps => !ownProps.environment.servedByProxy,
    options: ownProps => ({
      __DEV_CONFIG__: {
        menuLoader: ownProps.DEV_ONLY__loadAppbarMenuConfig,
        menuKey: 'appBar',
      },
    }),
  }),
  handleApolloErrors(['applicationsMenuQuery'])
)(UserSettingsMenuBody);

const UserSettingsMenu = props => (
  <div data-test="user-settings-menu">
    <Downshift stateReducer={stateReducer}>
      {downshiftProps => (
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
            {...downshiftProps.getToggleButtonProps()}
          >
            <UserAvatar
              firstName={props.firstName}
              lastName={props.lastName}
              gravatarHash={props.gravatarHash}
            />
          </button>
          {downshiftProps.isOpen && (
            <ConnectedUserSettingsMenuBody
              {...props}
              downshiftProps={downshiftProps}
            />
          )}
        </div>
      )}
    </Downshift>
  </div>
);
UserSettingsMenu.displayName = 'UserSettingsMenu';
UserSettingsMenu.propTypes = {
  locale: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string.isRequired,
  gravatarHash: PropTypes.string.isRequired,
  DEV_ONLY__getMenuConfig: PropTypes.func,
};

export default UserSettingsMenu;

// For testing
export { UserAvatar, UserSettingsMenuBody, ConnectedUserSettingsMenuBody };
