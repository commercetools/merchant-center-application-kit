import React from 'react';
import { shallow } from 'enzyme';
import * as storage from '@commercetools-local/utils/storage';
import { __LOCAL } from '../../middleware/add-plugin-to-notification/constants';
import { LocalStoreProvider, mapStateToProps } from './local-store-provider';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  hasStateForActivePlugin: false,
  plugin: 'mcng-foo',
  user: {
    id: '1',
    firstName: 'John',
    numberFormat: 'en',
    language: 'en',
  },
  project: {
    permissions: {},
    countries: [],
    languages: [],
    currencies: [],
    key: 'foo',
    settings: {},
    expired: false,
  },
  ...props,
});

describe('LocalStoreProvider', () => {
  let props;
  let wrapper;
  describe('rendering', () => {
    describe('when hasStateForActivePlugin is false', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store: {} } }
        );
      });
      it('should render null', () => {
        expect(wrapper.type()).toBe(null);
      });
    });
    describe('when hasStateForActivePlugin is true', () => {
      beforeEach(() => {
        props = createTestProps({ hasStateForActivePlugin: true });
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store: {} } }
        );
      });
      it('should render children', () => {
        expect(wrapper).toContainReact(<div />);
      });
    });
  });
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  describe('shouldComponentUpdate', () => {
    let nextProps;
    describe('when pluginName is defined', () => {
      describe('when hasStateForActivePlugin is true', () => {
        beforeEach(() => {
          props = createTestProps();
          nextProps = {
            pluginName: 'mcng-foo',
            hasStateForActivePlugin: true,
          };
          wrapper = shallow(
            <LocalStoreProvider {...props}>
              <div />
            </LocalStoreProvider>,
            { context: { store: {} } }
          );
        });
        it('should return true', () => {
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(
            true
          );
        });
      });
      describe('when hasStateForActivePlugin is false', () => {
        beforeEach(() => {
          props = createTestProps();
          nextProps = {
            pluginName: 'mcng-foo',
            hasStateForActivePlugin: false,
          };
          wrapper = shallow(
            <LocalStoreProvider {...props}>
              <div />
            </LocalStoreProvider>,
            { context: { store: {} } }
          );
        });
        it('should return false', () => {
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(
            false
          );
        });
      });
    });
    describe('when pluginName is not defined', () => {
      beforeEach(() => {
        props = createTestProps();
        nextProps = {
          pluginName: undefined,
          hasStateForActivePlugin: true,
        };
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store: {} } }
        );
      });
      it('should return false', () => {
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
      });
    });
  });
  describe('getChildContext', () => {
    let store;
    beforeEach(() => {
      props = createTestProps();
      store = {};
      wrapper = shallow(
        <LocalStoreProvider {...props}>
          <div />
        </LocalStoreProvider>,
        { context: { store } }
      );
    });
    it('should not return reference to store that is already in context', () => {
      expect(wrapper.instance().getChildContext().store).not.toBe(store);
    });
    it('should return store scoped for local plugin', () => {
      expect(wrapper.instance().getChildContext()).toEqual({
        store: expect.objectContaining({ isLocal: true }),
      });
    });
  });
  describe('createLocalStore', () => {
    let store;
    let localStore;
    beforeEach(() => {
      store = {
        dispatch: jest.fn(),
        getState: jest.fn(() => ({ 'mcng-foo': { thisIsTheFooPlugin: true } })),
        replaceReducer: jest.fn(),
        subscribe: jest.fn(),
      };
    });
    describe('dispatch', () => {
      beforeEach(() => {
        props = createTestProps({ pluginName: 'mcng-foo' });
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store } }
        );
        localStore = wrapper.instance().createLocalStore(store, props);
        localStore.dispatch({ type: 'DO_SOMETHING', payload: 'BAH' });
      });
      it('should wrap action into a LOCAL action type', () => {
        expect(store.dispatch).toHaveBeenCalledWith({
          type: __LOCAL,
          payload: { type: 'DO_SOMETHING', payload: 'BAH' },
          meta: { plugin: 'mcng-foo' },
        });
      });
    });
    describe('getState', () => {
      let localState;
      beforeEach(() => {
        storage.get.mockReturnValueOnce('de').mockReturnValueOnce(false);
        props = createTestProps({ pluginName: 'mcng-foo' });
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store } }
        );
        localStore = wrapper.instance().createLocalStore(store, props);
        localState = localStore.getState();
      });
      it('should return state slice of plugin', () => {
        expect(localState).toEqual(
          expect.objectContaining({
            thisIsTheFooPlugin: true,
          })
        );
      });
      it('should inject globalAppState', () => {
        expect(localState).toEqual(
          expect.objectContaining({
            globalAppState: {
              language: 'de',
              locale: props.user.language,
              isForcedMenuOpen: false,
              user: {
                id: props.user.id,
                firstName: props.user.firstName,
                numberFormat: props.user.numberFormat,
              },
              permissions: props.project.permissions,
              countries: props.project.countries,
              languages: props.project.languages,
              currencies: props.project.currencies,
              projectKey: props.project.key,
              baseSettings: props.project.baseSettings,
              projectSettings: props.project.settings,
              projectExpired: props.project.expired,
            },
          })
        );
      });
    });
    describe('replaceReducer', () => {
      beforeEach(() => {
        props = createTestProps({ pluginName: 'mcng-foo' });
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store } }
        );
        localStore = wrapper.instance().createLocalStore(store, props);
      });
      it('should throw an error', () => {
        expect(() => localStore.replaceReducer()).toThrow(
          'May not be called from plugin'
        );
      });
      it('should not call original store replaceReducer', () => {
        expect(store.replaceReducer).not.toHaveBeenCalled();
      });
    });
    describe('subscribe', () => {
      beforeEach(() => {
        props = createTestProps({ pluginName: 'mcng-foo' });
        wrapper = shallow(
          <LocalStoreProvider {...props}>
            <div />
          </LocalStoreProvider>,
          { context: { store } }
        );
        localStore = wrapper.instance().createLocalStore(store, props);
        localStore.subscribe(1, 2);
      });
      it('should call original store replaceReducer', () => {
        expect(store.subscribe).toHaveBeenCalledWith(1, 2);
      });
    });
  });
});

describe('mapStateToProps', () => {
  describe('hasStateForActivePlugin', () => {
    it('should be true when there is state for the plugin', () => {
      const state = { 'mcng-dashboard': {} };
      const ownProps = { pluginName: 'mcng-dashboard' };
      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.hasStateForActivePlugin).toBe(true);
    });
    it('should be false when there is no state for the plugin', () => {
      const state = { 'mcng-dashboard': {} };
      const ownProps = { pluginName: 'mcng-products' };
      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.hasStateForActivePlugin).toBe(false);
    });
  });
});
