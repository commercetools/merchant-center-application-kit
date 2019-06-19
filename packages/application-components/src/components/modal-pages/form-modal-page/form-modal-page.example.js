import React from 'react';
import { Formik } from 'formik';
import { FormModalPage } from '@commercetools-frontend/application-components';
import {
  Spacings,
  TextInput,
  TextField,
  FlameIcon,
  IconButton,
  SearchIcon,
  BinLinearIcon,
} from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

const exampleCustomControls = (
  <Spacings.Inline>
    <IconButton icon={<SearchIcon />} onClick={() => {}} />
    <IconButton icon={<FlameIcon />} onClick={() => {}} />
    <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
  </Spacings.Inline>
);

const customControls = option => {
  if (option === 'custom') return exampleCustomControls;
  if (option === 'none') return <React.Fragment />;
  return undefined;
};

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
          kind: 'select',
          name: 'useCustomControls',
          label: 'Form Controls',
          valueOptions: [
            { value: 'default', label: 'Default' },
            { value: 'custom', label: 'Custom (Icon Buttons example)' },
            { value: 'none', label: 'None' },
          ],
          initialValue: 'default',
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
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    customControls={customControls(values.useCustomControls)}
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
