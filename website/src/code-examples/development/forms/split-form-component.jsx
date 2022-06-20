import { Formik } from 'formik';
import Spacings from '@commercetools-uikit/spacings';
import FormChannelNameField from './form-channel-name-field';
import FormChannelKeyField from './form-channel-key-field';
import validate from './validate';

const ChannelsForm = (props) => {
  return (
    <Formik
      // Pass initial values from the parent component.
      initialValues={props.initialValues}
      // Handle form submission in the parent component.
      onSubmit={props.onSubmit}
      validate={validate}
      enableReinitialize={true}
    >
      {(formikProps) => {
        // Only contains the form elements, no buttons.
        const formElements = (
          <Spacings.Stack scale="l">
            <FormChannelNameField />
            <FormChannelKeyField />
          </Spacings.Stack>
        );

        return props.children({
          formElements,
          isDirty: formikProps.dirty,
          isSubmitting: formikProps.isSubmitting,
          submitForm: formikProps.handleSubmit,
          handleCancel: formikProps.handleReset,
        });
      }}
    </Formik>
  );
};
