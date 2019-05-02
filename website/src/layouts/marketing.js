import React from 'react';
import PropTypes from 'prop-types';
import LayoutContainer from './internals/layout-container';
import LayoutHeader from './internals/layout-header';
import LayoutFooter from './internals/layout-footer';
import LayoutMain from './internals/layout-main';
import Globals from './internals/globals';

const LayoutMarketing = props => (
  <React.Fragment>
    <Globals />
    <LayoutContainer>
      <LayoutHeader />
      <LayoutMain columns={1}>
        {props.children}
        <LayoutFooter />
      </LayoutMain>
    </LayoutContainer>
  </React.Fragment>
);
LayoutMarketing.displayName = 'LayoutMarketing';
LayoutMarketing.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMarketing;
