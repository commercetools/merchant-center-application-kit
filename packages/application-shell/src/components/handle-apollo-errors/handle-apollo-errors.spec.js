import React from 'react';
import PropTypes from 'prop-types';
import { renderWithRedux, waitForElement, fireEvent } from '../../test-utils';
import handleApolloErrors from './handle-apollo-errors';

const createGraphqlResultProps = props => ({
  isLoading: true,
  data: null,
  error: null,
  ...props,
});

const Test = props => {
  if (props.user.data) {
    return <span>{`Status: ${props.user.data.ok}`}</span>;
  }
  return <span>{'loading'}</span>;
};
Test.displayName = 'Test';
Test.propTypes = {
  user: PropTypes.shape({ data: PropTypes.shape({ ok: PropTypes.bool }) }),
};

class QueryController extends React.Component {
  static displayName = 'QueryController';
  static propTypes = {
    name: PropTypes.string.isRequired,
    queryResult: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };
  state = {
    result: createGraphqlResultProps(),
  };
  triggerQuery = () => {
    this.setState({
      result: { ...this.props.queryResult, isLoading: false },
    });
  };
  render() {
    return (
      <React.Fragment>
        <button data-testid={this.props.name} onClick={this.triggerQuery}>
          {'query'}
        </button>
        {React.cloneElement(this.props.children, {
          [this.props.name]: this.state.result,
        })}
      </React.Fragment>
    );
  }
}

describe('given the graphql queries for "user"', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });
  const WithApolloErrorHandling = handleApolloErrors(['user'])(Test);
  describe('when the "user" query fails', () => {
    it('should dispatch notification error', async () => {
      const error = new Error('Oops');
      const { getByText, getByTestId } = renderWithRedux(
        <QueryController name="user" queryResult={{ data: null, error }}>
          <WithApolloErrorHandling />
        </QueryController>
      );
      await waitForElement(() => getByText('loading'));

      fireEvent.click(getByTestId('user'));

      // See error notification
      await waitForElement(() =>
        getByText(/Sorry, but there seems to be something wrong./i)
      );
    });
  });
  describe('when no query fails', () => {
    it('should not dispatch any notification error', async () => {
      const { getByText, getByTestId } = renderWithRedux(
        <QueryController name="user" queryResult={{ data: { ok: true } }}>
          <WithApolloErrorHandling />
        </QueryController>
      );
      await waitForElement(() => getByText('loading'));

      fireEvent.click(getByTestId('user'));

      await waitForElement(() => getByText(/Status: true/i));
    });
  });
});
