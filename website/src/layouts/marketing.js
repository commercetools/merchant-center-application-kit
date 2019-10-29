import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import LandingPageBackground from '../images/landing-page-background.png';
import { dimensions, tokens } from '../design-system';
import LayoutApplication from './internals/layout-application';
import LayoutHeader from './internals/layout-header';
import LayoutFooter from './internals/layout-footer';
import LayoutMain from './internals/layout-main';
import Globals from './internals/globals';

const LayoutMarketing = props => (
  <React.Fragment>
    <Globals />
    <LayoutApplication>
      <LayoutHeader />
      <LayoutMain
        css={css`
          grid-column: 1/4;
        `}
      >
        <div
          css={css`
            box-shadow: ${tokens.shadow1};
            background: url('${LandingPageBackground}');
            background-repeat: repeat-x;
            background-position-x: center;
            background-position-y: -25rem;
            padding: ${dimensions.spacings.xl} ${dimensions.spacings.m};

            > * + * {
              margin-top: ${dimensions.spacings.xl} !important;
            }

            @media screen and (${dimensions.viewports.largeTablet}) {
              background-position-y: -40rem;
              padding: ${dimensions.spacings.xl};
            }
          `}
        >
          {props.children}
        </div>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  </React.Fragment>
);
LayoutMarketing.displayName = 'LayoutMarketing';
LayoutMarketing.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMarketing;
