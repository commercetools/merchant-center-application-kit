import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Spacings from '@commercetools-docs/gatsby-theme-docs/src/components/spacings';
import * as Markdown from '@commercetools-docs/gatsby-theme-docs/src/components/markdown';
import {
  colors,
  dimensions,
  typography,
  tokens,
} from '@commercetools-docs/gatsby-theme-docs/src/design-system';

const Container = styled.div`
  background-color: ${colors.light.surfacePrimary};
  border: 1px solid ${colors.light.borderPrimary};
  border-radius: ${tokens.borderRadius6};
  padding: ${dimensions.spacings.l};
`;
const GridContainer = styled.div`
  display: grid;
  grid-gap: ${dimensions.spacings.l};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(auto-fill, ${dimensions.widths.pageNavigation});
`;
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
  <Container>
    <GridContainer>
      {props.linksData.map(linkData => (
        <div key={linkData.title}>
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
        </div>
      ))}
    </GridContainer>
  </Container>
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
