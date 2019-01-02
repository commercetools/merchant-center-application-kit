import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { renderWithRedux, waitForElement, fireEvent } from '../../test-utils';
import InjectReducers from './inject-reducers';

const Counter = props => (
  <div>
    <p>{`The count is ${props.count}`}</p>
    <button onClick={() => props.increment()} data-testid="increment">
      {'Increment'}
    </button>
  </div>
);
Counter.displayName = 'Counter';
Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};
const ConnectedCounter = connect(
  state => ({ count: state.counter }),
  dispatch => ({ increment: () => dispatch({ type: 'INCREMENT_COUNT' }) })
)(Counter);

const counterReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1;
    default:
      return state;
  }
};
const reducers = { counter: counterReducer };

describe('injecting reducers', () => {
  it('should inject reducers and render count from connected store', async () => {
    const { getByText, getByTestId } = renderWithRedux(
      <InjectReducers id="test" reducers={reducers}>
        <ConnectedCounter />
      </InjectReducers>
    );

    await waitForElement(() => getByText(/The count is 0/i));

    fireEvent.click(getByTestId('increment'));

    await waitForElement(() => getByText(/The count is 1/i));
  });
});
