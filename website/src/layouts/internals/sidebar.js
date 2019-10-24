import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '@commercetools-frontend/ui-kit';
import { colors, dimensions, typography } from '../../design-system';

const SidebarLinkTitle = styled.div`
  font-size: ${typography.fontSizes.body};
`;
const SidebarLinkSubtitle = styled.div`
  font-size: ${typography.fontSizes.small};
`;
const SidebarLinkItem = styled.div`
  padding: 0 ${dimensions.spacings.m};
`;

const SidebarLink = props => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <Link
        css={css`
          border-left: ${dimensions.spacings.xs} solid
            ${colors.light.surfaceSecondary1};
          padding-left: calc(
            ${dimensions.spacings.m} - ${dimensions.spacings.xs}
          );
          text-decoration: none;
          color: ${colors.light.textSecondary};

          :hover {
            color: ${colors.light.primary} !important;
          }
        `}
        activeClassName={makeClassName`
            border-left: ${dimensions.spacings.xs} solid ${colors.light.primary} !important;
            color: ${colors.light.primary} !important;
          `}
        {...props}
      />
    )}
  </ClassNames>
);
SidebarLink.displayName = 'SidebarLink';

const Sidebar = props => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
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
  return (
    <div
      css={css`
        margin-right: ${dimensions.spacings.m};

        > * + * {
          padding: ${dimensions.spacings.l} 0;
          border-top: 1px solid ${colors.light.borderPrimary};
        }
      `}
    >
      <div
        css={css`
          color: ${colors.light.primary};
          padding: ${dimensions.spacings.l} ${dimensions.spacings.m};
          font-size: ${typography.fontSizes.h4};
        `}
      >
        {'AppKit'}
      </div>
      {data.site.siteMetadata.sidebarLinks.map((link, index) => (
        <Spacings.Stack scale="s" key={index}>
          <SidebarLinkItem>
            <SidebarLinkTitle>{link.label}</SidebarLinkTitle>
          </SidebarLinkItem>
          <Spacings.Stack scale="s">
            {link.subgroup.map(subLink => (
              <SidebarLink
                to={subLink.linkTo}
                key={subLink.linkTo}
                onClick={props.onLinkClick}
                partiallyActive={true}
              >
                <SidebarLinkSubtitle>{subLink.label}</SidebarLinkSubtitle>
              </SidebarLink>
            ))}
          </Spacings.Stack>
        </Spacings.Stack>
      ))}
    </div>
  );
};
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default Sidebar;
