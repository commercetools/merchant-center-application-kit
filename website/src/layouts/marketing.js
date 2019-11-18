import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  LayoutApplication,
  LayoutHeader,
  LayoutFooter,
  LayoutMain,
  designSystem,
  useSiteData,
} from '@commercetools-docs/gatsby-theme-docs';
import LandingPageBackground from '../images/landing-page-background.png';

const LayoutMarketing = props => {
  const siteData = useSiteData();
  return (
    <LayoutApplication>
      <LayoutHeader siteTitle={siteData.siteMetadata.title} />
      <LayoutMain
        css={css`
          grid-column: 1/4;
        `}
      >
        <div
          css={css`
            box-shadow: ${designSystem.tokens.shadow1};
            background: url('${LandingPageBackground}');
            background-repeat: repeat-x;
            background-position-x: center;
            background-position-y: -25rem;
            padding: ${designSystem.dimensions.spacings.xl} ${designSystem.dimensions.spacings.m};

            > * + * {
              margin-top: ${designSystem.dimensions.spacings.xl} !important;
            }

            @media screen and (${designSystem.dimensions.viewports.largeTablet}) {
              background-position-y: -40rem;
              padding: ${designSystem.dimensions.spacings.xl};
            }
          `}
        >
          {props.children}
        </div>
        <LayoutFooter />
      </LayoutMain>
    </LayoutApplication>
  );
};
LayoutMarketing.displayName = 'LayoutMarketing';
LayoutMarketing.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMarketing;
