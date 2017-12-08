import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DOMAINS, DOMAIN_DOM_IDS } from '@commercetools-local/constants';

export class NotificationPortal extends React.PureComponent {
  static displayName = 'NotificationPortal';
  static propTypes = {
    domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
    renderNotification: PropTypes.func.isRequired,
  };
  state = {
    portalNode: undefined,
  };
  componentDidMount() {
    /**
     * NOTE: in order to render a component into a portal, the portal
     * DOM node needs to exists in the DOM.
     * If we try to get the DOM node by id before the components are
     * actually mounted, we won't find the DOM node, hence we can't render
     * the portal.
     * To work around this issue, we simply wait that the component is
     * mounted, then we render the portal.
     *
     * From the reactjs docs: https://reactjs.org/docs/portals.html
     * "
     *   If a child component requires to be attached to the DOM tree
     *   immediately when mounted, for example to measure a
     *   DOM node, or uses 'autoFocus' in a descendant, add
     *   state to Modal and only render the children when Modal
     *   is inserted in the DOM tree.
     * "
     */
    this.setState({
      portalNode: document.getElementById(DOMAIN_DOM_IDS[this.props.domain]),
    });
  }
  render() {
    return this.state.portalNode
      ? ReactDOM.createPortal(
          this.props.renderNotification(),
          this.state.portalNode
        )
      : null;
  }
}

export default NotificationPortal;
