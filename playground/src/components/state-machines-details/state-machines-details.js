import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useShowApiErrorNotification } from '@commercetools-frontend/actions-global';
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
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import FetchStateQuery from './fetch-state.ctp.graphql';

const StateMachinesDetails = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const showApiErrorNotification = useShowApiErrorNotification();

  const { data, error, loading } = useMcQuery(FetchStateQuery, {
    variables: {
      id: props.id,
      locale: dataLocale,
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

  useEffect(() => {
    if (error) {
      showApiErrorNotification({ errors: [error] });
    }
  }, [error, showApiErrorNotification]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return null;
  }

  const { name, key, type, builtIn, initial } = data.state;
  return (
    <Spacings.Inset scale="m">
      <Spacings.Stack scale="l">
        <FlatButton
          as={Link}
          icon={<ListIcon />}
          label="Back to list"
          to={props.backToListPath}
        />
        <Spacings.Stack scale="xs">
          <Text.Headline as="h2">{name || 'n/a'}</Text.Headline>
          <Text.Detail>{key}</Text.Detail>
        </Spacings.Stack>
        <Constraints.Horizontal max={7}>
          <Grid
            gridGap="16px"
            gridAutoColumns="1fr"
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Text.Body>{'Type'}</Text.Body>
            <Text.Body>{type}</Text.Body>
            <Text.Body>{'Built In'}</Text.Body>
            <span>{builtIn ? <CheckBoldIcon /> : ''}</span>
            <Text.Body>{'Initial'}</Text.Body>
            <span>{initial ? <CheckBoldIcon /> : ''}</span>
          </Grid>
        </Constraints.Horizontal>
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
