import React from 'react';
import { shallow } from 'enzyme';
import LocalProvider from '../local-provider';
import { InjectReducer } from './inject-reducer';

const createTestProps = props => ({
  name: 'foo',
  reducer: jest.fn(),
  activePlugin: 'bar',
  ...props,
});

const createTestStore = props => ({
  dispatch: jest.fn(),
  replaceReducer: jest.fn(),
  injectedReducers: {},
  injectReducer: jest.fn(),
  getState: jest.fn(),
  ...props,
});

const createWrapper = props =>
  shallow(
    <InjectReducer {...props}>
      <div />
    </InjectReducer>,
    {
      context: {
        store: createTestStore(),
      },
    }
  );
describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = createWrapper(props);
  });
  describe('when the plugin is not active yet', () => {
    it('should not render a LocalProvider', () => {
      expect(wrapper).not.toRender(LocalProvider);
    });
    it('should not render children', () => {
      expect(wrapper.containsMatchingElement(<div />)).toBe(false);
    });
  });
  describe('when the plugin is active', () => {
    beforeEach(() => {
      props = createTestProps({
        activePlugin: 'foo',
      });
      wrapper = createWrapper(props);
    });
    it('should render children', () => {
      expect(wrapper.containsMatchingElement(<div />)).toBe(true);
    });
    it('should wrap the children in a LocalProvider', () => {
      expect(wrapper).toRender(LocalProvider);
    });
    it('should provide the plugin name to the LocalProvider', () => {
      expect(wrapper.find(LocalProvider)).toHaveProp('plugin', 'foo');
    });
  });
});

describe('lifecycle', () => {
  let props;
  let storeOptions;
  let wrapper;
  describe('mounting', () => {
    describe('when reducer has not been injected yet', () => {
      beforeEach(() => {
        props = createTestProps();
        storeOptions = createTestStore();
        wrapper = shallow(
          <InjectReducer {...props}>
            <div />
          </InjectReducer>,
          {
            context: {
              store: storeOptions,
            },
          }
        );
        wrapper.instance().componentWillMount();
      });
      it('should call injectReducer with reducer name', () => {
        expect(storeOptions.injectReducer).toHaveBeenCalledWith(
          expect.objectContaining({ name: props.name })
        );
      });
      it('should call injectReducer with reducer function', () => {
        expect(storeOptions.injectReducer).toHaveBeenCalledWith(
          expect.objectContaining({ reducer: props.reducer })
        );
      });
      it('should dispatch ACTIVATE_PLUGIN action', () => {
        expect(storeOptions.dispatch).toHaveBeenCalledWith({
          type: 'ACTIVATE_PLUGIN',
          payload: 'foo',
        });
      });
    });
    describe('when reducer has already been initialized', () => {
      beforeEach(() => {
        props = createTestProps();
        storeOptions = createTestStore({
          injectedReducers: { [props.name]: props.reducer },
        });
        wrapper = shallow(
          <InjectReducer {...props}>
            <div />
          </InjectReducer>,
          {
            context: {
              store: storeOptions,
            },
          }
        );
        wrapper.instance().componentWillMount();
      });
      it('should not call injectReducer', () => {
        expect(storeOptions.injectReducer).not.toHaveBeenCalled();
      });
      it('should not dispatch ACTIVATE_PLUGIN action', () => {
        expect(storeOptions.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
