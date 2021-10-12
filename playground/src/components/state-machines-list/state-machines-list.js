import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import {
  formatLocalizedString,
  applyTransformedLocalizedFields,
} from '@commercetools-frontend/l10n';
import messages from './messages';
import styles from './state-machines-list.mod.css';
import FetchStatesQuery from './fetch-states.ctp.graphql';
import { Pagination } from '@commercetools-uikit/pagination';

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

const itemRendered = (item, column, dataLocale, projectLanguages) => {
  switch (column.key) {
    case 'name':
      return formatLocalizedString(
        applyTransformedLocalizedFields(item, [
          { from: 'nameAllLocales', to: 'name' },
        ]),
        { key: 'name', locale: dataLocale, fallbackOrder: projectLanguages }
      );
    default:
      return <span>{item[column.key]}</span>;
  }
};

const getErrorMessage = (error) =>
  error.stack || error.message || error.toString();

const StateMachinesList = (props) => {
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { data, error, loading } = useMcQuery(FetchStatesQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  const hasNoResults = Boolean(
    !loading && data.states.results && data.states.total === 0
  );

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h2" intlMessage={messages.title} />
        {loading && <LoadingSpinner />}
        {error && <div>{getErrorMessage(error)}</div>}
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
                itemRendered(item, column, dataLocale, projectLanguages)
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
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
StateMachinesList.displayName = 'StateMachinesList';
StateMachinesList.propTypes = {
  goToStateMachineDetail: PropTypes.func.isRequired,
};

export default StateMachinesList;
