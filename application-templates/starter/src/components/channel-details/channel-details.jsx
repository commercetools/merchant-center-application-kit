import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { formatLocalizedString } from '@commercetools-frontend/l10n';
import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../constants';
import {
  useChannelDetailsUpdater,
  useChannelDetailsFetcher,
} from '../../hooks/use-channels-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import ChannelsDetailsForm from './channel-details-form';
import { transformErrors } from './transform-errors';
import messages from './messages';

const ChannelDetails = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { loading, error, channel } = useChannelDetailsFetcher(params.id);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();
  const channelDetailsUpdater = useChannelDetailsUpdater();
  const handleSubmit = useCallback(
    async (formikValues, formikHelpers) => {
      const data = formValuesToDoc(formikValues);
      try {
        await channelDetailsUpdater.execute({
          originalDraft: channel,
          nextDraft: data,
        });
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
      } catch (graphQLErrors) {
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0)
          showApiErrorNotification({
            errors: transformedErrors.unmappedErrors,
          });

        formikHelpers.setErrors(transformedErrors.formErrors);
      }
    },
    [
      channel,
      channelDetailsUpdater,
      dataLocale,
      intl,
      projectLanguages,
      showApiErrorNotification,
      showNotification,
    ]
  );

  return (
    <ChannelsDetailsForm
      initialValues={docToFormValues(channel, projectLanguages)}
      onSubmit={handleSubmit}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={formatLocalizedString(
              {
                name: formProps.values?.name,
              },
              {
                key: 'name',
                locale: dataLocale,
                fallbackOrder: projectLanguages,
                fallback: NO_VALUE_FALLBACK,
              }
            )}
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={
              formProps.isSubmitting || !formProps.isDirty || !canManage
            }
            isSecondaryButtonDisabled={!formProps.isDirty}
            onSecondaryButtonClick={formProps.handleReset}
            onPrimaryButtonClick={formProps.submitForm}
            labelPrimaryButton={FormModalPage.Intl.save}
            labelSecondaryButton={FormModalPage.Intl.revert}
          >
            {loading && (
              <Spacings.Stack alignItems="center">
                <LoadingSpinner />
              </Spacings.Stack>
            )}
            {error && (
              <ContentNotification type="error">
                <Text.Body>
                  {intl.formatMessage(messages.channelDetailsErrorMessage)}
                </Text.Body>
              </ContentNotification>
            )}
            {channel && formProps.formElements}
            {channel === null && <PageNotFound />}
          </FormModalPage>
        );
      }}
    </ChannelsDetailsForm>
  );
};
ChannelDetails.displayName = 'ChannelDetails';
ChannelDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChannelDetails;
