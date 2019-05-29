import React from 'react';
import { css } from '@emotion/core';
import * as colors from '../colors';

const linkStyles = css`
  color: ${colors.light.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
  :hover,
  :active {
    outline-width: 0;
  }
  :visited {
    color: ${colors.light.primarySoft};
  }
`;

const ExternalLink = props => (
  <a {...props} css={linkStyles} target="_blank" rel="noopener noreferrer" />
);
ExternalLink.displayName = 'ExternalLink';
ExternalLink.linkStyles = linkStyles;

export default ExternalLink;
