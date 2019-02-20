import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { Text } from '@commercetools-frontend/ui-kit';
import messages from './messages';

const initialCount = 3;
const countInterval = process.NODE_ENV === 'test' ? 1 : 1000;

export class Countdown extends React.PureComponent {
  static displayName = 'Countdown';

  static propTypes = {
    onCountEnd: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    countdown: initialCount,
    isDialogOpen: false,
  };

  componentDidUpdate() {
    if (this.state.countdown === 0) {
      this.props.onCountEnd();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  openRedirectDialog = event => {
    event.preventDefault();
    this.setState({ isDialogOpen: true });
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.setState(prevState => {
        const nextCountDown = prevState.countdown - 1;
        return {
          countdown: nextCountDown > 0 ? nextCountDown : 0,
        };
      });
    }, countInterval);
  };

  closeRedirectDialog = () => {
    clearInterval(this.interval);
    this.setState({
      isDialogOpen: false,
      countdown: initialCount,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({ handleClick: this.openRedirectDialog })}
        <InfoDialog
          title={this.props.intl.formatMessage(messages.forgotPassword)}
          isOpen={this.state.isDialogOpen}
          onClose={this.closeRedirectDialog}
        >
          <Text.Body>
            <FormattedMessage
              {...messages.forgotPasswordTitle}
              values={{ countdown: this.state.countdown }}
            />
          </Text.Body>
        </InfoDialog>
      </React.Fragment>
    );
  }
}

export default injectIntl(Countdown);
