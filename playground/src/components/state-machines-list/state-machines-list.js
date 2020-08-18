import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { DotIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable from '@commercetools-uikit/data-table';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import PageBottomSpacer from '../page-bottom-spacer';
import { selectStateMachinesFromCache } from '../../reducers/cache';
import StateMachinesListConnector from '../state-machines-list-connector';
import messages from './messages';
import styles from './state-machines-list.mod.css';

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
  const cachedStateMachine = useSelector(selectStateMachinesFromCache);
  const cachedStateMachineObjectsCount = cachedStateMachine
    ? Object.keys(cachedStateMachine).length
    : null;

  const dataLocale = useApplicationContext((context) => context.dataLocale);

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="m">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <StateMachinesListConnector>
          {({ isLoading, result, error, hasNoResults /* , refresh */ }) => {
            if (isLoading) return <LoadingSpinner />;
            if (error) return <div>{getErrorMessage(error)}</div>;
            if (hasNoResults) {
              return (
                <div className={styles['empty-results']}>
                  <Text.Body intlMessage={messages.noResultsText} />
                </div>
              );
            }
            return (
              <Spacings.Stack scale="m">
                {cachedStateMachineObjectsCount !== null && (
                  <Spacings.Inline alignItems="center">
                    <DotIcon size="small" color="primary" />
                    <Text.Detail isItalic={true}>
                      <FormattedMessage
                        {...messages.objectsInCache}
                        values={{
                          count: cachedStateMachineObjectsCount,
                        }}
                      />
                    </Text.Detail>
                  </Spacings.Inline>
                )}
                <DataTable
                  columns={columnsDefinition}
                  rows={result.results}
                  onRowClick={({ id }) => {
                    props.goToStateMachineDetail(id);
                  }}
                  itemRenderer={(row, column) => {
                    const value = row[column.key];
                    if (!value) return <span />;
                    switch (column.key) {
                      case 'name':
                        return (
                          <span>{value[dataLocale] || NO_VALUE_FALLBACK}</span>
                        );
                      default:
                        return <span>{value}</span>;
                    }
                  }}
                />
              </Spacings.Stack>
            );
          }}
        </StateMachinesListConnector>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
StateMachinesList.displayName = 'StateMachinesList';
StateMachinesList.propTypes = {
  goToStateMachineDetail: PropTypes.func.isRequired,
};

export default StateMachinesList;
