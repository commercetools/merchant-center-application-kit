import React from 'react';
import { shallow } from 'enzyme';
import LocalStoreProvider from '../local-store-provider';
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

const ChildComponent = () => <div />;
ChildComponent.displayName = 'ChildComponent';

const createWrapper = props =>
  shallow(
    <InjectReducer {...props}>
      <ChildComponent />
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
    it('should not render a LocalStoreProvider', () => {
      expect(wrapper).not.toRender(LocalStoreProvider);
    });
    it('should not render children', () => {
      expect(wrapper).not.toRender('ChildComponent');
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
      expect(wrapper).toRender('ChildComponent');
    });
    it('should wrap the children in a LocalStoreProvider', () => {
      expect(wrapper).toRender(LocalStoreProvider);
    });
    it('should provide the plugin name to the LocalStoreProvider', () => {
      expect(wrapper.find(LocalStoreProvider)).toHaveProp('pluginName', 'foo');
    });
  });
});

describe('lifecycle', () => {
  let props;
  let storeOptions;
  describe('mounting', () => {
    describe('when reducer has not been injected yet', () => {
      beforeEach(() => {
        props = createTestProps();
        storeOptions = createTestStore();
        shallow(
          <InjectReducer {...props}>
            <div />
          </InjectReducer>,
          {
            context: {
              store: storeOptions,
            },
          }
        );
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
      describe('when activePlugin is the same as the current mounted plugin', () => {
        beforeEach(() => {
          props = createTestProps({
            activePlugin: props.name,
          });
          storeOptions = createTestStore({
            injectedReducers: { [props.name]: props.reducer },
          });
          shallow(
            <InjectReducer {...props}>
              <div />
            </InjectReducer>,
            {
              context: {
                store: storeOptions,
              },
            }
          );
        });
        it('should not call injectReducer', () => {
          expect(storeOptions.injectReducer).not.toHaveBeenCalled();
        });
        it('should not dispatch ACTIVATE_PLUGIN action', () => {
          expect(storeOptions.dispatch).not.toHaveBeenCalled();
        });
      });
      describe('when activePlugin differs from the current mounted plugin', () => {
        beforeEach(() => {
          props = createTestProps({
            name: 'another-plugin',
            activePlugin: 'foo',
          });
          storeOptions = createTestStore({
            injectedReducers: {
              'another-plugin': props.reducer,
              foo: props.reducer,
            },
          });
          shallow(
            <InjectReducer {...props}>
              <div />
            </InjectReducer>,
            {
              context: {
                store: storeOptions,
              },
            }
          );
        });
        it('should not call injectReducer', () => {
          expect(storeOptions.injectReducer).not.toHaveBeenCalled();
        });
        it('should dispatch ACTIVATE_PLUGIN action', () => {
          expect(storeOptions.dispatch).toHaveBeenCalledWith({
            type: 'ACTIVATE_PLUGIN',
            payload: 'another-plugin',
          });
        });
      });
    });
  });
});
