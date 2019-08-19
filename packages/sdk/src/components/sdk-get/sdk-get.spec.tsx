import { mocked } from 'ts-jest/utils';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as sdkActions from '../../actions';
import { SdkGet, Props } from './sdk-get';
import { Json } from '../../types';

const createTestProps = (custom: Partial<Props> = {}) => ({
  dispatch: jest.fn(() => Promise.resolve()),
  actionCreator: () => sdkActions.get({ uri: '/foo/bar' }),
  actionCreatorArgs: [],
  shouldRefetch: () => false,
  onSuccess: jest.fn(),
  onError: jest.fn(),
  render: jest.fn(() => <div></div>),
  ...custom,
});

describe('rendering', () => {
  let props: Props;
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SdkGet {...props} />);
    wrapper.instance().componentDidMount();
  });
  it('should call render', () => {
    expect(props.render).toHaveBeenCalledWith({
      isLoading: true,
      refresh: expect.any(Function),
      result: undefined,
      error: undefined,
    });
  });
  describe('when refreshing', () => {
    let result: Promise<void | Json>;
    beforeEach(() => {
      result = mocked(props.render).mock.calls[0][0].refresh();
      return result;
    });
    it('should dispatch again', () => {
      expect(props.dispatch).toHaveBeenCalledTimes(2);
    });
    it('should return a promise', () => {
      expect(typeof result.then).toEqual('function');
    });
  });
});

describe('when the component mounts', () => {
  describe('when the request succeeds', () => {
    let wrapper: ShallowWrapper;
    let props: Props;
    const result = { foo: 'bar' };
    beforeEach(() => {
      props = createTestProps({
        dispatch: jest.fn(() => Promise.resolve(result)),
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
    let wrapper: ShallowWrapper;
    let props: Props;
    const error = new Error('foo');
    beforeEach(() => {
      props = createTestProps({
        dispatch: jest.fn(() => Promise.reject(error)),
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
