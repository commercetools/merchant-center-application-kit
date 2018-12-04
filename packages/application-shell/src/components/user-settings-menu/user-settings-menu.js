import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import Card from '../../from-core/card';
import { MCSupportFormURL } from '../../constants';
import { PROJECTS_LIST, ORGANIZATIONS_LIST } from '../../feature-toggles';
import styles from './user-settings-menu.mod.css';
import messages from './messages';

export const UserAvatar = props => (
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

export class UserSettingsMenu extends React.PureComponent {
  static displayName = 'UserSettingsMenu';

  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    gravatarHash: PropTypes.string.isRequired,
    isAccountPath: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div data-test="user-settings-menu">
        <Downshift stateReducer={stateReducer}>
          {({ isOpen, toggleMenu, getToggleButtonProps, getMenuProps }) => (
            <div>
              <button
                className={styles['settings-container']}
                {...getToggleButtonProps()}
              >
                <UserAvatarWithHoverState
                  firstName={this.props.firstName}
                  lastName={this.props.lastName}
                  gravatarHash={this.props.gravatarHash}
                />
              </button>
              {isOpen && (
                <Card className={styles.menu}>
                  <div {...getMenuProps()}>
                    <div
                      className={classnames({
                        [styles['item-divider-account-section']]: this.props
                          .isAccountPath,
                      })}
                    >
                      <Spacings.Inset scale="xs">
                        <Spacings.Inline scale="xs" alignItems="center">
                          <Avatar
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            gravatarHash={this.props.gravatarHash}
                          />
                          <div
                            className={classnames({
                              [styles['email-divider']]: this.props
                                .isAccountPath,
                            })}
                          >
                            <Text.Body isBold>
                              {[this.props.firstName, this.props.lastName]
                                .join(' ')
                                .trim()}
                            </Text.Body>
                            <Text.Body truncate>{this.props.email}</Text.Body>
                          </div>
                        </Spacings.Inline>
                      </Spacings.Inset>
                    </div>
                    {!this.props.isAccountPath && (
                      <React.Fragment>
                        <Link to="/account/profile" onClick={toggleMenu}>
                          <div className={styles.item}>
                            <Spacings.Inset scale="s">
                              <FormattedMessage {...messages.userProfile} />
                            </Spacings.Inset>
                          </div>
                        </Link>
                        <ToggleFeature flag={ORGANIZATIONS_LIST}>
                          <Link
                            to="/account/organizations"
                            onClick={toggleMenu}
                          >
                            <div className={styles.item}>
                              <Spacings.Inset scale="s">
                                <FormattedMessage
                                  {...messages.manageOrganizations}
                                />
                              </Spacings.Inset>
                            </div>
                          </Link>
                        </ToggleFeature>
                        <ToggleFeature flag={PROJECTS_LIST}>
                          <Link to="/account/projects" onClick={toggleMenu}>
                            <div
                              className={classnames(
                                styles.item,
                                styles['item-divider-account-section']
                              )}
                            >
                              <Spacings.Inset scale="s">
                                <FormattedMessage
                                  {...messages.manageProjects}
                                />
                              </Spacings.Inset>
                            </div>
                          </Link>
                        </ToggleFeature>
                      </React.Fragment>
                    )}
                    <a
                      href={`https://commercetools.com/privacy`}
                      target="_blank"
                      onClick={toggleMenu}
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
                      onClick={toggleMenu}
                    >
                      <div
                        className={classnames(
                          styles.item,
                          styles['item-divider-account-section']
                        )}
                      >
                        <Spacings.Inset scale="s">
                          <FormattedMessage {...messages.support} />
                        </Spacings.Inset>
                      </div>
                    </a>
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
                </Card>
              )}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default UserSettingsMenu;
