import type { ReactElement } from 'react';
import { useFormik, type FormikHelpers, type FormikState } from 'formik';
import { useIntl } from 'react-intl';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import SelectField from '@commercetools-uikit/select-field';
import { CHANNEL_ROLES } from './constants';
import validate from './validate';
import messages from './messages';
import type { FormValues } from './types';

type TChannelRole = keyof typeof CHANNEL_ROLES;
const getRoleOptions = Object.keys(CHANNEL_ROLES).map((key) => ({
  label: CHANNEL_ROLES[key as TChannelRole],
  value: CHANNEL_ROLES[key as TChannelRole],
}));

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  resetForm: (nextState?: Partial<FormikState<FormValues>>) => void;
};

type ChannelDetailsFormProps = {
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void | Promise<unknown>;
  initialValues: FormValues;
  isReadOnly: boolean;
  dataLocale: string;
  children: (formProps: FormProps) => JSX.Element;
};

const ChannelDetailsForm = (props: ChannelDetailsFormProps) => {
  const intl = useIntl();
  const formik = useFormik<FormValues>({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="key"
        title={intl.formatMessage(messages.channelKeyLabel)}
        value={formik.values.key}
        errors={TextField.toFieldErrors<FormValues>(formik.errors).key}
        touched={formik.touched.key}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isReadOnly={props.isReadOnly}
        renderError={(errorKey) => {
          switch (errorKey) {
            case 'duplicate':
              return intl.formatMessage(messages.duplicateKey);
            default:
              return null;
          }
        }}
        isRequired
        horizontalConstraint={13}
      />
      <LocalizedTextField
        name="name"
        title={intl.formatMessage(messages.channelNameLabel)}
        value={formik.values.name}
        errors={TextField.toFieldErrors<FormValues>(formik.errors).name}
        touched={Boolean(formik.touched.name)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        selectedLanguage={props.dataLocale}
        isReadOnly={props.isReadOnly}
        horizontalConstraint={13}
      />
      <SelectField
        name="roles"
        title={intl.formatMessage(messages.channelRolesLabel)}
        value={formik.values.roles}
        errors={SelectField.toFieldErrors<FormValues>(formik.errors).roles}
        touched={formik.touched.roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMulti
        options={getRoleOptions}
        isReadOnly={props.isReadOnly}
        isRequired
        horizontalConstraint={13}
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    resetForm: formik.resetForm,
  });
};
ChannelDetailsForm.displayName = 'ChannelDetailsForm';

export default ChannelDetailsForm;
