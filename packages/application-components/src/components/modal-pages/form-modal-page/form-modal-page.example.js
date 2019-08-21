import React from 'react';
import { Formik } from 'formik';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { TextInput, TextField } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const FormModalPageExample = () => (
  <React.Fragment>
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
          kind: 'text',
          name: 'subtitle',
          label: 'Subtitle',
          initialValue:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          kind: 'text',
          name: 'labelPrimaryButton',
          label: 'Label Primary Button',
          initialValue: 'Confirm',
        },
        {
          kind: 'text',
          name: 'labelSecondaryButton',
          label: 'Label Secondary Button',
          initialValue: 'Cancel',
        },
        {
          kind: 'select',
          name: 'hideControls',
          label: 'Hide Controls?',
          valueOptions: [
            { value: false, label: 'No' },
            { value: true, label: 'Yes' },
          ],
          initialValue: false,
        },
      ]}
    >
      {({ values, isPlaygroundMode }) => {
        const containerId = isPlaygroundMode
          ? 'form-modal-page-playground'
          : 'form-modal-page';
        return (
          <ModalController
            title="Open the Form Modal Page by clicking on the button"
            buttonLabel="Open Form Modal Page"
            containerId={containerId}
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
                  <FormModalPage
                    title={values.title}
                    subtitle={values.subtitle}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isPrimaryButtonDisabled={formikProps.isSubmitting}
                    isSecondaryButtonDisabled={formikProps.isSubmitting}
                    labelSecondaryButton={values.labelSecondaryButton}
                    labelPrimaryButton={values.labelPrimaryButton}
                    onSecondaryButtonClick={() => {
                      formikProps.resetForm();
                      setIsOpen(false);
                    }}
                    onPrimaryButtonClick={formikProps.handleSubmit}
                    getParentSelector={() =>
                      document.querySelector(`#${containerId}`)
                    }
                    hideControls={values.hideControls}
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
          </ModalController>
        );
      }}
    </ExampleWrapper>
  </React.Fragment>
);

FormModalPageExample.displayName = 'FormModalPageExample';

export default FormModalPageExample;
