import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  MC_API_PROXY_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import DataTable from '@commercetools-uikit/data-table';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { getErrorMessage } from '../../utils/get-error-message';
import FetchStatesQuery from './fetch-states.ctp.graphql';
import messages from './messages';
import styles from './state-machines-list.module.css';

export const columnsDefinition = [
  {
    key: 'key',
    label: <FormattedMessage {...messages.columnStateMachineKey} />,
    isSortable: true,
  },
  {
    key: 'name',
    label: <FormattedMessage {...messages.columnStateMachineName} />,
  },
];

const itemRenderer = (item, column, dataLocale, projectLanguages) => {
  switch (column.key) {
    case 'name':
      return formatLocalizedString(
        { name: transformLocalizedFieldToLocalizedString(item.nameAllLocales) },
        {
          key: 'name',
          locale: dataLocale,
          fallbackOrder: projectLanguages,
          fallback: NO_VALUE_FALLBACK,
        }
      );
    default:
      return <span>{item[column.key]}</span>;
  }
};

const StateMachinesList = (props) => {
  const { dataLocale, projectLanguages, projectKey } = useApplicationContext(
    (context) => ({
      dataLocale: context.dataLocale,
      projectLanguages: context.project.languages,
      projectKey: context.project.key,
    })
  );
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const searchParams = new URLSearchParams({
    limit: perPage.value,
    offset: (page.value - 1) * perPage.value,
    sort: `${tableSorting.value.key} ${tableSorting.value.order}`,
  });

  const { data, error, loading } = useMcQuery(FetchStatesQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      endpoint: `/proxy/${
        MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM
      }/${projectKey}/states?${searchParams.toString()}`,
    },
    context: {
      skipGraphQlTargetCheck: true,
    },
  });

  const hasNoResults = Boolean(
    !loading && data?.states.results && data?.states.total === 0
  );

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h2" intlMessage={messages.title} />
        {loading && <LoadingSpinner />}
        {error && (
          <ContentNotification type="error">
            <Text.Body>{getErrorMessage(error)}</Text.Body>
          </ContentNotification>
        )}
        {hasNoResults && (
          <div className={styles['empty-results']}>
            <Text.Body intlMessage={messages.noResultsText} />
          </div>
        )}
        {data?.states && (
          <Spacings.Stack scale="m">
            <DataTable
              columns={columnsDefinition}
              rows={data.states.results}
              onRowClick={({ id }) => {
                props.goToStateMachineDetail(id);
              }}
              itemRenderer={(item, column) =>
                itemRenderer(item, column, dataLocale, projectLanguages)
              }
              sortedBy={tableSorting.value.key}
              sortDirection={tableSorting.value.order}
              onSortChange={tableSorting.onChange}
            />
            <Pagination
              page={page.value}
              onPageChange={page.onChange}
              perPage={perPage.value}
              onPerPageChange={perPage.onChange}
              totalItems={data.states.total}
            />
          </Spacings.Stack>
        )}
        {props.children}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
StateMachinesList.displayName = 'StateMachinesList';
StateMachinesList.propTypes = {
  goToStateMachineDetail: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default StateMachinesList;
