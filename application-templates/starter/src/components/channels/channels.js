import { useEffect } from 'react';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useShowApiErrorNotification } from '@commercetools-frontend/actions-global';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import FetchChannelsQuery from './fetch-channels.ctp.graphql';
import messages from './messages';

const columns = [
  { key: 'name', label: 'Channel name' },
  { key: 'key', label: 'Channel key', isSortable: true },
  { key: 'roles', label: 'Roles' },
];
const itemRendered = (item, column) => {
  switch (column.key) {
    case 'roles':
      return item.roles.join(', ');
    default:
      return item[column.key];
  }
};

const Channels = () => {
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const showApiErrorNotification = useShowApiErrorNotification();
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const { data, error, loading } = useMcQuery(FetchChannelsQuery, {
    variables: {
      locale: dataLocale,
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  useEffect(() => {
    if (error) {
      showApiErrorNotification({
        errors:
          error.graphQLErrors.length > 0
            ? error.graphQLErrors
            : [{ message: error.message }],
      });
    }
  }, [error, showApiErrorNotification]);

  return (
    <Spacings.Stack scale="xl">
      <Text.Headline as="h2" intlMessage={messages.title} />

      {loading && <LoadingSpinner />}

      {data?.channels ? (
        <Spacings.Stack>
          <DataTable
            isCondensed
            columns={columns}
            rows={data.channels.results}
            itemRenderer={itemRendered}
            maxHeight={600}
            sortedBy={tableSorting.value.key}
            sortDirection={tableSorting.value.order}
            onSortChange={tableSorting.onChange}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={data.channels.total}
          />
        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Channels.displayName = 'Channels';

export default Channels;
