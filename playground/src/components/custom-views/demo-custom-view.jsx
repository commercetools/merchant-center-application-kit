import { useEffect, useState } from 'react';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  InfoDetailPage,
  InfoMainPage,
  InfoModalPage,
  TabularMainPage,
  TabHeader,
  InfoDialog,
  FormModalPage,
  FormMainPage,
  CustomFormMainPage,
  FormDetailPage,
  CustomFormDetailPage,
  TabularDetailPage,
  CustomFormModalPage,
  TabularModalPage,
  ConfirmationDialog,
  FormDialog,
} from '@commercetools-frontend/application-components';
import {
  CustomViewShell,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
  GRAPHQL_TARGETS,
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CUSTOM_VIEW_ID, DEMO_CUSTOM_VIEW } from './constants';
import FetchChannelsQuery from './fetch-channels.ctp.graphql';

const channelsColumns = [
  {
    key: 'key',
    label: 'Key',
  },
  {
    key: 'name',
    label: 'Name',
  },
];

function ChannelsCustomView() {
  const projectName = useApplicationContext((context) => context.project.name);
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const showNotification = useShowNotification();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, error, loading } = useMcQuery(FetchChannelsQuery, {
    variables: {
      limit: 50,
      offset: 0,
      dataLocale,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{error.toString()}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <>
      <Constraints.Horizontal max="scale">
        <Spacings.Stack scale="xl">
          <div
            onClick={() => {
              showNotification({
                kind: NOTIFICATION_KINDS_PAGE.error,
                domain: DOMAINS.GLOBAL,
                text: 'Error 💥',
              });
              showNotification({
                kind: NOTIFICATION_KINDS_PAGE.warning,
                domain: DOMAINS.PAGE,
                text: 'Warning ⚠️',
              });
              showNotification({
                kind: NOTIFICATION_KINDS_PAGE.success,
                domain: DOMAINS.SIDE,
                text: 'Success! 🎉',
              });
            }}
          >
            <Text.Headline as="h1">
              <i>{projectName}</i> project channels
            </Text.Headline>
          </div>

          <Constraints.Horizontal max={4}>
            <PrimaryButton
              label="Open dialog"
              size="small"
              onClick={() => setIsDialogOpen(true)}
            />
          </Constraints.Horizontal>

          <DataTable
            columns={channelsColumns}
            rows={data.channels.results}
            itemRenderer={(item, column) => item[column.key] ?? ''}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>

      {/* <ConfirmationDialog
        title="Demo Dialog"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        size={4}
      >
        <p>Dialog content message</p>
      </ConfirmationDialog> */}
      <InfoModalPage
        title="Demo Modal"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <p>Dialog content message</p>
      </InfoModalPage>
    </>
  );
}

function DemoCustomView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.app.applicationIdentifier = `__local:${CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH}`;
    window.app.customViewId = CUSTOM_VIEW_ID;
    window.app.__DEVELOPMENT__.customViewConfig = DEMO_CUSTOM_VIEW;
    window.app.__DEVELOPMENT__.customViewHostUrl = window.location.href;
    document.querySelector('.loading-screen').remove();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CustomViewShell disableDevHost applicationMessages={{}}>
      <ChannelsCustomView />
    </CustomViewShell>
  );
}

export default DemoCustomView;
