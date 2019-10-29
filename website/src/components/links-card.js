import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Grid } from '@commercetools-frontend/ui-kit';
import Spacings from '@commercetools-docs/gatsby-theme-docs/src/components/spacings';
import * as Markdown from '@commercetools-docs/gatsby-theme-docs/src/components/markdown';
import {
  colors,
  dimensions,
  typography,
  tokens,
} from '@commercetools-docs/gatsby-theme-docs/src/design-system';

const LinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  > * + * {
    margin: ${dimensions.spacings.xs} 0 0;
  }
`;
const SecondaryExternalLink = props => (
  <Markdown.Link
    {...props}
    css={css`
      font-size: ${typography.fontSizes.small};
      text-decoration: none;
      svg {
        width: ${dimensions.spacings.m};
        height: ${dimensions.spacings.m};
        * {
          fill: ${colors.light.link};
        }
      }
    `}
  />
);

const LinksCard = props => (
  <div
    css={css`
      background-color: ${colors.light.surfacePrimary};
      border: 1px solid ${colors.light.borderPrimary};
      border-radius: ${tokens.borderRadius6};
      padding: ${dimensions.spacings.l};
    `}
  >
    <Grid
      gridGap={dimensions.spacings.l}
      gridAutoColumns="1fr"
      gridTemplateColumns={`repeat(auto-fill, ${dimensions.widths.pageNavigation})`}
    >
      {props.linksData.map(linkData => (
        <Grid.Item key={linkData.title}>
          <Spacings.Stack scale="s">
            <div>{linkData.title}</div>
            <LinksList>
              {linkData.links.map(link => (
                <li key={link.to}>
                  <SecondaryExternalLink href={link.to}>
                    {link.label}
                  </SecondaryExternalLink>
                </li>
              ))}
            </LinksList>
          </Spacings.Stack>
        </Grid.Item>
      ))}
    </Grid>
  </div>
);
LinksCard.propTypes = {
  linksData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired
  ).isRequired,
};

export default LinksCard;
