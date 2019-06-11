import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';
import { IntlProvider } from 'react-intl';
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

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
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
  children: PropTypes.func.isRequired,
};

const ExampleWrapper = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <ThemeProvider
      theme={{
        // Reset theme to default styles, so that the example uses the default uikit tokens
        fontFamilyDefault: customProperties.fontFamilyDefault,
        colorSolid: customProperties.colorsSolid,
      }}
    >
      <IntlProvider locale="en">
        <KnobsController knobs={props.knobs}>
          {({ form, values }) => (
            <Spacings.Stack>
              <PreviewContainer height="400px">
                {props.children({ values, isPlaygroundMode: false })}
              </PreviewContainer>
              <Spacings.Inline>
                <Tooltip position="top" title="Enter playground mode">
                  <IconButton
                    icon={<CodeViewIcon />}
                    label="Enter playground mode"
                    onClick={() => toggle(true)}
                  />
                </Tooltip>
              </Spacings.Inline>
              <InfoDialog
                title="Playground"
                size="scale"
                isOpen={isOpen}
                onClose={() => toggle(false)}
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
      </IntlProvider>
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

export default ExampleWrapper;
