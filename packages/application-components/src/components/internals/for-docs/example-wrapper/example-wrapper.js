import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { ThemeProvider } from 'emotion-theming';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  TextField,
  MultilineTextField,
  SelectField,
  customProperties,
  Tooltip,
  IconButton,
  CodeViewIcon,
} from '@commercetools-frontend/ui-kit';
import { InfoDialog } from '@commercetools-frontend/application-components';
import IntlController from '../intl-controller';

const TooltipWrapperComponent = styled.div`
  /* default z-index for dialogs is 1000 */
  z-index: 1001;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  border: 1px solid ${customProperties.colorNeutral95};
`;
const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  > * + * {
    margin: 0 0 0 ${customProperties.spacingM};
  }
`;
const ColumnLeft = styled.div`
  flex: 2;
  height: 100%;
`;
const ColumnRight = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
`;

const KnobsController = props => {
  const initialValues = props.knobs.reduce(
    (mapped, knobConfig) => ({
      ...mapped,
      [knobConfig.name]: knobConfig.initialValue,
    }),
    {}
  );
  return (
    <Formik
      initialValues={initialValues}
      render={formikProps => {
        const form = (
          <Spacings.Stack size="m">
            <SelectField
              name="locale"
              title="Locale"
              options={props.availableLocaleOptions}
              value={props.locale}
              onChange={event => {
                props.setLocale(event.target.value);
              }}
            />
            {props.knobs.map(knobConfig => {
              switch (knobConfig.kind) {
                case 'text':
                  return (
                    <TextField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      onFocus={formikProps.handleFocus}
                    />
                  );
                case 'text-multi':
                  return (
                    <MultilineTextField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      onFocus={formikProps.handleFocus}
                    />
                  );
                case 'select':
                  return (
                    <SelectField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      options={knobConfig.valueOptions}
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      onFocus={formikProps.handleFocus}
                    />
                  );
                default:
                  throw new Error(`Unknown kind "${knobConfig.kind}"`);
              }
            })}
          </Spacings.Stack>
        );
        return props.children({ form, values: formikProps.values });
      }}
    />
  );
};
KnobsController.displayName = 'KnobsController';
KnobsController.propTypes = {
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
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
  availableLocaleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  children: PropTypes.func.isRequired,
};

const ExampleWrapper = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ThemeProvider
      theme={{
        // Reset theme to default styles, so that the example uses the default uikit tokens
        colorSolid: customProperties.colorSolid,
      }}
    >
      <div
        css={css`
          font-family: 'Open Sans', sans-serif;
        `}
      >
        <IntlController>
          {intlProps => (
            <KnobsController knobs={props.knobs} {...intlProps}>
              {({ form, values }) => (
                <Spacings.Stack>
                  <PreviewContainer height="400px">
                    {props.children({ values, isPlaygroundMode: false })}
                  </PreviewContainer>
                  <Spacings.Inline>
                    <Tooltip
                      position="top"
                      title="Enter playground mode"
                      components={{
                        TooltipWrapperComponent,
                      }}
                    >
                      <IconButton
                        icon={<CodeViewIcon />}
                        label="Enter playground mode"
                        onClick={() => setIsOpen(true)}
                      />
                    </Tooltip>
                  </Spacings.Inline>
                  <InfoDialog
                    title="Playground"
                    size="scale"
                    isOpen={isOpen}
                    zIndex={1100}
                    onClose={() => setIsOpen(false)}
                    getParentSelector={() => document.body}
                  >
                    <ColumnsContainer>
                      <ColumnLeft>
                        <PreviewContainer height="100%">
                          {props.children({ values, isPlaygroundMode: true })}
                        </PreviewContainer>
                      </ColumnLeft>
                      <ColumnRight>{form}</ColumnRight>
                    </ColumnsContainer>
                  </InfoDialog>
                </Spacings.Stack>
              )}
            </KnobsController>
          )}
        </IntlController>
      </div>
    </ThemeProvider>
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
