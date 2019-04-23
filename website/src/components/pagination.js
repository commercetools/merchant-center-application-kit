import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import { Spacings } from '@commercetools-frontend/ui-kit';

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
    link => link.linkTo === window.location.pathname.replace(/\/$/, '')
  );
  const hasPagination = index > -1;
  const previous = links[index - 1];
  const next = links[index + 1];

  return (
    <div
      css={css`
                display: 'flex',
                justify-content: 'space-between',
              `}
    >
      {hasPagination && previous && (
        <Link to={previous.linkTo}>
          <Spacings.Stack scale="s">
            <small>Previous:</small>
            {previous.label}
          </Spacings.Stack>
        </Link>
      )}
      <div css={{ margin: 'auto' }} />
      {hasPagination && next && (
        <Link to={next.linkTo}>
          <Spacings.Stack scale="s">
            <small>Next:</small>
            {next.label}
          </Spacings.Stack>
        </Link>
      )}
    </div>
  );
};
Pagination.displayName = 'Pagination';

export default Pagination;
