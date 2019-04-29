import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import Layout from './layout';
import SEO from './seo';
import CodeBlock from './code-block';

const TypographyPage = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  line-height: 1.45;
  padding: ${customProperties.spacingL};
  max-width: 740px;
`;
const headerStyles = () => css`
  line-height: 1.15;
  margin: 2.75rem 0 1rem;
`;

// Typography sizes have been calculated from https://type-scale.com
// Ref: https://medium.com/sketch-app-sources/exploring-responsive-type-scales-cf1da541be54
const Paragraph = styled.p`
  margin-bottom: 1.25em;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: 4.209em;
  margin-top: 0;
`;
const H2 = styled.h2`
  ${headerStyles};
  font-size: 3.157em;
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: 2.369em;
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: 1.777em;
`;
const H5 = styled.h5`
  ${headerStyles};
  font-size: 1.333em;
`;
const H6 = styled.h6`
  ${headerStyles};
`;
const ThematicBreak = styled.hr`
  height: 1px;
  border: 0;
  background-image: linear-gradient(
    to right,
    ${colors.light.bordersSoft},
    ${colors.light.borders},
    ${colors.light.bordersSoft}
  );
`;
const Blockquote = styled.blockquote`
  border-left: 0.25em solid ${colors.light.cards};
  color: ${colors.light.textSoft};
  background-color: ${colors.light.cardsSoft};
  font-style: italic;
  padding: 0.25rem 1rem;
  margin: 0;
  margin-bottom: ${customProperties.spacingM};

  > :first-of-type {
    margin-top: 0;
  }
  > :last-of-type {
    margin-bottom: 0;
  }
`;
const Ul = styled.ul`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Ol = styled.ol`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Li = styled.li``;
const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  tbody {
    border-top: 4px solid ${colors.light.cards};
  }

  @media screen and (max-width: 40em) {
    display: block;
    tbody {
      display: block;
    }
    thead {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    ${props => {
      const tableHeaders = React.Children.toArray(props.children).find(
        elem => elem.props.mdxType === 'thead'
      );
      const rowHeaders = tableHeaders.props.children;
      return React.Children.toArray(rowHeaders.props.children).reduce(
        (styles, elem, index) => `
        ${styles}
        td:nth-of-type(${index + 1}):before { content: "${
          elem.props.children
        }"; }
      `,
        ''
      );
    }}
  }
`;
const TableRow = styled.tr`
  > * + * {
    border-left: 1px solid ${colors.light.cards};
  }

  @media screen and (max-width: 40em) {
    display: block;
    border: 1px solid ${colors.light.cards};
  }
`;
const TableCell = styled.td`
  border-bottom: 2px solid ${colors.light.cards};
  padding: ${customProperties.spacingS};

  @media screen and (max-width: 40em) {
    display: block;
    border: none;
    border-bottom: 1px solid ${colors.light.cards};

    :before {
      display: flex;
      font-weight: 700;
    }
  }
`;
const TableHeader = styled.th`
  padding: ${customProperties.spacingS};

  @media screen and (max-width: 40em) {
    display: block;
  }
`;
const Pre = props => props.children;
const Code = CodeBlock;
const InlineCode = styled.code`
  border: 1px solid ${colors.light.cards};
  border-bottom: 3px solid ${colors.light.cards};
  color: ${colors.light.primary};
  padding: 1px 4px;
  font-size: 1rem;
`;
const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled(ThematicBreak)``;
// The external icon style has been taken from https://codepen.io/simevidas/pen/MKdmeV
// The base64 icon has been generated from https://icons8.com/icons/set/external-link
const Link = styled.a`
  color: ${colors.light.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
  :hover,
  :active {
    outline-width: 0;
  }
  :visited {
    color: ${colors.light.primarySoft};
  }

  &[href^='http']::after {
    content: '(external link)';
    display: inline-block;
    width: 0.7em;
    height: 0.7em;
    text-indent: 0.7em;
    white-space: nowrap;
    overflow: hidden;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABJwAAAScBjbzwzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADgSURBVDiNxVJBTsMwEJx1l09wAztcyAtaiPqA3tsPgPgBfIErv0DiE1WfYCeHyqdWST9hZXsiQsYJlkBiTqvx7OystcB/g3JEjo3EXBk8AYDKMSiDpzJ4EsgCkNPXN/4s7KxYKcibEK6i/tcy+BfLek7Ah4La9JDt95gX5mDZLFMJLOu5Y901XFRjK6VJAI71wrHuar65n9SmyLjZsXlODUka5E7mmBhA6oGE1rdhvxvV/LRCjibrDqYwGBDQ1nx9NyZsuKhAOMb88Ae90BORendsLlMGAmlV3z/+NvHf4wx/vFAagc71gAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    margin-left: 0.1em;
  }
`;
const Img = styled.img`
  background-color: ${colors.light.surface};
  box-sizing: content-box;
  max-width: 100%;
`;

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  thematicBreak: ThematicBreak,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  // eslint-disable-next-line react/display-name
  table: props => (
    <div
      css={css`
        overflow: auto;
      `}
    >
      <Table {...props} />
    </div>
  ),
  tr: TableRow,
  td: TableCell,
  th: TableHeader,
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,
  em: Em,
  strong: Strong,
  delete: Delete,
  hr: Hr,
  a: Link,
  img: Img,
};

const MarkdownLayout = props => (
  <Layout>
    <MDXProvider components={components}>
      <TypographyPage>
        <SEO title={props.frontmatter.title} />
        {/* This wrapper div is important to ensure the vertical space */}
        <div>{props.children}</div>
      </TypographyPage>
    </MDXProvider>
  </Layout>
);
MarkdownLayout.displayName = 'MarkdownLayout';
MarkdownLayout.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default MarkdownLayout;
