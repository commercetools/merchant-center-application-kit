import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { ToggleFeature } from '@flopflip/react-broadcast';
import onClickOutside from 'react-onclickoutside';
import { CaretDownIcon } from '@commercetools-local/ui-kit/icons';
import Text from '@commercetools-local/ui-kit/typography/text';
import withMouseOverState from '@commercetools-local/ui-kit/hocs/with-mouse-over-state';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import { LOGOUT_REASONS } from '@commercetools-local/constants';
import formatUserName from '@commercetools-local/utils/user';
import Avatar from '@commercetools-local/core/components/avatar';
import Card from '@commercetools-local/core/components/card';
import styles from './user-settings-menu.mod.css';
import messages from './messages';

export class UserSettingsMenu extends React.PureComponent {
  static displayName = 'UserSettingsMenu';

  static propTypes = {
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    // Injected
    handleMouseOver: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    isMouseOver: PropTypes.bool.isRequired,
  };

  state = {
    isUserMenuOpen: false,
  };

  handleClickOutside = () => this.setState({ isUserMenuOpen: false });

  handleClick = () => {
    this.setState(prevState => ({ isUserMenuOpen: !prevState.isUserMenuOpen }));
  };

  render() {
    return (
      <div className={styles.container} data-test="user-settings-menu">
        <div
          className={styles['settings-container']}
          onClick={this.handleClick}
          onMouseOver={this.props.handleMouseOver}
          onMouseOut={this.props.handleMouseOut}
        >
          <Spacings.Inline alignItems="center">
            <div className={styles.avatar}>
              <Avatar
                email={this.props.email}
                firstName={this.props.firstName}
                lastName={this.props.lastName}
              />
            </div>
            <CaretDownIcon
              size="small"
              theme={this.props.isMouseOver ? 'grey' : 'black'}
            />
          </Spacings.Inline>
        </div>
        {this.state.isUserMenuOpen && (
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
              <Link to={`/profile`}>
                <div className={styles.item}>
                  <Spacings.Inset scale="s">
                    <FormattedMessage {...messages.userProfile} />
                  </Spacings.Inset>
                </div>
              </Link>
            </ToggleFeature>
            <Link
              to={`/logout?reason=${LOGOUT_REASONS.USER}`}
              data-test="logout-button"
            >
              <div className={styles.item}>
                <Spacings.Inset scale="s">
                  <FormattedMessage {...messages.logout} />
                </Spacings.Inset>
              </div>
            </Link>
          </Card>
        )}
      </div>
    );
  }
}

export default compose(withMouseOverState, onClickOutside)(UserSettingsMenu);
