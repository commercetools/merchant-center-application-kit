import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import Downshift from 'downshift';
import { ToggleFeature } from '@flopflip/react-broadcast';
import withMouseOverState from '@commercetools-frontend/ui-kit/hocs/with-mouse-over-state';
import { CaretDownIcon } from '@commercetools-frontend/ui-kit/icons';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import Spacings from '@commercetools-frontend/ui-kit/materials/spacings';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import Card from '../../from-core/card';
import { MCSupportFormURL } from '../../constants';
import Avatar from '../avatar';
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
  // Injected
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};
const UserAvatarWithHoverState = withMouseOverState(UserAvatar);

export default class UserSettingsMenu extends React.PureComponent {
  static displayName = 'UserSettingsMenu';

  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gravatarHash: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={styles.container} data-test="user-settings-menu">
        <Downshift
          render={({ isOpen, toggleMenu }) => (
            <div>
              <div
                className={styles['settings-container']}
                onClick={toggleMenu}
              >
                <UserAvatarWithHoverState
                  firstName={this.props.firstName}
                  lastName={this.props.lastName}
                  gravatarHash={this.props.gravatarHash}
                />
              </div>
              {isOpen && (
                <Card className={styles.menu}>
                  <Spacings.Inset scale="s">
                    <Text.Detail tone="secondary">
                      {[this.props.firstName, this.props.lastName]
                        .join(' ')
                        .trim()}
                    </Text.Detail>
                  </Spacings.Inset>
                  <Link to="/account/profile" onClick={toggleMenu}>
                    <div className={styles.item}>
                      <Spacings.Inset scale="s">
                        <FormattedMessage {...messages.userProfile} />
                      </Spacings.Inset>
                    </div>
                  </Link>
                  <ToggleFeature flag={ORGANIZATIONS_LIST}>
                    <Link to="/account/organizations" onClick={toggleMenu}>
                      <div className={styles.item}>
                        <Spacings.Inset scale="s">
                          <FormattedMessage {...messages.manageOrganizations} />
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
                          <FormattedMessage {...messages.manageProjects} />
                        </Spacings.Inset>
                      </div>
                    </Link>
                  </ToggleFeature>
                  {
                    // FIXME: added as urgent request for GDPR changes
                    // Should be properly added on the CTP-1209 task
                  }
                  <a href={`https://commercetools.com/privacy`} target="_blank">
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
                  >
                    <div className={styles.item}>
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
                    <div className={styles.item}>
                      <Spacings.Inset scale="s">
                        <FormattedMessage {...messages.logout} />
                      </Spacings.Inset>
                    </div>
                  </a>
                </Card>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}
