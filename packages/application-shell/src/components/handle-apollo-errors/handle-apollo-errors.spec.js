import React from 'react';
import PropTypes from 'prop-types';
import { renderAppWithRedux, fireEvent } from '../../test-utils';
import handleApolloErrors from './handle-apollo-errors';

const createGraphqlResultProps = (props) => ({
  isLoading: true,
  data: null,
  error: null,
  ...props,
});

const Test = (props) => {
  if (props.user.data) {
    return <span>{`Status: ${props.user.data.ok}`}</span>;
  }
  return <span>{'loading'}</span>;
};
Test.displayName = 'Test';
Test.propTypes = {
  user: PropTypes.shape({ data: PropTypes.shape({ ok: PropTypes.bool }) }),
};

const QueryController = (props) => {
  const [result, setResult] = React.useState(createGraphqlResultProps());
  const triggerQuery = () => {
    setResult({ ...props.queryResult, isLoading: false });
  };
  return (
    <>
      <button data-testid={props.name} onClick={triggerQuery}>
        {'query'}
      </button>
      {React.cloneElement(props.children, {
        [props.name]: result,
      })}
    </>
  );
};
QueryController.propTypes = {
  name: PropTypes.string.isRequired,
  queryResult: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

describe('given the graphql queries for "user"', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });
  const WithApolloErrorHandling = handleApolloErrors(['user'])(Test);
  describe('when the "user" query fails', () => {
    it('should dispatch notification error', async () => {
      const error = new Error('Oops');
      const rendered = renderAppWithRedux(
        <QueryController name="user" queryResult={{ data: null, error }}>
          <WithApolloErrorHandling />
        </QueryController>
      );
      await rendered.findByText('loading');
      fireEvent.click(rendered.getByTestId('user'));
      // See error notification
      await rendered.findByText(
        /Sorry, but there seems to be something wrong./i
      );
    });
  });
  describe('when no query fails', () => {
    it('should not dispatch any notification error', async () => {
      const rendered = renderAppWithRedux(
        <QueryController name="user" queryResult={{ data: { ok: true } }}>
          <WithApolloErrorHandling />
        </QueryController>
      );
      await rendered.findByText('loading');
      fireEvent.click(rendered.getByTestId('user'));
      await rendered.findByText(/Status: true/i);
    });
  });
});
