import React from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import {
  withApplicationContext,
  Context,
} from '@commercetools-frontend/application-shell-connectors';
import { connect } from 'react-redux';
import {
  LoadingSpinner,
  Spacings,
  Text,
  LinkButton,
  ListIcon,
  CheckBoldIcon,
  Grid,
  Constraints,
} from '@commercetools-frontend/ui-kit';
import { fetchStateMachine } from './actions';

export class StateMachinesDetails extends React.Component {
  static displayName = 'StateMachinesDetails';
  static propTypes = {
    id: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    backToListPath: PropTypes.string.isRequired,
    // withApplicationContext
    dataLocale: PropTypes.string.isRequired,
    // connect
    fetchStateMachine: PropTypes.func.isRequired,
  };
  state = {
    isLoading: true,
    error: null,
    data: null,
  };
  componentDidMount() {
    this.props.fetchStateMachine(this.props.id).then(
      data => {
        this.setState({ data, isLoading: false });
      },
      error => {
        this.setState({ error, isLoading: false });
        throw error;
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <Spacings.Inset scale="m">
        <Spacings.Stack scale="l">
          <LinkButton
            iconLeft={<ListIcon />}
            label="Back to list"
            to={this.props.backToListPath}
          />
          <Spacings.Stack scale="xs">
            <Text.Headline elementType="h2">
              {this.state.data.name
                ? this.state.data.name[this.props.dataLocale]
                : 'n/a'}
            </Text.Headline>
            <Text.Detail>{this.state.data.key}</Text.Detail>
          </Spacings.Stack>
          <Constraints.Horizontal constraint="m">
            <Grid
              gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <Text.Body>Type</Text.Body>
              <Text.Body>{this.state.data.type}</Text.Body>
              <Text.Body>Built In</Text.Body>
              <Text.Body>
                {this.state.data.builtIn ? <CheckBoldIcon /> : null}
              </Text.Body>
              <Text.Body>Initial</Text.Body>
              <Text.Body>
                {this.state.data.initial ? <CheckBoldIcon /> : null}
              </Text.Body>
            </Grid>
          </Constraints.Horizontal>
        </Spacings.Stack>
      </Spacings.Inset>
    );
  }
}

export default flowRight(
  withApplicationContext(context => {
    return {
      dataLocale: context.dataLocale,
    };
  }),
  connect(
    null,
    {
      fetchStateMachine,
    }
  )
)(StateMachinesDetails);
