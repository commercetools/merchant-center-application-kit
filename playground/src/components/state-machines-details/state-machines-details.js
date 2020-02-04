import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useShowApiErrorNotification } from '@commercetools-frontend/actions-global';
import { ListIcon, CheckBoldIcon } from '@commercetools-uikit/icons';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Grid from '@commercetools-uikit/grid';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import { fetchStateMachine } from './actions';

const initialState = {
  isLoading: true,
  error: null,
  data: null,
};

// NOTE: using `useEffect` for asynchronously update the state, thus re-rendering
// the component, has currently a limitation when testing the component, as it throws
// a warning about `act`. This will be fixed in react@16.9.
// In the meantime we can use a plain old stateful class component.
class StateMachinesDetailsFetcher extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    dataLocale: PropTypes.string.isRequired,
    fetcher: PropTypes.func.isRequired,
    showApiErrorNotification: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };
  state = initialState;
  isUnmounting = false;
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    } else if (prevProps.dataLocale !== this.props.dataLocale) {
      this.fetchData(this.props.id);
    }
  }
  componentWillUnmount() {
    this.isUnmounting = true;
  }
  fetchData = id => {
    this.setState({ isLoading: true, data: null, error: null });
    this.props.fetcher(id).then(
      data => {
        !this.isUnmounting &&
          this.setState({ isLoading: false, data, error: null });
      },
      error => {
        !this.isUnmounting &&
          this.setState({ isLoading: false, data: null, error });
        this.props.showApiErrorNotification({ errors: [error] });
      }
    );
  };
  render() {
    return this.props.children(this.state);
  }
}

const StateMachinesDetails = props => {
  const dataLocale = useApplicationContext(context => context.dataLocale);
  const dispatch = useDispatch();
  const fetcher = React.useCallback(
    (...args) => dispatch(fetchStateMachine(...args)),
    [dispatch]
  );
  const showApiErrorNotification = useShowApiErrorNotification();

  return (
    <StateMachinesDetailsFetcher
      id={props.id}
      dataLocale={dataLocale}
      fetcher={fetcher}
      showApiErrorNotification={showApiErrorNotification}
    >
      {({ isLoading, data, error }) => {
        if (isLoading) {
          return <LoadingSpinner />;
        }
        if (error) {
          return null;
        }
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
                <Text.Headline as="h2">
                  {(data.name && data.name[dataLocale]) || 'n/a'}
                </Text.Headline>
                <Text.Detail>{data.key}</Text.Detail>
              </Spacings.Stack>
              <Constraints.Horizontal constraint="m">
                <Grid
                  gridGap="16px"
                  gridAutoColumns="1fr"
                  gridTemplateColumns="repeat(2, 1fr)"
                >
                  <Text.Body>{'Type'}</Text.Body>
                  <Text.Body>{data.type}</Text.Body>
                  <Text.Body>{'Built In'}</Text.Body>
                  <span>{data.builtIn ? <CheckBoldIcon /> : ''}</span>
                  <Text.Body>{'Initial'}</Text.Body>
                  <span>{data.initial ? <CheckBoldIcon /> : ''}</span>
                </Grid>
              </Constraints.Horizontal>
            </Spacings.Stack>
          </Spacings.Inset>
        );
      }}
    </StateMachinesDetailsFetcher>
  );
};
StateMachinesDetails.displayName = 'StateMachinesDetails';
StateMachinesDetails.propTypes = {
  id: PropTypes.string.isRequired,
  backToListPath: PropTypes.string.isRequired,
};

export default StateMachinesDetails;
