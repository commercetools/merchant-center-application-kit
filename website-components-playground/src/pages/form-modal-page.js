import React from 'react';
import { Formik } from 'formik';
import { FormModalPage } from '@commercetools-frontend/application-components';
import {
  FlameIcon,
  SearchIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import IconButton from '@commercetools-uikit/icon-button';
import Spacings from '@commercetools-uikit/spacings';
import TextInput from '@commercetools-uikit/text-input';
import TextField from '@commercetools-uikit/text-field';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

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

const containerId = 'form-modal-page';

const FormModalPageExample = props => (
  <LayoutApp>
    <PlaygroundController
      // eslint-disable-next-line react/prop-types
      {...props.pageContext}
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
      {({ values }) => (
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
      )}
    </PlaygroundController>
  </LayoutApp>
);

FormModalPageExample.displayName = 'FormModalPageExample';

export default FormModalPageExample;
