import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DotIcon } from '@commercetools-uikit/icons';
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
import messages from './messages';
import styles from './state-machines-list.mod.css';
import FetchStatesQuery from './fetch-states.ctp.graphql';

export const columnsDefinition = [
  {
    key: 'key',
    label: <FormattedMessage {...messages.columnStateMachineKey} />,
  },
  {
    key: 'name',
    label: <FormattedMessage {...messages.columnStateMachineName} />,
  },
];

const getErrorMessage = (error) =>
  error.stack || error.message || error.toString();

const StateMachinesList = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });

  const { data, error, loading } = useMcQuery(FetchStatesQuery, {
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

  const hasNoResults = Boolean(
    !loading && data.states.results && data.states.results.total === 0
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
            <Spacings.Inline alignItems="center">
              <DotIcon size="small" color="primary" />
              <Text.Detail isItalic={true}>
                <FormattedMessage
                  {...messages.objectsInCache}
                  values={{
                    count: data.states.results.length,
                  }}
                />
              </Text.Detail>
            </Spacings.Inline>
            <DataTable
              columns={columnsDefinition}
              rows={data.states.results}
              onRowClick={({ id }) => {
                props.goToStateMachineDetail(id);
              }}
              itemRenderer={(row, column) => <span>{row[column.key]}</span>}
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
