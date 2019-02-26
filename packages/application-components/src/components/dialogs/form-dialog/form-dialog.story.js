import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { Formik } from 'formik';
import {
  SecondaryButton,
  Spacings,
  Text,
  TextField,
  TextInput,
} from '@commercetools-frontend/ui-kit';
import Readme from './README.md';
import FormDialog from './form-dialog';

const DialogController = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spacings.Stack>
        <Text.Headline elementType="h3">
          {'Open the Form Dialog by clicking on the button'}
        </Text.Headline>
        <Spacings.Inline>
          <SecondaryButton
            label="Open Form Dialog"
            onClick={() => toggle(true)}
          />
        </Spacings.Inline>
        {props.children({ isOpen, toggle })}
      </Spacings.Stack>
    </div>
  );
};
DialogController.displayName = 'DialogController';
DialogController.propTypes = {
  children: PropTypes.func.isRequired,
};

storiesOf('Components|Dialogs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FormDialog', () => (
    <React.Fragment>
      <div id={PORTALS_CONTAINER_ID} />
      <DialogController>
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
                title={text('title', 'Lorem Ipsum')}
                isOpen={isOpen}
                onClose={
                  boolean('disable close', false)
                    ? undefined
                    : () => toggle(false)
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
                  toggle(false);
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
      </DialogController>
    </React.Fragment>
  ));
