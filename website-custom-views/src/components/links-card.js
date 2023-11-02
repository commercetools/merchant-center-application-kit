import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from '@commercetools-docs/gatsby-theme-docs';
import { designSystem } from '@commercetools-docs/ui-kit';
import Card from '@commercetools-uikit/card';
import SpacingsStack from '@commercetools-uikit/spacings-stack';

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
const SecondaryExternalLink = (props) => (
  <Link
    {...props}
    noUnderline={true}
    css={css`
      font-size: ${designSystem.typography.fontSizes.small};
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

const LinksCard = (props) => (
  <Card>
    <GridContainer>
      {props.linksData.map((linkData) => (
        <div key={linkData.title}>
          <SpacingsStack scale="s">
            <div>{linkData.title}</div>
            <LinksList>
              {linkData.links.map((link) => (
                <li key={link.to}>
                  <SecondaryExternalLink href={link.to}>
                    {link.label}
                  </SecondaryExternalLink>
                </li>
              ))}
            </LinksList>
          </SpacingsStack>
        </div>
      ))}
    </GridContainer>
  </Card>
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
