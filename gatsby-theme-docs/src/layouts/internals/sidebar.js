import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link, withPrefix } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography, tokens } from '../../design-system';

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
  width: 100%;
  white-space: nowrap;
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
        display: flex;
        flex-direction: row;
        align-items: flex-end;

        :hover {
          color: ${colors.light.linkNavigation} !important;
        }

        > * + * {
          margin: 0 0 0 ${dimensions.spacings.s};
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
              node.pages.map(pageLink => (
                <SidebarLink
                  to={pageLink.path}
                  key={pageLink.path}
                  onClick={props.onLinkClick}
                >
                  <SidebarLinkSubtitle>{pageLink.title}</SidebarLinkSubtitle>
                  {pageLink.beta && (
                    <span
                      css={css`
                        border: 1px solid ${colors.light.borderInfo};
                        border-radius: ${tokens.borderRadius4};
                        color: ${colors.light.textInfo};
                        font-size: ${typography.fontSizes.ultraSmall};
                        padding: 1px ${dimensions.spacings.xs};
                      `}
                    >
                      {'BETA'}
                    </span>
                  )}
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
