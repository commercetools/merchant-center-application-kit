import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSdkGet } from '@commercetools-frontend/sdk';
import { ApplicationStoreContext } from '../../store';
import * as actions from './actions';

const SdkGet = createSdkGet({ context: ApplicationStoreContext });

class StateMachinesListConnector extends React.Component {
  static displayName = 'StateMachinesListConnector';
  static propTypes = {
    children: PropTypes.func.isRequired,
    projectKey: PropTypes.string.isRequired,
    // Action creators
    setStateMachines: PropTypes.func.isRequired,
  };
  render() {
    return (
      <SdkGet
        actionCreator={requestParams =>
          actions.fetchStateMachines(requestParams, {
            projectKey: this.props.projectKey,
          })
        }
        actionCreatorArgs={[
          {
            // FIXME: expose pagination component from packages
            perPage: 25,
            page: 1,
          },
        ]}
        onSuccess={response => this.props.setStateMachines(response.results)}
        render={({ isLoading, result, error, refresh }) => {
          const hasNoResults = Boolean(
            !isLoading && result && result.total === 0
          );
          return this.props.children({
            isLoading,
            error,
            result,
            hasNoResults,
            refresh,
          });
        }}
      />
    );
  }
}

export default connect(
  null,
  { setStateMachines: actions.setStateMachines },
  undefined,
  { context: ApplicationStoreContext }
)(StateMachinesListConnector);
