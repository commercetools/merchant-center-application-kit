import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  formatLocalizedString,
  applyTransformedLocalizedFields,
} from '@commercetools-frontend/l10n';
import { ErrorMessage } from '@commercetools-uikit/messages';
import FetchChannelsQuery from './fetch-channels.ctp.graphql';
import messages from './messages';

const getErrorMessage = (error) =>
  error.stack || error.message || error.toString();

const columns = [
  { key: 'name', label: 'Channel name' },
  { key: 'key', label: 'Channel key', isSortable: true },
  { key: 'roles', label: 'Roles' },
];

const itemRendered = (item, column, dataLocale, projectLanguages) => {
  switch (column.key) {
    case 'roles':
      return item.roles.join(', ');
    case 'name':
      return formatLocalizedString(
        applyTransformedLocalizedFields(item, [
          { from: 'nameAllLocales', to: 'name' },
        ]),
        { key: 'name', locale: dataLocale, fallbackOrder: projectLanguages }
      );
    default:
      return item[column.key];
  }
};

const Channels = (props) => {
  const intl = useIntl();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const { data, error, loading } = useMcQuery(FetchChannelsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>}

      {data?.channels ? (
        <Spacings.Stack scale="l">
          <DataTable
            isCondensed
            columns={columns}
            rows={data.channels.results}
            itemRenderer={(item, column) =>
              itemRendered(item, column, dataLocale, projectLanguages)
            }
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
Channels.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Channels;
