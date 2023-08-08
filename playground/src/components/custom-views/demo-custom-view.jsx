import { useEffect, useState } from 'react';
import {
  CustomViewShell,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { CUSTOM_VIEW_ID } from './custom-panel-demo';
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
  const { projectName, locale } = useApplicationContext((context) => ({
    projectKey: context.project.key,
    projectName: context.project.name,
    locale: context.user.locale,
  }));

  const { data, error, loading } = useMcQuery(FetchChannelsQuery, {
    variables: {
      limit: 10,
      offset: 0,
      locale,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error(error);
    return <h2>Unexpected Error</h2>;
  }

  return (
    <Constraints.Horizontal max="scale">
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1">
          <i>{projectName}</i> project channels
        </Text.Headline>

        <DataTable columns={channelsColumns} rows={data.channels.results} />
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
}

function DemoCustomView() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.app.customViewId = `__local:${CUSTOM_VIEW_ID}`;
    document.querySelector('.loading-screen').remove();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <CustomViewShell customViewId={CUSTOM_VIEW_ID} messages={{}}>
      <ChannelsCustomView />
    </CustomViewShell>
  );
}

export default DemoCustomView;
