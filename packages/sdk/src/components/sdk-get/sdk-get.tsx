import { Component } from 'react';
import type { SuccessResult, HttpErrorType } from '@commercetools/sdk-client';
import { deepEqual } from 'fast-equals';
import { connect } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { TSdkAction } from '../../types';

type TSdkError = Error | HttpErrorType;
type TActionCreatorArgs = unknown[];
type State = {
  // We want the component to have a loading state by default, so we
  // keep track of whether the first request has completed.
  // We can't use requestsInFlight only as that would lead to a flash of
  // the loading state until the first request starts in componentDidMount.
  isWaitingForCompletionOfFirstRequest: boolean;
  requestsInFlight: number;
  result?: SuccessResult['body'];
  error?: TSdkError;
};
type TRenderOptions = {
  isLoading: boolean;
  refresh: () => Promise<void | SuccessResult['body']>;
  result?: State['result'];
  error?: State['error'];
};
type DispatchProps = {
  dispatch: (action: TSdkAction) => Promise<SuccessResult['body']>;
};
type OwnProps = {
  actionCreator: (...args: TActionCreatorArgs) => TSdkAction;
  actionCreatorArgs: TActionCreatorArgs;
  shouldRefetch: (
    prevArgs: TActionCreatorArgs,
    nextArgs: TActionCreatorArgs
  ) => boolean;
  onSuccess?: (result: SuccessResult['body']) => void;
  onError?: (error: TSdkError) => void;
  render: (options: TRenderOptions) => JSX.Element;
};
export type Props = DispatchProps & OwnProps;
type StaticErrorHandler = (error: TSdkError) => void;

export class SdkGet extends Component<Props, State> {
  static displayName = 'SdkGet';
  static errorHandler: StaticErrorHandler = (error: TSdkError) => {
    throw error;
  };
  static defaultProps: Pick<Props, 'actionCreatorArgs' | 'shouldRefetch'> = {
    actionCreatorArgs: [],
    shouldRefetch: (prevArgs, nextArgs) => !deepEqual(prevArgs, nextArgs),
  };
  state = {
    // We want the component to have a loading state by default, so we
    // keep track of whether the first request has completed.
    // We can't use requestsInFlight only as that would lead to a flash of
    // the loading state until the first request starts in componentDidMount.
    isWaitingForCompletionOfFirstRequest: true,
    requestsInFlight: 0,
    result: undefined,
    error: undefined,
  };
  isComponentMounted = false;
  changeRequestsInFlight = (delta: number) => {
    if (this.isComponentMounted)
      this.setState((prevState) => ({
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
    }).then(
      (result) => {
        if (this.isComponentMounted)
          this.setState({ isWaitingForCompletionOfFirstRequest: false });
        return result;
      },
      (error) => {
        if (this.isComponentMounted)
          this.setState({ isWaitingForCompletionOfFirstRequest: false });
        throw error;
      }
    );
  }
  componentDidUpdate(prevProps: Props) {
    if (
      this.props.shouldRefetch(
        prevProps.actionCreatorArgs,
        this.props.actionCreatorArgs
      )
    )
      this.fetch({
        dispatch: this.props.dispatch,
        actionCreator: this.props.actionCreator,
        actionCreatorArgs: this.props.actionCreatorArgs,
        onSuccess: this.props.onSuccess,
        onError: this.props.onError,
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
  }: Pick<
    Props,
    'dispatch' | 'actionCreator' | 'actionCreatorArgs' | 'onSuccess' | 'onError'
  >) => {
    this.changeRequestsInFlight(1);
    return dispatch(actionCreator(...actionCreatorArgs)).then(
      (result) => {
        this.changeRequestsInFlight(-1);
        if (this.isComponentMounted)
          this.setState({ error: undefined, result });
        if (onSuccess) onSuccess(result);
        return result;
      },
      (error: TSdkError) => {
        this.changeRequestsInFlight(-1);
        if (this.isComponentMounted)
          this.setState({ error, result: undefined });
        if (onError) onError(error);
        else SdkGet.errorHandler(error);
      }
    );
  };
  refresh = () =>
    this.fetch({
      dispatch: this.props.dispatch,
      actionCreator: this.props.actionCreator,
      actionCreatorArgs: this.props.actionCreatorArgs,
      onSuccess: this.props.onSuccess,
      onError: this.props.onError,
    });
  render() {
    return this.props.render({
      isLoading:
        this.state.requestsInFlight > 0 ||
        this.state.isWaitingForCompletionOfFirstRequest,
      refresh: this.refresh,
      result: this.state.result,
      error: this.state.error,
    });
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<null, null, TSdkAction>
): DispatchProps => ({
  dispatch,
});
export default connect<null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(SdkGet);
