import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { formatLocalizedString } from '@commercetools-frontend/l10n';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../constants';
import { useChannelDetailsUpdater } from '../../hooks/use-channel-details-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsDetailsForm from './channel-details-form';
import messages from './messages';
import { transformErrors } from './transform-errors';

const ChannelsDetailsUpdate = (props) => {
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const intl = useIntl();
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const channelDetailsUpdater = useChannelDetailsUpdater();
  const handleChannelDetailsUpdate = useCallback(
    (nextDraft) =>
      channelDetailsUpdater.execute({
        originalDraft: props.channel,
        nextDraft,
      }),
    [props.channel, channelDetailsUpdater]
  );
  const handleSubmit = useCallback(
    (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      handleChannelDetailsUpdate(data).then(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleChannelDetailsUpdate]
  );

  return (
    <ChannelsDetailsForm
      initialValues={docToFormValues(props.channel, projectLanguages)}
      onSubmit={handleSubmit}
    >
      {(formProps) => {
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
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.resetForm}
            onPrimaryButtonClick={formProps.submitForm}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.revert}
          >
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </ChannelsDetailsForm>
  );
};
ChannelsDetailsUpdate.displayName = 'ChannelsDetailsUpdate';
ChannelsDetailsUpdate.propTypes = {
  onClose: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.object,
    version: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
};

export default ChannelsDetailsUpdate;
