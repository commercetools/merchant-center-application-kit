import React, { ErrorInfo } from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ErrorApologizer from '../error-apologizer';

type Props = {
  pathname?: string;
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(/* error */) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  state = {
    hasError: false,
  };

  componentDidUpdate(prevProps: Props) {
    const hasRouteChanged = prevProps.pathname !== this.props.pathname;
    this.setState(prevState =>
      hasRouteChanged && prevState.hasError ? { hasError: false } : null
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Note: In development mode componentDidCatch is not based on try-catch
    // to catch exceptions. Thus exceptions caught here will also be caught in
    // the global `error` event listener (setup-global-error-listener.js).
    // see: https://github.com/facebook/react/issues/10474
    reportErrorToSentry(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorApologizer />;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
