import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings } from '@commercetools-frontend/ui-kit';
import * as colors from '../../colors';

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

const Link = styled.a`
  font-size: ${props => (props.size === 's' ? '0.5rem' : '0.8rem')};
  line-height: 1.1;
  color: ${colors.light.text};
  text-decoration: none;

  :hover {
    color: ${colors.light.primarySoft};
    text-decoration: underline;
  }
  :hover,
  :active {
    outline-width: 0;
  }
`;

const ListItemGroup = props =>
  props.items.map((item, index) => (
    <Spacings.Stack scale="s" key={index}>
      <Link href={item.url}>{item.title}</Link>
      {props.children &&
        React.cloneElement(props.children, {
          items: item.items,
        })}
    </Spacings.Stack>
  ));
ListItemGroup.displayName = 'ListItemGroup';
ListItemGroup.propTypes = {
  items: itemsType.isRequired,
};
const ListItems = props => {
  if (!props.items) {
    return null;
  }
  return (
    <ul>
      {props.items.map((item, subItemIndex) => (
        <li key={subItemIndex}>
          <Link href={item.url}>{item.title}</Link>
          {props.children &&
            React.cloneElement(props.children, {
              items: item.items,
            })}
        </li>
      ))}
    </ul>
  );
};
ListItems.displayName = 'ListItems';
ListItems.propTypes = {
  items: itemsType,
  children: PropTypes.node,
};

const LayoutTOC = props => {
  return (
    <div
      css={css`
        position: relative;
        grid-row: 2;
        flex-direction: column;
        border-left: 1px solid ${colors.light.cards};
        background-color: ${colors.light.cardsSoft};

        display: none;
        grid-column: 1/3;

        @media screen and (min-width: 70em) {
          display: flex;
          width: 256px;
          grid-column: 3;
        }
      `}
    >
      <Spacings.Inset scale="l">
        <Spacings.Stack scale="l">
          {(() => {
            let mainItems = props.tableOfContents.items;
            // In case there is only one main child, we drop one depth level.
            if (mainItems && mainItems.length === 1) {
              mainItems = mainItems[0].items;
            }
            if (!mainItems || mainItems.length === 0) {
              return null;
            }

            return (
              <ListItemGroup items={mainItems}>
                <ListItems>
                  <ListItems />
                </ListItems>
              </ListItemGroup>
            );
          })()}
        </Spacings.Stack>
      </Spacings.Inset>
    </div>
  );
};
LayoutTOC.displayName = 'LayoutTOC';
LayoutTOC.propTypes = {
  tableOfContents: PropTypes.shape({
    items: itemsType,
  }),
};

export default LayoutTOC;
