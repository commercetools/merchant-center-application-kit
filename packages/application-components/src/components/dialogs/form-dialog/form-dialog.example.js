import React from 'react';
import { Formik } from 'formik';
import { FormDialog } from '@commercetools-frontend/application-components';
import { Spacings, TextField } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const FormDialogExample = () => {
  return (
    <ExampleWrapper
      knobs={[
        {
          kind: 'text',
          name: 'title',
          label: 'Title',
          initialValue:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          kind: 'select',
          name: 'size',
          label: 'Size',
          valueOptions: [
            { value: 'm', label: 'm' },
            { value: 'l', label: 'l' },
            { value: 'scale', label: 'scale' },
          ],
          initialValue: 'scale',
        },
      ]}
    >
      {({ values, isPlaygroundMode }) => {
        const containerId = isPlaygroundMode
          ? 'form-dialog-playground'
          : 'form-dialog';
        return (
          <ModalController
            containerId={containerId}
            title="Open the Form Dialog by clicking on the button"
            buttonLabel="Open Form Dialog"
          >
            {({ isOpen, setIsOpen }) => (
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
                  setIsOpen(false);
                }}
                render={formikProps => (
                  <FormDialog
                    title={values.title}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    size={values.size}
                    isPrimaryButtonDisabled={formikProps.isSubmitting}
                    onSecondaryButtonClick={() => {
                      formikProps.resetForm();
                      setIsOpen(false);
                    }}
                    onPrimaryButtonClick={formikProps.handleSubmit}
                    getParentSelector={() =>
                      document.querySelector(`#${containerId}`)
                    }
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
          </ModalController>
        );
      }}
    </ExampleWrapper>
  );
};
FormDialogExample.displayName = 'FormDialogExample';

export default FormDialogExample;
