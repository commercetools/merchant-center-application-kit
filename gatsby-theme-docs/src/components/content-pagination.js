import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import AngleThinLeftIcon from '../images/icons/angle-thin-left-icon.svg';
import AngleThinRightIcon from '../images/icons/angle-thin-right-icon.svg';
import { Card, Spacings, TextSmall } from '../components';
import { colors, dimensions, typography } from '../design-system';

const PaginationButtonLink = styled(Link)`
  text-align: ${props => props.align};
  text-decoration: none;
  font-size: ${typography.fontSizes.h5};
  color: ${colors.light.textPrimary};

  :hover {
    background-color: ${colors.light.surfaceQuote};
  }
`;
PaginationButtonLink.defaultProps = {
  align: 'left',
};
PaginationButtonLink.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
};

const PaginationButton = styled(Card)`
  svg {
    * {
      fill: ${colors.light.textPrimary};
    }
  }
  :hover {
    background-color: ${colors.light.surfaceQuote};
    svg {
      * {
        fill: ${colors.light.textInfo};
      }
    }
  }
`;

const PaginationLink = props => (
  <PaginationButtonLink
    to={props.linkTo}
    align={props.direction === 'left' ? 'right' : 'left'}
  >
    <PaginationButton>
      <Spacings.Inline
        scale="m"
        alignItems="center"
        justifyContent="space-between"
      >
        {props.direction === 'left' ? (
          <>
            <AngleThinLeftIcon />
            <Spacings.Stack scale="s">
              <TextSmall>{'Previous:'}</TextSmall>
              <div>{props.label}</div>
            </Spacings.Stack>
          </>
        ) : (
          <>
            <Spacings.Stack scale="s">
              <TextSmall>{'Next:'}</TextSmall>
              <div>{props.label}</div>
            </Spacings.Stack>
            <AngleThinRightIcon />
          </>
        )}
      </Spacings.Inline>
    </PaginationButton>
  </PaginationButtonLink>
);
PaginationLink.propTypes = {
  linkTo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

const Pagination = props => {
  const data = useStaticQuery(graphql`
    query GetNavbarLinks {
      allNavigationYaml {
        nodes {
          chapterTitle
          pages {
            title
            path
            beta
          }
        }
      }
    }
  `);
  const [, chapterPath] = props.slug.split('/');
  const chapterSlug = `/${chapterPath}`;
  const chapterPageLinks = data.allNavigationYaml.nodes.reduce(
    (links, node) => {
      if (node.pages) {
        return [
          ...links,
          ...node.pages.filter(page => page.path.startsWith(chapterSlug)),
        ];
      }
      return links;
    },
    []
  );
  const currentPageLinkIndex = chapterPageLinks.findIndex(page =>
    props.slug.startsWith(page.path)
  );
  const hasPagination = currentPageLinkIndex > -1;
  const previousPage = chapterPageLinks[currentPageLinkIndex - 1];
  const nextPage = chapterPageLinks[currentPageLinkIndex + 1];

  return (
    <div
      css={css`
        display: grid;
        grid-gap: ${dimensions.spacings.l};
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(
          auto-fill,
          minmax(
            calc(
              ${dimensions.widths.pageContent} / 2 - ${dimensions.spacings.xl} *
                2
            ),
            1fr
          )
        );

        @media screen and (${dimensions.viewports.tablet}) {
          grid-template-columns: 1fr 1fr;
        }
      `}
    >
      {hasPagination && previousPage ? (
        <PaginationLink
          linkTo={previousPage.path}
          label={previousPage.title}
          direction="left"
        />
      ) : (
        <span />
      )}
      {hasPagination && nextPage ? (
        <PaginationLink
          linkTo={nextPage.path}
          label={nextPage.title}
          direction="right"
        />
      ) : (
        <span />
      )}
    </div>
  );
};
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  slug: PropTypes.string,
};

export default Pagination;
