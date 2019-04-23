import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import Layout from './layout';
import SEO from './seo';

const components = {};

const MarkdownLayout = props => (
  <Layout>
    <MDXProvider components={components}>
      <div
        css={css`
          padding: 16px;
        `}
      >
        <SEO title={props.frontmatter.title} />
        {props.children}
      </div>
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
