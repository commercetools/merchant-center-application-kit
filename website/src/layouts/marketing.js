import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  dimensions,
  tokens,
} from '@commercetools-docs/gatsby-theme-docs/src/design-system';
import LayoutApplication from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/layout-application';
import LayoutHeader from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/layout-header';
import LayoutFooter from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/layout-footer';
import LayoutMain from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/layout-main';
import Globals from '@commercetools-docs/gatsby-theme-docs/src/layouts/internals/globals';
import LandingPageBackground from '../images/landing-page-background.png';

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
