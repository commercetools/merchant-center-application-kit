import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  Text,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import * as colors from '../../colors';

const TextLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
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
          navbarLinks {
            label
            groupKey
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
  const groupKey = props.permalink.replace(/^\/(.*)\/(.*)$/, '$1');
  const links = flattenLinks(
    data.site.siteMetadata.navbarLinks.filter(
      link => link.groupKey === groupKey
    )
  );
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
        display: block;
      `}
    >
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
              <Text.Detail>Previous:</Text.Detail>
              {previous.label}
            </Spacings.Stack>
          </TextLink>
        )}
        <div css={{ margin: 'auto' }} />
        {hasPagination && next && (
          <TextLink to={next.linkTo}>
            <Spacings.Stack scale="s">
              <Text.Detail>Next:</Text.Detail>
              {next.label}
            </Spacings.Stack>
          </TextLink>
        )}
      </div>
    </div>
  );
};
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  permalink: PropTypes.string,
};

export default Pagination;
