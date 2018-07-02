import React from 'react';
import { shallow } from 'enzyme';
import { SdkGet } from './sdk-get';

const createTestProps = custom => ({
  dispatch: jest.fn(() => Promise.resolve()),
  render: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SdkGet {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should call render', () => {
    expect(props.render).toHaveBeenCalledWith({
      isLoading: true,
      refresh: expect.any(Function),
      result: null,
      error: null,
    });
  });
  describe('when refreshing', () => {
    let result;
    beforeEach(() => {
      result = props.render.mock.calls[0][0].refresh();
      return result;
    });
    it('should dispatch again', () => {
      expect(props.dispatch).toHaveBeenCalledTimes(2);
    });
    describe('refresh', () => {
      it('should return a promise', () => {
        expect(typeof result.then).toEqual('function');
      });
    });
  });
});

describe('when the component mounts', () => {
  describe('when the request succeeds', () => {
    let wrapper;
    let props;
    const result = { foo: 'bar' };
    beforeEach(() => {
      props = createTestProps({
        dispatch: jest.fn(() => Promise.resolve(result)),
        actionCreator: (...args) => ({ type: 'fetch', payload: args }),
        actionCreatorArgs: ['foo'],
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });
      wrapper = shallow(<SdkGet {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should fetch with the passed args', () => {
      expect(props.dispatch).toHaveBeenCalledWith(
        props.actionCreator(...props.actionCreatorArgs)
      );
    });
    it('should call onSuccess with the result', () => {
      expect(props.onSuccess).toHaveBeenCalledWith(result);
    });
    it('should not call onError', () => {
      expect(props.onError).not.toHaveBeenCalled();
    });
  });
  describe('when the request fails', () => {
    let wrapper;
    let props;
    const error = new Error('foo');
    beforeEach(() => {
      props = createTestProps({
        dispatch: jest.fn(() => Promise.reject(error)),
        actionCreator: (...args) => ({ type: 'fetch', payload: args }),
        actionCreatorArgs: ['foo'],
        onSuccess: jest.fn(),
        onError: jest.fn(),
      });
      wrapper = shallow(<SdkGet {...props} />);
      wrapper.instance().componentDidMount();
    });
    it('should not call onSuccess', () => {
      expect(props.onSuccess).not.toHaveBeenCalled();
    });
    it('should call onError with the result', () => {
      expect(props.onError).toHaveBeenCalledWith(error);
    });
  });
});
