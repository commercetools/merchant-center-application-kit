import React from 'react';
import { Formik } from 'formik';
import { CustomFormModalPage } from '@commercetools-frontend/application-components';
import { TextInput, TextField } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const CustomFormModalPageExample = () => (
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
          ? 'custom-form-modal-page-playground'
          : 'custom-form-modal-page';
        return (
          <ModalController
            title="Open the Custom Form Modal Page by clicking on the button"
            buttonLabel="Open Custom Form Modal Page"
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
                  <CustomFormModalPage
                    title={values.title}
                    subtitle={values.subtitle}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    controls={
                      <React.Fragment>
                        <CustomFormModalPage.FormSecondaryButton
                          onClick={() => {
                            formikProps.resetForm();
                            setIsOpen(false);
                          }}
                        />
                        <CustomFormModalPage.FormPrimaryButton
                          onClick={formikProps.handleSubmit}
                        />
                        <CustomFormModalPage.FormDeleteButton
                          onClick={() => null}
                          isDisabled={true}
                        />
                      </React.Fragment>
                    }
                    hideControls={values.hideControls}
                    getParentSelector={() =>
                      document.querySelector(`#${containerId}`)
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
                  </CustomFormModalPage>
                )}
              />
            )}
          </ModalController>
        );
      }}
    </ExampleWrapper>
  </React.Fragment>
);

CustomFormModalPageExample.displayName = 'CustomFormModalPageExample';

export default CustomFormModalPageExample;
