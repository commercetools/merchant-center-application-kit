import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings, customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../../colors';

const TextLink = styled(Link)`
  text-decoration: none;
  color: ${colors.light.text};

  :hover {
    opacity: 0.8;
  }
`;

const flattenLinks = links => {
  return links.reduce((flat, link) => {
    if (link.subgroup) {
      return [...flat, ...flattenLinks(link.subgroup)];
    }
    if (link.linkTo && link.label) {
      return [...flat, { linkTo: link.linkTo, label: link.label }];
    }
    return flat;
  }, []);
};

const Pagination = () => {
  const data = useStaticQuery(graphql`
    query GetNavbarLinks {
      site {
        siteMetadata {
          navbarLinks {
            label
            subgroup {
              label
              linkTo
              subgroup {
                label
                linkTo
              }
            }
          }
        }
      }
    }
  `);

  const links = flattenLinks(data.site.siteMetadata.navbarLinks);
  const index = links.findIndex(
    link =>
      link.linkTo ===
      (typeof window !== 'undefined' &&
        window.location.pathname.replace(/\/$/, ''))
  );
  const hasPagination = index > -1;
  const previous = links[index - 1];
  const next = links[index + 1];

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        padding: ${customProperties.spacingM};
        margin-top: ${customProperties.spacingM};
        border-top: 2px solid ${colors.light.cards};
        background-color: ${colors.light.cardsSoft};
      `}
    >
      {hasPagination && previous && (
        <TextLink to={previous.linkTo}>
          <Spacings.Stack scale="s">
            <small>Previous:</small>
            {previous.label}
          </Spacings.Stack>
        </TextLink>
      )}
      <div css={{ margin: 'auto' }} />
      {hasPagination && next && (
        <TextLink to={next.linkTo}>
          <Spacings.Stack scale="s">
            <small>Next:</small>
            {next.label}
          </Spacings.Stack>
        </TextLink>
      )}
    </div>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
