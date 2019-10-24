import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';
import IntlController from './intl-controller';
import KnobsController from './knobs-controller';

const PreviewContainer = styled.div`
  position: relative;
  width: calc(100% - 1px - 1px);
  overflow: hidden;
  height: ${props => props.height};
  border: 1px solid ${customProperties.colorNeutral60};
  border-radius: ${customProperties.borderRadius4};
`;
const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > * + * {
    margin: ${customProperties.spacingM} 0 0 0;
  }

  @media screen and (min-width: 40em) {
    flex-direction: row;

    > * + * {
      margin: 0 0 0 ${customProperties.spacingM};
    }
  }
`;
const ColumnLeft = styled.div`
  flex: 2;
  height: calc(100vh - 2px);
`;
const ColumnRight = styled.div`
  flex: 1;
  height: calc(100vh - 2px);
  overflow: auto;
`;

const ExampleWrapper = props => {
  const queryParams = new URLSearchParams(
    typeof window !== 'undefined' && window.location.search
  );
  const isFullscreen = queryParams.get('mode') === 'fullscreen';
  return (
    <IntlController>
      {intlProps => (
        <KnobsController knobs={props.knobs} {...intlProps}>
          {({ form, values }) => {
            if (isFullscreen) {
              return (
                <ColumnsContainer>
                  <ColumnLeft>
                    <PreviewContainer height="100%">
                      {props.children({ values, isFullscreen })}
                    </PreviewContainer>
                  </ColumnLeft>
                  <ColumnRight>{form}</ColumnRight>
                </ColumnsContainer>
              );
            }
            return props.children({ values, isFullscreen });
          }}
        </KnobsController>
      )}
    </IntlController>
  );
};
ExampleWrapper.displayName = 'ExampleWrapper';
ExampleWrapper.propTypes = {
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
