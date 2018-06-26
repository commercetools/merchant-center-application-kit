import React from 'react';
import PropTypes from 'prop-types';
import { Sdk } from '@commercetools-frontend/sdk';
import * as actions from './actions';

class ChannelsListConnector extends React.Component {
  static displayName = 'ChannelsListConnector';
  static propTypes = {
    children: PropTypes.func.isRequired,
    projectKey: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Sdk.Get
        actionCreator={requestParams =>
          actions.fetchChannels(requestParams, {
            language: this.props.language,
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

export default ChannelsListConnector;
