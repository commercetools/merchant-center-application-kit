import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '../../components';
import { colors, dimensions, typography } from '../../design-system';

const itemType = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const itemsType = PropTypes.arrayOf(
  PropTypes.shape({
    ...itemType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  })
);

const isActiveLink = url =>
  url === (typeof window !== 'undefined' && window.location.hash);

const Link = styled.a`
  font-size: ${props => {
    switch (props.level) {
      case '1':
        return typography.fontSizes.body;
      default:
        return typography.fontSizes.small;
    }
  }};
  color: ${props => {
    switch (props.level) {
      case '1':
        return colors.light.textPrimary;
      default:
        return colors.light.textSecondary;
    }
  }};
  text-decoration: none;
  border-left: 1px solid transparent;
  padding: ${props => {
    switch (props.level) {
      case '1':
        return `0 ${dimensions.spacings.m}`;
      default:
        return `0`;
    }
  }};

  :hover {
    color: ${colors.light.primary};
    text-decoration: underline;
  }
  :hover,
  :active {
    outline-width: 0;
  }

  ${props =>
    isActiveLink(props.href)
      ? css`
          border-left: 1px solid ${colors.light.primary};
          color: ${colors.light.primary};
        `
      : ''}
`;
const ListItemLevel = styled.ul`
  margin: 0;
  padding: 0 ${dimensions.spacings.m};
  list-style: none;

  > li {
    padding: ${props => {
      switch (props.level) {
        case '3':
          return `0 0 0 ${dimensions.spacings.l}`;
        default:
          return `0`;
      }
    }};
  }

  /* Nested ul should get no padding */
  ul {
    padding: 0;
  }
`;

const ListItemGroup = props => (
  <Spacings.Stack scale="s">
    {props.items.map((item, index) => (
      <Spacings.Stack scale="s" key={index}>
        <Link href={item.url} level={props.level}>
          {item.title}
        </Link>
        {props.children &&
          React.cloneElement(props.children, {
            items: item.items,
          })}
      </Spacings.Stack>
    ))}
  </Spacings.Stack>
);
ListItemGroup.displayName = 'ListItemGroup';
ListItemGroup.propTypes = {
  level: PropTypes.oneOf(['1']).isRequired,
  items: itemsType.isRequired,
  children: PropTypes.node,
};
const ListItems = props => {
  if (!props.items) {
    return null;
  }
  return (
    <ListItemLevel level={props.level}>
      {props.items.map((item, subItemIndex) => (
        <li key={subItemIndex}>
          <Link href={item.url} level={props.level}>
            {item.title}
          </Link>
          {props.children &&
            React.cloneElement(props.children, {
              items: item.items,
            })}
        </li>
      ))}
    </ListItemLevel>
  );
};
ListItems.displayName = 'ListItems';
ListItems.propTypes = {
  level: PropTypes.oneOf(['2', '3']).isRequired,
  items: itemsType,
  children: PropTypes.node,
};

const PageNavigation = props => (
  <ListItemGroup level="1" items={props.tableOfContents.items}>
    <ListItems level="2">
      <ListItems level="3" />
    </ListItems>
  </ListItemGroup>
);
PageNavigation.displayName = 'PageNavigation';
PageNavigation.propTypes = {
  tableOfContents: PropTypes.shape({
    items: itemsType,
  }),
};

export default PageNavigation;
