import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  LoadingSpinner,
  Table,
  Spacings,
  Constraints,
  Text,
} from '@commercetools-frontend/ui-kit';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import PageBottomSpacer from '../page-bottom-spacer';
import StateMachinesListConnector from '../state-machines-list-connector';
import messages from './messages';
import styles from './state-machines-list.mod.css';

export const columnsDefinition = [
  {
    key: 'key',
    label: <FormattedMessage {...messages.columnStateMachineKey} />,
    flexGrow: 1,
  },
  {
    key: 'name',
    label: <FormattedMessage {...messages.columnStateMachineName} />,
    flexGrow: 1,
  },
];

const getErrorMessage = error =>
  error.stack || error.message || error.toString();

export class StateMachinesList extends React.Component {
  static displayName = 'StateMachinesList';
  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    // injected
    applicationContext: PropTypes.shape({
      dataLocale: PropTypes.string.isRequired,
    }).isRequired,
  };
  measurementCache = null;
  registerMeasurementCache = cache => {
    this.measurementCache = cache;
  };
  renderStateMachinesRow = (results, { rowIndex, columnKey }) => {
    const value = results[rowIndex][columnKey];

    switch (columnKey) {
      case 'name':
        return value ? (
          <Constraints.Horizontal constraint="m">
            <Text.Wrap>
              {value[this.props.applicationContext.dataLocale] ||
                NO_VALUE_FALLBACK}
            </Text.Wrap>
          </Constraints.Horizontal>
        ) : null;
      default:
        return value;
    }
  };
  render() {
    return (
      <Spacings.Inset scale="m">
        <Spacings.Stack scale="m">
          <Text.Headline elementType="h2">
            <FormattedMessage {...messages.title} />
          </Text.Headline>
          <StateMachinesListConnector projectKey={this.props.projectKey}>
            {({ isLoading, result, error, hasNoResults /* , refresh */ }) => {
              if (isLoading) return <LoadingSpinner />;
              if (error) return <div>{getErrorMessage(error)}</div>;
              if (hasNoResults) {
                return (
                  <div className={styles['empty-results']}>
                    <FormattedMessage {...messages.noResultsText} />
                  </div>
                );
              }
              return (
                <Table
                  columns={columnsDefinition}
                  itemRenderer={item =>
                    this.renderStateMachinesRow(result.results, item)
                  }
                  rowCount={result.count}
                  // onRowClick={(_, rowIndex) =>
                  //   this.handleRowClick(rowIndex, result.results)
                  // }
                  registerMeasurementCache={this.registerMeasurementCache}
                  shouldFillRemainingVerticalSpace={true}
                  items={result.results}
                >
                  {/* TODO: add <Pagination> component */}
                  <PageBottomSpacer />
                </Table>
              );
            }}
          </StateMachinesListConnector>
        </Spacings.Stack>
      </Spacings.Inset>
    );
  }
}

export default withApplicationContext()(StateMachinesList);
