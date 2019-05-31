import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import { Formik } from 'formik';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  Spacings,
  TextInput,
  TextField,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import { number } from '@storybook/addon-knobs/dist/deprecated';
import Readme from './README.md';
import FormModalPage from './form-modal-page';

const ModalController = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <Spacings.Inline>
          <SecondaryButton
            label="Open a Form Modal Page"
            onClick={() => setIsOpen(true)}
          />
        </Spacings.Inline>
        {props.children({ isOpen, setIsOpen })}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
ModalController.displayName = 'ModalController';
ModalController.propTypes = {
  children: PropTypes.func.isRequired,
};

storiesOf('Components|Modals', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('FormModalPage', () => {
    const firstModalLevel = number('level', 1);

    return (
      <React.Fragment>
        <div id={PORTALS_CONTAINER_ID} />
        <ModalController>
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
                  level={firstModalLevel}
                  title={text('title', 'Modal Page Title')}
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  subtitle={text('subtitle', 'Subtitle text') || undefined}
                  topBarPreviousPathLabel={
                    text('topBarPreviousPathLabel', '') || undefined
                  }
                  topBarCurrentPathLabel={
                    text('topBarCurrentPathLabel', '') || undefined
                  }
                  onSecondaryButtonClick={() => {
                    alert('cancelled');
                    setIsOpen(false);
                  }}
                  onPrimaryButtonClick={formikProps.handleSubmit}
                  labelPrimaryButton={
                    text('labelPrimaryButton', '') || undefined
                  }
                  labelSecondaryButton={
                    text('labelSecondaryButton', '') || undefined
                  }
                  isPrimaryButtonDisabled={
                    boolean('isPrimaryButtonDisabled', false) ||
                    formikProps.isSubmitting
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
                    horizontalConstraint="m"
                  />
                </FormModalPage>
              )}
            />
          )}
        </ModalController>
      </React.Fragment>
    );
  });
