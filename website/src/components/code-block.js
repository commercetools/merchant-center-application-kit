import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';

// TODO: improve colors
const theme = {
  plain: {
    backgroundColor: colors.light.surface,
    color: colors.light.text,
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: 'rgb(173, 197, 214)',
      },
    },
    {
      types: ['prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: colors.light.text,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: 'rgb(87, 156, 135)',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: 'rgb(254, 127, 45)',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: colors.light.cards,
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(254, 127, 45)',
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: colors.light.primary,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: colors.light.primary,
      },
    },
  ],
};

// Ref: https://mdxjs.com/guides/syntax-highlighting#build-a-codeblock-component
const CodeBlock = props => {
  const language = props.className
    ? props.className.replace(/language-/, '')
    : undefined;

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: customProperties.spacingM,
            border: `1px solid ${colors.light.cards}`,
            overflowX: 'auto',
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
CodeBlock.displayName = 'CodeBlock';
CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CodeBlock;
