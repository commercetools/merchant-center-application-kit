import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deepEqual } from 'fast-equals';
import * as sdkActions from '../../actions';

class SdkGet extends React.Component {
  static displayName = 'SdkGet';
  static errorHandler = error => {
    throw error;
  };
  static propTypes = {
    // Public API
    actionCreator: PropTypes.func,
    actionCreatorArgs: PropTypes.array,
    shouldRefetch: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    render: PropTypes.func.isRequired,

    // HoC
    dispatch: PropTypes.func.isRequired,
  };
  static defaultProps = {
    actionCreator: sdkActions.get,
    actionCreatorArgs: [],
    shouldRefetch: (prevArgs, nextArgs) => !deepEqual(prevArgs, nextArgs),
  };
  state = {
    requestsInFlight: 0,
    result: null,
    error: null,
  };
  isComponentMounted = false;
  changeRequestsInFlight = delta => {
    if (this.isComponentMounted)
      this.setState(prevState => ({
        requestsInFlight: prevState.requestsInFlight + delta,
      }));
  };
  componentDidMount() {
    this.isComponentMounted = true;
    this.fetch({
      dispatch: this.props.dispatch,
      actionCreator: this.props.actionCreator,
      actionCreatorArgs: this.props.actionCreatorArgs,
      onSuccess: this.props.onSuccess,
      onError: this.props.onError,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.shouldRefetch(
        this.props.actionCreatorArgs,
        nextProps.actionCreatorArgs
      )
    )
      this.fetch({
        dispatch: nextProps.dispatch,
        actionCreator: nextProps.actionCreator,
        actionCreatorArgs: nextProps.actionCreatorArgs,
        onSuccess: nextProps.onSuccess,
        onError: nextProps.onError,
      });
  }
  componentWillUnmount() {
    this.isComponentMounted = false;
  }
  fetch = ({
    dispatch,
    actionCreator,
    actionCreatorArgs,
    onSuccess,
    onError,
  }) => {
    this.changeRequestsInFlight(1);
    return dispatch(actionCreator(...actionCreatorArgs)).then(
      result => {
        this.changeRequestsInFlight(-1);
        if (this.isComponentMounted) this.setState({ error: null, result });
        if (onSuccess) onSuccess(result);
        return result;
      },
      error => {
        this.changeRequestsInFlight(-1);
        if (this.isComponentMounted) this.setState({ error, result: null });
        if (onError) onError(error);
        else SdkGet.errorHandler(error);
      }
    );
  };
  render() {
    return this.props.render({
      isLoading: this.state.requestsInFlight > 0,
      result: this.state.result,
      error: this.state.error,
    });
  }
}

export default connect(null, dispatch => ({ dispatch }))(SdkGet);
