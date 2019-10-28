import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link, withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  Card,
  AngleThinLeftIcon,
  AngleThinRightIcon,
} from '@commercetools-frontend/ui-kit';
import { TextSmall } from '../components';
import { colors, dimensions, typography } from '../design-system';

const PaginationButtonLink = styled(Link)`
  text-align: ${props => props.align};
  text-decoration: none;
  font-size: ${typography.fontSizes.h5};
  color: ${colors.light.textPrimary};

  :hover {
    opacity: 0.8;
  }
`;
PaginationButtonLink.defaultProps = {
  align: 'left',
};
PaginationButtonLink.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
};

const PaginationButton = styled(Card)`
  :hover {
    background-color: ${colors.light.surfacePrimary};
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

const flattenLinks = links => {
  return links.reduce((flat, link) => {
    if (link.subgroup) {
      return [...flat, ...flattenLinks(link.subgroup)];
    }
    if (link.label && link.linkTo) {
      return [...flat, { linkTo: link.linkTo, label: link.label }];
    }
    return flat;
  }, []);
};

const Pagination = props => {
  const data = useStaticQuery(graphql`
    query GetNavbarLinks {
      site {
        siteMetadata {
          sidebarLinks {
            label
            groupKey
            subgroup {
              label
              linkTo
            }
          }
        }
      }
    }
  `);
  const groupKey = props.permalink.replace(/^\/(.*)\/(.*)$/, '$1');
  const links = flattenLinks(
    data.site.siteMetadata.sidebarLinks.filter(
      link => link.groupKey === groupKey
    )
  );
  const index = links.findIndex(
    link =>
      withPrefix(link.linkTo) ===
      (typeof window !== 'undefined' &&
        window.location.pathname.replace(/\/$/, ''))
  );
  const hasPagination = index > -1;
  const previous = links[index - 1];
  const next = links[index + 1];

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
      {hasPagination && previous ? (
        <PaginationLink
          linkTo={previous.linkTo}
          label={previous.label}
          direction="left"
        />
      ) : (
        <span />
      )}
      {hasPagination && next ? (
        <PaginationLink
          linkTo={next.linkTo}
          label={next.label}
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
  permalink: PropTypes.string,
};

export default Pagination;
