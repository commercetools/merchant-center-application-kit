import React from 'react';
import Loadable from 'react-loadable';
import ButlerContainer from './butler-container';
import * as gtm from '../../utils/gtm';
import trackingEvents from './tracking-events';

const QuickAccessModal = Loadable({
  loader: () => import('./quick-access' /* webpackChunkName: "quick-access" */),
  loading: ButlerContainer,
});

export default class QuickAccessTrigger extends React.Component {
  static displayName = 'QuickAccessTrigger';

  componentDidMount() {
    document.addEventListener('keydown', this.handler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handler);
  }

  state = { isVisible: false };

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
    return this.state.isVisible ? (
      <QuickAccessModal {...this.props} onClose={this.close} />
    ) : null;
  }
}
