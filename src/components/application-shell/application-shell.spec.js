import React from 'react';
import { shallow } from 'enzyme';
import { ReconfigureFlopFlip } from '@flopflip/react-broadcast';
import { DOMAINS } from '@commercetools-local/constants';
import { reportErrorToSentry } from '@commercetools-local/sentry';
import ConfigureIntlProvider from '../configure-intl-provider';
import ProjectContainer from '../project-container';
import FetchUser from '../fetch-user';
import NavBar from '../navbar';
import ApplicationShell, {
  RestrictedApplication,
  UnrestrictedApplication,
  extractLanguageFromLocale,
} from './application-shell';

jest.mock('@commercetools-local/storage');
jest.mock('@commercetools-local/sentry');

const createTestProps = props => ({
  i18n: {
    en: { title: 'Title en' },
    'en-US': { title: 'Title' },
    de: { title: 'Titel' },
  },
  configuration: {},
  trackingEventWhitelist: {},
  render: jest.fn(),
  notificationsByDomain: {
    global: [],
    page: [],
    side: [],
  },
  showNotification: jest.fn(),
  mapPluginNotificationToComponent: jest.fn(),
  showApiErrorNotification: jest.fn(),
  showUnexpectedErrorNotification: jest.fn(),
  onRegisterErrorListeners: jest.fn(),
  INTERNAL__isApplicationFallback: false,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ApplicationShell {...props} />);
  });
  describe('providers', () => {
    it('should pass "configuration" to <ConfigurationProvider>', () => {
      expect(wrapper.find('ConfigurationProvider')).toHaveProp(
        'configuration',
        props.configuration
      );
    });
  });
  describe('trackers', () => {
    it('should render <GtmBooter> below <Router>', () => {
      expect(wrapper).toRender('Router > GtmBooter');
    });
    it('should pass "trackingEventWhitelist" to <GtmBooter>', () => {
      expect(wrapper.find('GtmBooter')).toHaveProp(
        'trackingEventWhitelist',
        props.trackingEventWhitelist
      );
    });
    it('should render <Switch> after track components', () => {
      expect(wrapper).toRender('GtmBooter > Switch');
    });
  });
  it('should render <Route> for "/logout"', () => {
    expect(wrapper).toRender({ path: '/logout' });
  });

  describe('<Authenticated>', () => {
    let routeRenderWrapper;
    let authRenderWrapper;
    beforeEach(() => {
      routeRenderWrapper = shallow(
        <div>
          {wrapper
            .find('Switch > Route')
            .last()
            .prop('render')()}
        </div>
      );
    });
    describe('when user is authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = shallow(
          <div>
            {routeRenderWrapper.find('Authenticated').prop('children')({
              isAuthenticated: true,
            })}
          </div>
        );
      });
      it('should render <RestrictedApplication> after track components', () => {
        expect(authRenderWrapper).toRender('RestrictedApplication');
      });
    });

    describe('when user is not authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = shallow(
          <div>
            {routeRenderWrapper.find('Authenticated').prop('children')({
              isAuthenticated: false,
            })}
          </div>
        );
      });
      it('should pass "locale" to <ConfigureIntlProvider>', () => {
        expect(authRenderWrapper.find(ConfigureIntlProvider)).toHaveProp(
          'locale',
          'en-US'
        );
      });
      it('should pass "messages" to <ConfigureIntlProvider>', () => {
        expect(authRenderWrapper.find(ConfigureIntlProvider)).toHaveProp(
          'messages',
          { title: 'Title en' }
        );
      });
      it('should render <UnrestrictedApplication> after track components', () => {
        expect(authRenderWrapper).toRender('UnrestrictedApplication');
      });
    });
  });
});
describe('<RestrictedApplication>', () => {
  let props;
  let wrapper;
  let userData;
  describe('rendering', () => {
    beforeEach(() => {
      props = createTestProps();
      userData = {
        isLoading: false,
        user: {
          id: 'u1',
          email: 'john.snow@got.com',
          gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
          firstName: 'John',
          lastName: 'Snow',
          availableProjects: [],
          language: 'en-US',
          launchdarklyTrackingId: '123',
          launchdarklyTrackingGroup: 'ct',
          launchdarklyTrackingTeam: ['abc', 'def'],
        },
      };
      wrapper = shallow(<RestrictedApplication {...props} />)
        .find(FetchUser)
        .renderProp('children', userData);
    });
    it('should match layout structure', () => {
      expect(wrapper).toMatchSnapshot();
    });
    describe('when fetching the user returns an error', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        props = createTestProps();
        userData = {
          isLoading: false,
          error: new Error('Failed to fetch'),
        };
        wrapper = shallow(<RestrictedApplication {...props} />)
          .find(FetchUser)
          .renderProp('children', userData);
      });
      it('should pass "locale" to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
          'locale',
          'en-US'
        );
      });
      it('should render <ErrorApologizer>', () => {
        expect(wrapper).toRender('ErrorApologizer');
      });
      it('should report error to sentry', () => {
        expect(reportErrorToSentry).toHaveBeenCalledWith(
          new Error('Failed to fetch'),
          {}
        );
      });
    });
    it('should pass user "locale" to <ConfigureIntlProvider>', () => {
      expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
        'locale',
        userData.user.language
      );
    });
    it('should pass "messages" to <ConfigureIntlProvider>', () => {
      expect(wrapper.find(ConfigureIntlProvider)).toHaveProp('messages', {
        title: 'Title en',
      });
    });
    describe('layout', () => {
      it('should render "global-notifications" container inside "app-layout"', () => {
        expect(wrapper).toRender('.app-layout > .global-notifications');
      });
      it('should render "header" element inside "app-layout"', () => {
        expect(wrapper).toRender('.app-layout > header');
      });
      it('should render "aside" element inside "app-layout"', () => {
        expect(wrapper).toRender('.app-layout > aside');
      });
      it('should render "main" container inside "app-layout"', () => {
        expect(wrapper).toRender('.app-layout > .main');
      });
      it('should mark "main" container with "main" role', () => {
        expect(wrapper).toRender('.app-layout > .main[role="main"]');
      });
    });
    it('should render GLOBAL <NotificationsList>', () => {
      expect(wrapper.find('NotificationsList').at(0)).toHaveProp(
        'domain',
        DOMAINS.GLOBAL
      );
    });
    it('should render PAGE <NotificationsList>', () => {
      expect(wrapper.find('NotificationsList').at(1)).toHaveProp(
        'domain',
        DOMAINS.PAGE
      );
    });
    it('should render SIDE <NotificationsList>', () => {
      expect(wrapper.find('NotificationsList').at(2)).toHaveProp(
        'domain',
        DOMAINS.SIDE
      );
    });
    it('should render <AppBar> below header element', () => {
      expect(wrapper).toRender('header > AppBar');
    });
    it('should render <WithProjectKey> below aside element', () => {
      expect(wrapper.find('aside > WithProjectKey')).toHaveProp(
        'user',
        userData.user
      );
    });
    describe('<NavBar>', () => {
      beforeEach(() => {
        wrapper = wrapper.find('aside > WithProjectKey').renderProp('render', {
          routerProps: { location: {} },
          projectKey: 'foo-1',
        });
      });
      it('should render <NavBar> inside <WithProjectKey> below aside element', () => {
        expect(wrapper).toRender(NavBar);
      });
      it('should pass the projectKey matched from the URL', () => {
        expect(wrapper.find(NavBar)).toHaveProp('projectKey', 'foo-1');
      });
      it('should pass "useFullRedirectsForLinks"', () => {
        expect(wrapper.find(NavBar)).toHaveProp(
          'useFullRedirectsForLinks',
          props.INTERNAL__isApplicationFallback
        );
      });
    });
    it('should render <Route> for "/account"', () => {
      expect(wrapper.find('.main')).toRender({
        path: '/account',
        render: props.render,
      });
    });
    it('should render <Route> for redirect to "/account"', () => {
      expect(wrapper.find('.main')).toRender({ to: '/account/profile' });
    });
    it('should render <Route> matching exact ":projectKey" path', () => {
      expect(wrapper.find('.main')).toRender({
        exact: true,
        path: '/:projectKey',
      });
    });
    describe('<Redirect> to dashboard', () => {
      beforeEach(() => {
        wrapper = wrapper
          .find('.main')
          .find({ exact: true, path: '/:projectKey' })
          .renderProp('render', { match: { url: '/foo-1' } });
      });
      it('should render <Redirect> to "/dashboard"', () => {
        expect(wrapper.find('Redirect')).toHaveProp('to', '/foo-1/dashboard');
      });
    });
    it('should render <Route> matching ":projectKey" path', () => {
      expect(wrapper.find('.main')).toRender({
        exact: false,
        path: '/:projectKey',
      });
    });
    describe('project container <Route>', () => {
      let routerProps;
      beforeEach(() => {
        routerProps = {
          location: { pathname: '/test-project/products' },
          match: { params: { projectKey: 'foo-1' } },
        };
        wrapper = wrapper
          .find('.main')
          .find({ exact: false, path: '/:projectKey' })
          .renderProp('render', routerProps);
      });
      it('should match layout structure', () => {
        expect(wrapper).toMatchSnapshot();
      });
      it('should pass "match" to <ProjectContainer>', () => {
        expect(wrapper.find(ProjectContainer)).toHaveProp(
          'match',
          routerProps.match
        );
      });
      it('should pass "render" to <ProjectContainer>', () => {
        expect(wrapper.find(ProjectContainer)).toHaveProp(
          'render',
          props.render
        );
      });
      it('should render <ReconfigureFlopflip>', () => {
        expect(wrapper).toRender(ReconfigureFlopFlip);
      });

      it('should pass `projectKey` within `user` to `<ReconfigureFlopflip>`', () => {
        expect(wrapper.find(ReconfigureFlopFlip)).toHaveProp(
          'user',
          expect.objectContaining({
            custom: expect.objectContaining({
              project: routerProps.match.params.projectKey,
            }),
          })
        );
      });
    });
    it('should render <Route> matching "/" path', () => {
      expect(wrapper.find('.main')).toRender({
        path: '/',
      });
    });
  });
});

