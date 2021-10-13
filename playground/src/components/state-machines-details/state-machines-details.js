import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GtmContext,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { ListIcon, CheckBoldIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Grid from '@commercetools-uikit/grid';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { ErrorMessage } from '@commercetools-uikit/messages';
import FetchStateQuery from './fetch-state.ctp.graphql';

const getErrorMessage = (error) =>
  error.stack || error.message || error.toString();

const getStateName = (state, dataLocale, projectLanguages) =>
  formatLocalizedString(
    { name: transformLocalizedFieldToLocalizedString(state.nameAllLocales) },
    { key: 'name', locale: dataLocale, fallbackOrder: projectLanguages }
  ) || 'n/a';

const StateMachinesDetails = (props) => {
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));

  const { data, error, loading } = useMcQuery(FetchStateQuery, {
    variables: {
      id: props.id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  // This tracking is just testing purposes
  const { track } = useContext(GtmContext);
  useEffect(() => {
    track('rendered', 'State machine details');
  }, [track]);

  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="l">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>}
        {data && (
          <>
            <FlatButton
              as={Link}
              icon={<ListIcon />}
              label="Back to list"
              to={props.backToListPath}
            />
            <Spacings.Stack scale="xs">
              <Text.Headline as="h2">
                {getStateName(data?.state, dataLocale, projectLanguages)}
              </Text.Headline>
              <Text.Detail>{data.state.key}</Text.Detail>
            </Spacings.Stack>
            <Constraints.Horizontal max={7}>
              <Grid
                gridGap="16px"
                gridAutoColumns="1fr"
                gridTemplateColumns="repeat(2, 1fr)"
              >
                <Text.Body>{'Type'}</Text.Body>
                <Text.Body>{data.state.type}</Text.Body>
                <Text.Body>{'Built In'}</Text.Body>
                <span>{data.state.builtIn ? <CheckBoldIcon /> : ''}</span>
                <Text.Body>{'Initial'}</Text.Body>
                <span>{data.state.initial ? <CheckBoldIcon /> : ''}</span>
              </Grid>
            </Constraints.Horizontal>
          </>
        )}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
StateMachinesDetails.displayName = 'StateMachinesDetails';
StateMachinesDetails.propTypes = {
  id: PropTypes.string.isRequired,
  backToListPath: PropTypes.string.isRequired,
};

export default StateMachinesDetails;
