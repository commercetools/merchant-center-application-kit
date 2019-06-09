import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import CodeEditor from './code-editor';

const theme = {
  plain: {
    backgroundColor: colors.light.cards,
    color: colors.light.text,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#999988',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: colors.light.primary,
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: colors.light.borders,
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: 'rgb(107, 80, 255)',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: 'rgb(236, 160, 48)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: 'rgb(236, 160, 48)',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: 'rgb(107, 80, 255)',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: 'rgb(4, 138, 191)',
      },
    },
  ],
};

// Ref: https://mdxjs.com/guides/syntax-highlighting#build-a-codeblock-component
const CodeBlock = props => {
  const language = props.className
    ? props.className.replace(/language-/, '')
    : undefined;

  if (props.live === 'true') {
    return (
      <CodeEditor code={props.children} theme={theme} height={props.height} />
    );
  }

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
            // seem to be an open bug -> https://github.com/stylelint/stylelint/issues/4020
            /* stylelint-disable-next-line property-no-unknown */
            overflowX: 'auto',
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                if (tokens.length === i + 1 && token.empty) {
                  return null;
                }
                const tokenProps = getTokenProps({ token, key });
                return <span key={key} {...tokenProps} />;
              })}
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
  live: PropTypes.string,
  height: PropTypes.string,
};

export default CodeBlock;
