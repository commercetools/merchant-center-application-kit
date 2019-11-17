import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  Markdown,
  designSystem,
} from '@commercetools-docs/gatsby-theme-docs';

const Container = styled.div`
  background-color: ${designSystem.colors.light.surfacePrimary};
  border: 1px solid ${designSystem.colors.light.borderPrimary};
  border-radius: ${designSystem.tokens.borderRadius6};
  padding: ${designSystem.dimensions.spacings.l};
`;
const GridContainer = styled.div`
  display: grid;
  grid-gap: ${designSystem.dimensions.spacings.l};
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(
    auto-fill,
    ${designSystem.dimensions.widths.pageNavigation}
  );
`;
const LinksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  > * + * {
    margin: ${designSystem.dimensions.spacings.xs} 0 0;
  }
`;
const SecondaryExternalLink = props => (
  <Markdown.Link
    {...props}
    css={css`
      font-size: ${designSystem.typography.fontSizes.small};
      text-decoration: none;
      svg {
        width: ${designSystem.dimensions.spacings.m};
        height: ${designSystem.dimensions.spacings.m};
        * {
          fill: ${designSystem.colors.light.link};
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