describe('<UnrestrictedApplication>', () => {
  let props;
  let wrapper;
  describe('rendering', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<UnrestrictedApplication {...props} />);
    });
    it('should match layout structure', () => {
      expect(wrapper).toMatchSnapshot();
    });
    describe('catch <Route>', () => {
      let renderWrapper;
      let routerProps;
      beforeEach(() => {
        routerProps = {
          location: { pathname: '/' },
        };
        renderWrapper = wrapper
          .find('Route')
          .last()
          .renderProp('render', routerProps);
      });
      it('should render <Redirect> to "/login', () => {
        expect(renderWrapper.find('Redirect')).toHaveProp(
          'to',
          expect.objectContaining({ pathname: '/login' })
        );
      });
      it('should render <Redirect> with "reason" in search param', () => {
        expect(renderWrapper.find('Redirect')).toHaveProp(
          'to',
          expect.objectContaining({
            query: expect.objectContaining({ reason: 'unauthorized' }),
          })
        );
      });
      describe('when location pathname is "/"', () => {
        it('should render <Redirect> without "redirectTo" search param', () => {
          expect(renderWrapper.find('Redirect')).not.toHaveProp(
            'to',
            expect.objectContaining({
              query: expect.objectContaining({
                redirectTo: expect.any(String),
              }),
            })
          );
        });
      });
      describe('when location pathname is "/foo-1/products"', () => {
        beforeEach(() => {
          routerProps = {
            location: { pathname: '/foo-1/products' },
          };
          renderWrapper = wrapper
            .find('Route')
            .last()
            .renderProp('render', routerProps);
        });
        it('should render <Redirect> with "redirectTo" search param', () => {
          expect(renderWrapper.find('Redirect')).toHaveProp(
            'to',
            expect.objectContaining({
              query: expect.objectContaining({
                redirectTo: '/foo-1/products',
              }),
            })
          );
        });
      });
    });
  });
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ApplicationShell {...props} />);
  });
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper.instance().componentDidMount();
    });
    it('should call onRegisterErrorListeners', () => {
      expect(props.onRegisterErrorListeners).toHaveBeenCalled();
    });
  });
});

describe('extractLanguageFromLocale', () => {
  let locale;
  let languageFromLocale;
  describe('when the locale is a combination of language and region', () => {
    beforeEach(() => {
      locale = 'en-US';
      languageFromLocale = extractLanguageFromLocale(locale);
    });
    it('should return only the language', () => {
      expect(languageFromLocale).toBe('en');
    });
  });
  describe('when the locale is just the language', () => {
    beforeEach(() => {
      locale = 'de';
      languageFromLocale = extractLanguageFromLocale(locale);
    });
    it('should return the locale itself', () => {
      expect(languageFromLocale).toBe('de');
    });
  });
});
