import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import flowRight from 'lodash/flowRight';
import classnames from 'classnames';
import Downshift from 'downshift';
import { ToggleFeature } from '@flopflip/react-broadcast';
import {
  withMouseOverState,
  CaretDownIcon,
  Text,
  Spacings,
  Avatar,
} from '@commercetools-frontend/ui-kit';
import {
  LOGOUT_REASONS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { MCSupportFormURL } from '../../constants';
import withApplicationsMenu from '../with-applications-menu';
import handleApolloErrors from '../handle-apollo-errors';
import styles from './user-settings-menu.mod.css';
import messages from './messages';

const UserAvatar = props => (
  <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
    <Spacings.Inline alignItems="center">
      <Avatar
        gravatarHash={props.gravatarHash}
        firstName={props.firstName}
        lastName={props.lastName}
        isHighlighted={props.isMouseOver}
      />
      <CaretDownIcon
        size="small"
        theme={props.isMouseOver ? 'grey' : 'black'}
      />
    </Spacings.Inline>
  </div>
);
UserAvatar.displayName = 'UserAvatar';
UserAvatar.propTypes = {
  gravatarHash: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  // Injected
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};
const UserAvatarWithHoverState = withMouseOverState(UserAvatar);

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

const UserSettingsMenuBody = props => {
  const menuLinks =
    (props.applicationsMenuQuery &&
      props.applicationsMenuQuery.applicationsMenu &&
      props.applicationsMenuQuery.applicationsMenu.appBar) ||
    [];

  return (
    <div className={styles.menu}>
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
              <div className={styles.item}>
                <Spacings.Inset scale="s">
                  {renderLabel(menu, props.locale)}
                </Spacings.Inset>
              </div>
            </Link>
          </OptionalFeatureToggle>
        ))}
        <div
          className={classnames(
            styles.item,
            styles['item-divider-account-section']
          )}
        />
        <a
          href={`https://commercetools.com/privacy#suppliers`}
          target="_blank"
          onClick={props.downshiftProps.toggleMenu}
        >
          <div className={styles.item}>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.privacyPolicy} />
            </Spacings.Inset>
          </div>
        </a>
        <a
          href={MCSupportFormURL}
          rel="noopener noreferrer"
          target="_blank"
          data-track-component="Navigation-Support-links"
          data-track-event="click"
          data-track-label="support_textlink"
          onClick={props.downshiftProps.toggleMenu}
        >
          <div className={styles.item}>
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.support} />
            </Spacings.Inset>
          </div>
        </a>
        <div
          className={classnames(
            styles.item,
            styles['item-divider-account-section']
          )}
        />
        <a
          // NOTE: we want to redirect to a new page so that the
          // server can remove things like cookie for access token.
          href={`/logout?reason=${LOGOUT_REASONS.USER}`}
          data-test="logout-button"
        >
          <div className={styles.item} tabIndex="0">
            <Spacings.Inset scale="s">
              <FormattedMessage {...messages.logout} />
            </Spacings.Inset>
          </div>
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
            className={styles['settings-container']}
            {...downshiftProps.getToggleButtonProps()}
          >
            <UserAvatarWithHoverState
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
export {
  UserAvatar,
  UserAvatarWithHoverState,
  UserSettingsMenuBody,
  ConnectedUserSettingsMenuBody,
};
