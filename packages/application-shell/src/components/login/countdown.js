import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InfoDialog from '../../from-core/info-dialog';
import messages from './messages';

const initialCount = 3;

export class Countdown extends React.PureComponent {
  static displayName = 'Countdown';

  static propTypes = {
    redirectTo: PropTypes.func.isRequired,
  };

  state = {
    countdown: initialCount,
    isDialogOpen: false,
  };

  componentDidUpdate() {
    if (this.state.countdown === 0) {
      this.props.redirectTo();
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
    }, 1000);
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
          isOpen={this.state.isDialogOpen}
          onClose={this.closeRedirectDialog}
        >
          <InfoDialog.Title>
            <FormattedMessage
              {...messages.forgotPasswordTitle}
              values={{ countdown: this.state.countdown }}
            />
          </InfoDialog.Title>
        </InfoDialog>
      </React.Fragment>
    );
  }
}

export default Countdown;
