import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { css } from '@emotion/core';
import { Formik } from 'formik';
import * as intl from 'react-intl';
import * as uikit from '@commercetools-frontend/ui-kit';
import * as appkit from '@commercetools-frontend/application-components';
import ExampleWrapper from './example-wrapper';

const librariesInScope = {
  css,
  React,
  ReactDOM,
  Formik,
  ExampleWrapper,
  ...intl,
  ...uikit,
  ...appkit,
};

const CodeEditor = props => (
  <LiveProvider
    noInline={props.noInline}
    mountStylesheet={false}
    scope={{ ...librariesInScope, ...props.scope }}
    code={props.code}
    theme={props.theme}
  >
    <LivePreview />
    <div
      css={css`
        max-height: 400px;
        overflow: auto;
      `}
    >
      <LiveEditor ignoreTabKey={true} />
    </div>
    <LiveError />
  </LiveProvider>
);
CodeEditor.displayName = 'CodeEditor';
CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object,
  noInline: PropTypes.bool,
  customStyles: PropTypes.object,
  theme: PropTypes.object,
};
CodeEditor.defaultProps = {
  scope: {},
  noInline: true,
  customStyles: {},
};
export default CodeEditor;
