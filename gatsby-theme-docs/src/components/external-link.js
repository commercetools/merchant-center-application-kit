import React from 'react';
import { css } from '@emotion/core';
import { colors } from '../design-system';

const linkStyles = css`
  &,
  > code {
    color: ${colors.light.link};
    :active,
    :focus,
    :hover {
      color: ${colors.light.linkHover};
    }
  }
`;

const ExternalLink = props => (
  <a {...props} css={linkStyles} target="_blank" rel="noopener noreferrer" />
);
ExternalLink.displayName = 'ExternalLink';
ExternalLink.linkStyles = linkStyles;

export default ExternalLink;
