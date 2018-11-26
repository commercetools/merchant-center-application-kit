import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import * as gtm from '../../utils/gtm';
import trackingEvents from './tracking-events';
import ButlerContainer from './butler-container';

const QuickAccessModal = React.lazy(() =>
  import('./quick-access' /* webpackChunkName: "quick-access" */)
);

class QuickAccessContainer extends React.Component {
  static displayName = 'QuickAccessContainer';
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  state = {
    hasError: false,
  };
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Note: In development mode componentDidCatch is not based on try-catch
    // to catch exceptions. Thus exceptions caught here will also be caught in
    // the global `error` event listener (setup-global-error-listener.js).
    // see: https://github.com/facebook/react/issues/10474
    reportErrorToSentry(error, { extra: errorInfo });
  }
  render() {
    // render no overlay in case of loding error, just show nothing then
    if (this.state.hasError) return null;
    return (
      <React.Suspense fallback={<ButlerContainer />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}

export default class QuickAccessTrigger extends React.Component {
  static displayName = 'QuickAccessTrigger';

  componentDidMount() {
    document.addEventListener('keydown', this.handler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handler);
  }

  // If for some reason an error is thrown, catch it and do not render QuickAccess
  // to avoid crashing the entire app.
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Note: In development mode componentDidCatch is not based on try-catch
    // to catch exceptions. Thus exceptions caught here will also be caught in
    // the global `error` event listener (setup-global-error-listener.js).
    // see: https://github.com/facebook/react/issues/10474
    reportErrorToSentry(error, { extra: errorInfo });
  }

  state = {
    isVisible: false,
    hasError: false,
  };

  handler = event => {
    const hotKey = 'f';
    // avoid interfering with any key combinations using modifier keys
    if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
      return;

    // Let users close QuickAccess by pressing Escape
    if (
      event.key === 'Escape' &&
      event.target.id === 'quick-access-search-input'
    ) {
      this.setState({ isVisible: false });
      return;
    }

    // Avoid interfering with any other elements. We only
    // open the QuickAccess when nothing was focused, so target is document.body
    if (
      event.target !== document.body &&
      // tabIndex="-1" has a special meaning
      // It will make the element focusable, while hiding it from the
      // navigation. It is typically used for modals and overlays.
      // react-modal uses it for example. We want to treat those elements
      // similar to document.body.
      // See https://stackoverflow.com/a/32912224
      event.target.getAttribute('tabindex') !== '-1' &&
      // Do not prevent Quick Access from opening when a link has focus
      event.target.nodeName !== 'A'
    )
      return;

    this.setState(prevState => {
      if (event.key === hotKey) {
        if (!prevState.isVisible) {
          // prevent the letter from appearing in the search input when
          // it is the key press that lead to opening Quick Access
          event.preventDefault();

          // We use tracking directly here as it's the easiest
          // Otherwise we'd have to duplicate injectTracking from core, as we
          // can't import it from there
          gtm.track(
            trackingEvents.openQuickAccess.event,
            trackingEvents.openQuickAccess.category,
            trackingEvents.openQuickAccess.label
          );
        }
        return { isVisible: true };
      }

      return null;
    });
  };

  close = () => {
    this.setState({ isVisible: false });
  };

  render() {
    return this.state.isVisible && !this.state.hasError ? (
      <QuickAccessContainer>
        <QuickAccessModal {...this.props} onClose={this.close} />
      </QuickAccessContainer>
    ) : null;
  }
}
