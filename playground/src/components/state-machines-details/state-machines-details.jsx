import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { InfoModalPage } from '@commercetools-frontend/application-components';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import Constraints from '@commercetools-uikit/constraints';
import Grid from '@commercetools-uikit/grid';
import { CheckBoldIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { getErrorMessage } from '../../utils/get-error-message';
import FetchStateQuery from './fetch-state.ctp.graphql';

const getStateName = (state, dataLocale, projectLanguages) =>
  formatLocalizedString(
    { name: transformLocalizedFieldToLocalizedString(state.nameAllLocales) },
    {
      key: 'name',
      locale: dataLocale,
      fallbackOrder: projectLanguages,
      fallback: NO_VALUE_FALLBACK,
    }
  ) || 'n/a';

const StateMachinesDetails = (props) => {
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));

  const { data, error, loading } = useMcQuery(FetchStateQuery, {
    variables: {
      id: params.id,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return (
    <InfoModalPage
      isOpen
      title={
        data ? getStateName(data.state, dataLocale, projectLanguages) : 'asd'
      }
      onClose={props.goToStateMachinesList}
    >
      <Spacings.Stack scale="l">
        {loading && <LoadingSpinner />}
        {error && (
          <ContentNotification type="error">
            <Text.Body>{getErrorMessage(error)}</Text.Body>
          </ContentNotification>
        )}
        {data && (
          <Constraints.Horizontal max={7}>
            <Grid
              gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <Text.Body>{'Key'}</Text.Body>
              <Text.Body>{data.state.key}</Text.Body>
              <Text.Body>{'Type'}</Text.Body>
              <Text.Body>{data.state.type}</Text.Body>
              <Text.Body>{'Built In'}</Text.Body>
              <span>{data.state.builtIn ? <CheckBoldIcon /> : ''}</span>
              <Text.Body>{'Initial'}</Text.Body>
              <span>{data.state.initial ? <CheckBoldIcon /> : ''}</span>
            </Grid>
          </Constraints.Horizontal>
        )}
      </Spacings.Stack>
    </InfoModalPage>
  );
};
StateMachinesDetails.displayName = 'StateMachinesDetails';
StateMachinesDetails.propTypes = {
  goToStateMachinesList: PropTypes.func.isRequired,
};

export default StateMachinesDetails;
