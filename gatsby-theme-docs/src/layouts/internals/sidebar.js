import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography } from '../../design-system';

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
                  partiallyActive={true}
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
};

export default Sidebar;
