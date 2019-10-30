import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link, withPrefix } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography } from '../../design-system';

const trimTrailingSlash = url => url.replace(/(\/?)$/, '');

const SidebarWebsiteTitle = styled.div`
  background-color: ${colors.light.surfaceSecondary2};
  color: ${colors.light.primary};
  padding: ${dimensions.spacings.l} ${dimensions.spacings.m};
  font-size: ${typography.fontSizes.h4};
`;
const SidebarLinkTitle = styled.div`
  font-size: ${typography.fontSizes.body};
  text-overflow: ellipsis;
  overflow-x: hidden;
`;
const SidebarLinkSubtitle = styled.div`
  font-size: ${typography.fontSizes.small};
  text-overflow: ellipsis;
  overflow-x: hidden;
`;
const SidebarLinkItem = styled.div`
  padding: 0 ${dimensions.spacings.m};
`;

const SidebarLink = props => (
  <ClassNames>
    {({ css: makeClassName }) => {
      const linkClassName = makeClassName`
        border-left: ${dimensions.spacings.xs} solid
          ${colors.light.surfaceSecondary1};
        padding-left: calc(
          ${dimensions.spacings.m} - ${dimensions.spacings.xs}
        );
        text-decoration: none;
        color: ${colors.light.textSecondary};

        :hover {
          color: ${colors.light.linkNavigation} !important;
        }
      `;
      const activeClassName = makeClassName`
        border-left: ${dimensions.spacings.xs} solid ${colors.light.linkNavigation} !important;
        color: ${colors.light.linkNavigation} !important;
      `;
      return (
        <Link
          {...props}
          getProps={({ href, location }) => {
            // Manually check that the link is the active one, even with trailing slashes.
            // The gatsby link is by default configured to match the exact path, therefore we
            // need to check this manually.
            const linkPath = trimTrailingSlash(withPrefix(href));
            const locationPath = trimTrailingSlash(location.pathname);
            if (linkPath === locationPath) {
              return { className: [linkClassName, activeClassName].join(' ') };
            }
            return { className: linkClassName };
          }}
        />
      );
    }}
  </ClassNames>
);
SidebarLink.displayName = 'SidebarLink';

const Sidebar = props => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
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
  return (
    <div
      css={css`
        > * + * {
          border-top: 1px solid ${colors.light.borderPrimary};
          margin-right: ${dimensions.spacings.m};
          padding: ${dimensions.spacings.l} 0;
        }
      `}
    >
      <SidebarWebsiteTitle>
        <Link
          to="/"
          css={css`
            text-decoration: none;
            color: ${colors.light.primary};
            :hover {
              text-decoration: underline;
            }
          `}
        >
          {props.siteTitle}
        </Link>
      </SidebarWebsiteTitle>
      {data.allNavigationYaml.nodes.map((node, index) => (
        <Spacings.Stack scale="s" key={index}>
          <SidebarLinkItem>
            <SidebarLinkTitle>{node.chapterTitle}</SidebarLinkTitle>
          </SidebarLinkItem>
          <Spacings.Stack scale="s">
            {node.pages &&
              node.pages.map(subLink => (
                <SidebarLink
                  to={subLink.path}
                  key={subLink.path}
                  onClick={props.onLinkClick}
                >
                  <SidebarLinkSubtitle>{subLink.title}</SidebarLinkSubtitle>
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
  slug: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
};

export default Sidebar;
