import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import SelectField from '@commercetools-uikit/select-field';
import { PERMISSIONS } from '../../constants';
import { CHANNEL_ROLES } from './constants';
import validate from './validate';
import messages from './messages';

const getRoleOptions = Object.keys(CHANNEL_ROLES).map((key) => ({
  label: CHANNEL_ROLES[key],
  value: CHANNEL_ROLES[key],
}));

const ChannelDetailsForm = (props) => {
  const intl = useIntl();
  const { dataLocale } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
  }));
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="key"
        title={intl.formatMessage(messages.channelKeyLabel)}
        value={formik.values.key ?? ''}
        errors={formik.errors.key}
        touched={formik.touched.key}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isReadOnly={!canManage}
        renderError={(errorKey) => {
          switch (errorKey) {
            case 'duplicate':
              return intl.formatMessage(messages.duplicateKey);
            default:
              return null;
          }
        }}
        isRequired
      />
      <LocalizedTextField
        name="name"
        title={intl.formatMessage(messages.channelNameLabel)}
        value={formik.values.name}
        errors={formik.errors.name}
        touched={Boolean(formik.touched.name)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        selectedLanguage={dataLocale}
        isReadOnly={!canManage}
      />
      <SelectField
        name="roles"
        title={intl.formatMessage(messages.channelRolesLabel)}
        value={formik.values.roles}
        errors={formik.errors.roles}
        touched={formik.touched.roles}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMulti
        options={getRoleOptions}
        isReadOnly={!canManage}
        isRequired
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    resetForm: formik.resetForm,
  });
};
ChannelDetailsForm.displayName = 'ChannelDetailsForm';
ChannelDetailsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.object,
    version: PropTypes.number,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
};

export default ChannelDetailsForm;
