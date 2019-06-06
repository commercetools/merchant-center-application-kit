import React from 'react';
import { Formik } from 'formik';
import { FormModalPage } from '@commercetools-frontend/application-components';
import {
  Text,
  Spacings,
  TextInput,
  TextField,
  FlameIcon,
  IconButton,
  SearchIcon,
  ToggleInput,
  BinLinearIcon,
} from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';

const exampleCustomControls = (
  <Spacings.Inline>
    <IconButton icon={<SearchIcon />} onClick={() => {}} />
    <IconButton icon={<FlameIcon />} onClick={() => {}} />
    <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
  </Spacings.Inline>
);

// This component is supposed to be used in the mdx documentation
const FormModalPageExample = () => {
  const [useCustomControls, setUseCustomControls] = React.useState(false);

  return (
    <React.Fragment>
      <ExampleWrapper
        containerId="form-modal-page"
        containerHeight="600px"
        controllerTitle="Open the Form Modal Page by clicking on the button"
        controllerButtonLabel="Open Form Modal Page"
      >
        {({ isOpen, toggle }) => (
          <Formik
            initialValues={{ email: '' }}
            validate={formikValues => {
              if (TextInput.isEmpty(formikValues.email)) {
                return { email: { missing: true } };
              }
              return {};
            }}
            onSubmit={formikValues => {
              alert(`email: ${formikValues.email}`);
              toggle(false);
            }}
            render={formikProps => (
              <FormModalPage
                title="Lorem Ipsum"
                isOpen={isOpen}
                onClose={() => toggle(false)}
                customControls={useCustomControls && exampleCustomControls}
                isPrimaryButtonDisabled={formikProps.isSubmitting}
                onSecondaryButtonClick={() => {
                  formikProps.resetForm();
                  toggle(false);
                }}
                onPrimaryButtonClick={formikProps.handleSubmit}
                parentSelector={() =>
                  document.querySelector('#form-modal-page')
                }
              >
                <TextField
                  name="email"
                  title="Email"
                  isRequired={true}
                  value={formikProps.values.email}
                  errors={formikProps.errors.email}
                  touched={formikProps.touched.email}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  onFocus={formikProps.handleFocus}
                />
              </FormModalPage>
            )}
          />
        )}
      </ExampleWrapper>
      <Spacings.Inline alignItems="center">
        <ToggleInput
          name="Use Custom Controls"
          isChecked={useCustomControls}
          onChange={event => {
            setUseCustomControls(event.target.checked);
          }}
        />
        <Text.Body>Use Custom Controls</Text.Body>
      </Spacings.Inline>
    </React.Fragment>
  );
};
FormModalPageExample.displayName = 'FormModalPageExample';

export default FormModalPageExample;
