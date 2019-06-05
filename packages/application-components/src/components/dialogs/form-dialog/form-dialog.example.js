import React from 'react';
import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import { Spacings, TextField, TextInput } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';

// This component is supposed to be used in the mdx documentation
const FormDialogExample = () => (
  <ExampleWrapper
    containerId="form-dialog"
    controllerTitle="Open the Form Dialog by clicking on the button"
    controllerButtonLabel="Open Form Dialog"
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
          <FormDialog
            title="Lorem Ipsum"
            isOpen={isOpen}
            onClose={() => toggle(false)}
            size="l"
            isPrimaryButtonDisabled={formikProps.isSubmitting}
            onSecondaryButtonClick={() => {
              formikProps.resetForm();
              toggle(false);
            }}
            onPrimaryButtonClick={formikProps.handleSubmit}
            getParentSelector={() => document.querySelector(`#form-dialog`)}
          >
            <Spacings.Stack scale="m">
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
            </Spacings.Stack>
          </FormDialog>
        )}
      />
    )}
  </ExampleWrapper>
);
FormDialogExample.displayName = 'FormDialogExample';

export default FormDialogExample;
