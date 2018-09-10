import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { withUser } from '@commercetools-frontend/application-shell';
import {
  LoadingSpinner,
  Table,
  Spacings,
  Constraints,
  Text,
} from '@commercetools-frontend/ui-kit';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import PageBottomSpacer from '../page-bottom-spacer';
import ChannelsListConnector from '../channels-list-connector';
import messages from './messages';
import styles from './channels-list.mod.css';

export const columnsDefinition = [
  {
    key: 'key',
    label: <FormattedMessage {...messages.columnChannelKey} />,
    flexGrow: 1,
  },
  {
    key: 'name',
    label: <FormattedMessage {...messages.columnChannelName} />,
    flexGrow: 1,
  },
];

const getErrorMessage = error =>
  error.stack || error.message || error.toString();

export class ChannelsList extends React.Component {
  static displayName = 'ChannelsList';
  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    // withUser
    language: PropTypes.string.isRequired,
  };
  measurementCache = null;
  registerMeasurementCache = cache => {
    this.measurementCache = cache;
  };
  renderChannelRow = (results, { rowIndex, columnKey }) => {
    const value = results[rowIndex][columnKey];

    switch (columnKey) {
      case 'name':
        return value ? (
          <Constraints.Horizontal constraint="m">
            <Text.Wrap>
              {value[this.props.language] || NO_VALUE_FALLBACK}
            </Text.Wrap>
          </Constraints.Horizontal>
        ) : (
          NO_VALUE_FALLBACK
        );
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
          <ChannelsListConnector
            projectKey={this.props.projectKey}
            language={this.props.language}
          >
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
                    this.renderChannelRow(result.results, item)
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
          </ChannelsListConnector>
        </Spacings.Stack>
      </Spacings.Inset>
    );
  }
}

export default compose(
  withUser(userData => ({ language: userData.user.language }))
)(ChannelsList);
