import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { Formik } from 'formik';
import { Spacings, TextField, TextInput } from '@commercetools-frontend/ui-kit';
import ModalController from '../../internals/for-docs/modal-controller';
import Readme from './README.md';
import FormDialog from './form-dialog';

storiesOf('Components|Dialogs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FormDialog', () => (
    <React.Fragment>
      <div id={PORTALS_CONTAINER_ID} />
      <ModalController
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
                title={text('title', 'Lorem Ipsum')}
                isOpen={isOpen}
                onClose={
                  boolean('disable close', false)
                    ? undefined
                    : () => setIsOpen(false)
                }
                size={select('size', ['m', 'l', 'scale'], 'l')}
                zIndex={number('z-index', 1000)}
                labelSecondary={text('label secondary', '') || undefined}
                labelPrimary={text('label primary', '') || undefined}
                isPrimaryButtonDisabled={
                  boolean('isPrimaryButtonDisabled', false) ||
                  formikProps.isSubmitting
                }
                onSecondaryButtonClick={() => {
                  alert('cancelled');
                  setIsOpen(false);
                }}
                onPrimaryButtonClick={formikProps.handleSubmit}
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
    </React.Fragment>
  ));
