import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';

// Ref: https://mdxjs.com/guides/syntax-highlighting#build-a-codeblock-component
const CodeBlock = props => {
  const language = props.className.replace(/language-/, '');

  return (
    <Highlight {...defaultProps} code={props.children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
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
