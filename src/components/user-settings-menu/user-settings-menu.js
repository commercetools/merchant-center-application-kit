import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Downshift from 'downshift';
import { ToggleFeature } from '@flopflip/react-broadcast';
import withMouseOverState from '@commercetools-local/ui-kit/hocs/with-mouse-over-state';
import { CaretDownIcon } from '@commercetools-local/ui-kit/icons';
import Text from '@commercetools-local/ui-kit/typography/text';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import { LOGOUT_REASONS } from '@commercetools-local/constants';
import formatUserName from '@commercetools-local/utils/user';
import Avatar from '@commercetools-local/core/components/avatar';
import Card from '@commercetools-local/core/components/card';
import { MCSupportFormURL } from '../../constants';
import styles from './user-settings-menu.mod.css';
import messages from './messages';

export const UserAvatar = props => (
  <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
    <Spacings.Inline alignItems="center">
      <div className={styles.avatar}>
        <Avatar
          email={props.email}
          firstName={props.firstName}
          lastName={props.lastName}
        />
      </div>
      <CaretDownIcon
        size="small"
        theme={props.isMouseOver ? 'grey' : 'black'}
      />
    </Spacings.Inline>
  </div>
);
UserAvatar.displayName = 'UserAvatar';
UserAvatar.propTypes = {
  email: PropTypes.string.isRequired,
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
    email: PropTypes.string.isRequired,
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
                  email={this.props.email}
                />
              </div>
              {isOpen && (
                <Card className={styles.menu}>
                  <Spacings.Inset scale="s">
                    <Text.Detail tone="secondary">
                      {formatUserName({
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                      })}
                    </Text.Detail>
                  </Spacings.Inset>
                  <ToggleFeature flag="userProfile">
                    <Link to="/account/profile" onClick={toggleMenu}>
                      <div className={styles.item}>
                        <Spacings.Inset scale="s">
                          <FormattedMessage {...messages.userProfile} />
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
