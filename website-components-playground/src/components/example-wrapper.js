import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';
import IntlController from './intl-controller';
import KnobsController from './knobs-controller';

const PreviewContainer = styled.div`
  position: relative;
  width: calc(100% - 1px - 1px);
  overflow: hidden;
  height: 100%;
  border: ${props =>
    props.isFullScreen
      ? `1px solid ${customProperties.colorNeutral60}`
      : 'none'};
  border-radius: ${customProperties.borderRadius4};
`;
const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > * + * {
    margin: ${customProperties.spacingM} 0 0 0;
  }

  @media screen and (min-width: 64.154rem) {
    flex-direction: row;

    > * + * {
      margin: 0 0 0 ${customProperties.spacingM};
    }
  }
`;
const ColumnLeft = styled.div`
  flex: ${props => (props.isFullScreen ? '2' : '3')};
  height: calc(100vh - 2px);
`;
const ColumnRight = styled.div`
  ${props => {
    if (props.isFullScreen) {
      return css`
        flex: 1;
        height: calc(100vh - 2px);
        overflow: auto;
      `;
    }
    return css`
      display: none;
    `;
  }}
`;

const ExampleWrapper = props => (
  <IntlController>
    {intlProps => (
      <KnobsController knobs={props.knobs} {...intlProps}>
        {({ form, values }) => (
          <ColumnsContainer>
            <ColumnLeft isFullScreen={props.isFullScreen}>
              <PreviewContainer isFullScreen={props.isFullScreen}>
                {props.children({ values })}
              </PreviewContainer>
            </ColumnLeft>
            <ColumnRight isFullScreen={props.isFullScreen}>{form}</ColumnRight>
          </ColumnsContainer>
        )}
      </KnobsController>
    )}
  </IntlController>
);
ExampleWrapper.displayName = 'ExampleWrapper';
ExampleWrapper.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  knobs: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.oneOf(['text', 'text-multi', 'select']).isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      initialValue: PropTypes.any.isRequired,
      valueOptions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired
  ).isRequired,
  children: PropTypes.func.isRequired,
};
ExampleWrapper.defaultProps = {
  containerHeight: '400px',
};

export default ExampleWrapper;
