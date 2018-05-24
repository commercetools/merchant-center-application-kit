import React from 'react';
import { shallow } from 'enzyme';
import { reportErrorToSentry } from '@commercetools-local/sentry';
import createL10NInjector from './create-l10n-injector';

jest.mock('@commercetools-local/sentry');

const mockData = {
  en: {
    1: 'sugar',
    2: 'fruit',
    3: 'gummy-bears',
  },
  de: {
    1: 'zucker',
    2: 'obst',
    3: 'gummibär',
  },
};

const loadLocalesMock = jest.fn((locale, cb) => cb(null, mockData[locale]));
const withCandies = createL10NInjector({
  displayName: 'withCandies',
  propKey: 'candies',
  propLoadingKey: 'isLoadingCandies',
  loadLocale: loadLocalesMock,
});

const Foo = () => <div />;
Foo.displayName = 'Foo';

describe('rendering', () => {
  let WrappedComponent;
  let wrapper;
  beforeEach(() => {
    loadLocalesMock.mockClear();
    WrappedComponent = withCandies(props => props.locale)(Foo);
    wrapper = shallow(<WrappedComponent locale="en" />);
  });
  describe('wrapped component', () => {
    beforeEach(() => {
      wrapper = shallow(
        <div>
          <WrappedComponent locale="en" />
        </div>
      );
    });
    it('should render component with "withCandies" displayName', () => {
      expect(wrapper).toRender('withCandies(Foo)');
    });
  });
  describe('initial state', () => {
    it('should set isLoadingCandies to true', () => {
      expect(wrapper).toHaveState('isLoadingCandies', true);
    });
    it('should set candies as empty object', () => {
      expect(wrapper).toHaveState('candies', {});
    });
  });
  it('should pass candies as prop to wrapped component', () => {
    expect(wrapper).toHaveProp('candies');
  });
});

describe('lifecycle', () => {
  let wrapper;
  beforeAll(() => {
    const WrappedComponent = withCandies(props => props.locale)(Foo);
    wrapper = shallow(<WrappedComponent locale="en" />);
  });
  describe('componentDidMount', () => {
    beforeAll(() => {
      loadLocalesMock.mockClear();
      wrapper.instance().componentDidMount();
    });
    it('should load candies', () => {
      expect(loadLocalesMock).toHaveBeenCalledTimes(1);
    });
    it('should set isLoadingCandies to false', () => {
      expect(wrapper).toHaveState('isLoadingCandies', false);
    });
    it('should set candies with loaded list', () => {
      expect(wrapper).toHaveState(
        'candies',
        expect.objectContaining({
          1: 'sugar',
          2: 'fruit',
          3: 'gummy-bears',
        })
      );
    });
  });
  describe('componentWillReceiveProps', () => {
    describe('locale changes', () => {
      beforeAll(() => {
        loadLocalesMock.mockClear();
        wrapper.instance().UNSAFE_componentWillReceiveProps({ locale: 'de' });
      });
      it('should load candies', () => {
        expect(loadLocalesMock).toHaveBeenCalledTimes(1);
      });
      it('should set isLoadingCandies to false', () => {
        expect(wrapper).toHaveState('isLoadingCandies', false);
      });
      it('should set candies with loaded list', () => {
        expect(wrapper).toHaveState(
          'candies',
          expect.objectContaining({
            1: 'zucker',
            2: 'obst',
            3: 'gummibär',
          })
        );
      });
    });
    describe('locale does not change', () => {
      beforeAll(() => {
        loadLocalesMock.mockClear();
        wrapper.instance().UNSAFE_componentWillReceiveProps({ locale: 'en' });
      });
      it('should not load candies', () => {
        expect(loadLocalesMock).toHaveBeenCalledTimes(0);
      });
    });
  });
});

describe('when there is an error loading L10n data', () => {
  let wrapper;
  const error = new Error('unknown locale');
  beforeEach(() => {
    const loadLocalesErrorMock = jest.fn((locale, cb) =>
      cb(error, mockData[locale])
    );
    const l10nInjector = createL10NInjector({
      displayName: 'l10nInjector',
      propKey: 'errors',
      propLoadingKey: 'l10nInjector',
      loadLocale: loadLocalesErrorMock,
    });
    const WrappedComponent = l10nInjector(props => props.locale)(Foo);
    wrapper = shallow(<WrappedComponent locale="es" />);
    wrapper.instance().componentDidMount();
  });

  it('should call reportErrorToSentry', () => {
    expect(reportErrorToSentry).toHaveBeenCalledTimes(1);
  });

  it('should call reportErrorToSentry with the error', () => {
    expect(reportErrorToSentry).toHaveBeenCalledWith(error);
  });
});
