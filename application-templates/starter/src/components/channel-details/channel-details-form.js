import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFormik } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { formatLocalizedString } from '@commercetools-frontend/l10n';
import { ErrorMessage } from '@commercetools-uikit/messages';
import SelectField from '@commercetools-uikit/select-field';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import omitEmpty from 'omit-empty-es';
import { useChannelDetailsUpdater } from '../../hooks/use-channel-details-connector';
import { PERMISSIONS } from '../../constants';
import LabelRequired from '../label-required';
import ReadOnlyMessage from '../read-only-message';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { CHANNEL_ROLES } from './constants';

const getRoleOptions = (intl) =>
  Object.keys(CHANNEL_ROLES).map((key) => ({
    label: intl.formatMessage(messages[key]),
    value: CHANNEL_ROLES[key],
  }));

const createInitialValues = (channel, languages) => ({
  ...channel,
  name: LocalizedTextInput.createLocalizedString(languages, channel.name),
});

const ChannelDetailsForm = (props) => {
  const intl = useIntl();
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const channelDetailsUpdater = useChannelDetailsUpdater();
  const handleChannelDetailsUpdate = useCallback(
    (nextDraft) =>
      channelDetailsUpdater.execute({
        originalDraft: props.channel,
        nextDraft,
      }),
    [props.channel, channelDetailsUpdater]
  );
  const formik = useFormik({
    initialValues: createInitialValues(props.channel, projectLanguages),
    enableReinitialize: true,
    validate: (formikValues) => {
      const errors = {
        key: {},
        roles: {},
      };
      if (TextInput.isEmpty(formikValues.key)) {
        errors.key.missing = true;
      }
      if (
        Array.isArray(formikValues.roles) &&
        formikValues.roles.length === 0
      ) {
        errors.roles.missing = true;
      }
      return omitEmpty(errors);
    },
    onSubmit: (formikValues, formikHelpers) => {
      handleChannelDetailsUpdate(formikValues).then(
        () => {
          formikHelpers.resetForm();
          showNotification({
            kind: 'success',
            domain: DOMAINS.SIDE,
            text: intl.formatMessage(messages.channelUpdated, {
              channelName: formatLocalizedString(formikValues, {
                key: 'name',
                locale: dataLocale,
                fallbackOrder: projectLanguages,
              }),
            }),
          });
        },
        (graphQLErrors) => {
          const transformedErrors = transformErrors(graphQLErrors);
          if (transformedErrors.unmappedErrors.length > 0)
            showApiErrorNotification({
              errors: transformedErrors.unmappedErrors,
            });

          formikHelpers.setErrors(transformedErrors.formErrors);
        }
      );
    },
  });

  return (
    <FormModalPage
      title={formatLocalizedString(props.channel, {
        key: 'name',
        locale: dataLocale,
        fallbackOrder: projectLanguages,
        fallback: NO_VALUE_FALLBACK,
      })}
      isOpen={true}
      onClose={props.onClose}
      isPrimaryButtonDisabled={
        formik.isSubmitting || !formik.dirty || !canManage
      }
      subtitle={canManage ? <LabelRequired /> : <ReadOnlyMessage />}
      isSecondaryButtonDisabled={!formik.dirty}
      onSecondaryButtonClick={formik.resetForm}
      onPrimaryButtonClick={formik.handleSubmit}
      labelPrimaryButton={intl.formatMessage(messages.save)}
      labelSecondaryButton={intl.formatMessage(messages.revert)}
    >
      <Constraints.Horizontal max={13}>
        <Spacings.Stack scale="xl">
          <ContentNotification type="info">
            <Text.Body intlMessage={messages.hint} />
          </ContentNotification>
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="s">
              <TextField
                name="key"
                title={intl.formatMessage(messages.channelKeyLabel)}
                value={formik.values.key}
                errors={formik.errors.key}
                touched={formik.touched.key}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isReadOnly={!canManage}
                isRequired={canManage}
              />
              {formik.errors?.key?.duplicate && (
                <ErrorMessage>
                  <FormattedMessage {...messages.duplicateKey} />
                </ErrorMessage>
              )}
            </Spacings.Stack>
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
              options={getRoleOptions(intl)}
              isReadOnly={!canManage}
              isRequired={canManage}
            />
          </Spacings.Stack>
        </Spacings.Stack>
      </Constraints.Horizontal>
    </FormModalPage>
  );
};
ChannelDetailsForm.displayName = 'ChannelDetailsForm';
ChannelDetailsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
};

export default ChannelDetailsForm;
