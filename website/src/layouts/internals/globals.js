import React from 'react';
import { css, Global } from '@emotion/core';
import { colors, dimensions, typography, tokens } from '../../design-system';

// eslint-disable-next-line react/display-name
const Globals = () => (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100vh;
        color: ${colors.light.textPrimary};
        font-family: ${typography.fontFamilies.primary};
        font-size: ${typography.rootFontSize};
      }

      iframe {
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
      }

      .section-h4 {
        padding: 0 0 0 ${dimensions.spacings.l};
      }

      .gatsby-resp-image-wrapper {
        background-color: ${colors.light.surfaceSecondary1};
        border-radius: ${tokens.borderRadius6};
        margin: ${dimensions.spacings.m} 0;
        padding: ${dimensions.spacings.s};
      }
      .gatsby-resp-image-link {
        text-decoration: none;
      }
      .gatsby-resp-image-image {
        box-shadow: none !important;
        width: calc(100% - ${dimensions.spacings.s} * 2);
        height: calc(100% - ${dimensions.spacings.s} * 2);
        margin: ${dimensions.spacings.s};
      }

      .gatsby-highlight {
        background-color: ${colors.light.surfaceCode};
        border-radius: ${tokens.borderRadius6};
        margin: ${dimensions.spacings.m} 0;
        padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
        overflow: auto;
      }
      .gatsby-highlight > code,
      .gatsby-highlight code[class*='language-'],
      .gatsby-highlight pre[class*='language-'],
      .gatsby-highlight .line-numbers-rows {
        font-family: ${typography.fontFamilies.code};
        font-size: ${typography.fontSizes.small};
      }
      .gatsby-highlight pre[class*='language-'] {
        background-color: ${colors.light.surfaceCode};
        margin: 0;
      }
      .gatsby-highlight pre[class*='language-'].line-numbers {
        padding: 0 ${dimensions.spacings.xl};
        overflow-x: scroll;
      }
      .gatsby-highlight .gatsby-highlight-code-line {
        background-color: ${colors.light.surfaceCodeHighlight};
        width: 100%;
        display: inline-block;
      }
    `}
  />
);
export default Globals;
