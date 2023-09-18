import { useEffect, useState } from 'react';
import {
  CustomViewShell,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
  GRAPHQL_TARGETS,
} from '@commercetools-frontend/constants';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
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
    <Constraints.Horizontal max="scale">
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1">
          <i>{projectName}</i> project channels
        </Text.Headline>

        <DataTable
          columns={channelsColumns}
          rows={data.channels.results}
          itemRenderer={(item, column) => item[column.key] ?? ''}
        />
      </Spacings.Stack>
    </Constraints.Horizontal>
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
