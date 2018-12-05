import React from 'react';
import { shallow } from 'enzyme';
import { ReconfigureFlopFlip } from '@flopflip/react-broadcast';
import { DOMAINS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import * as appShellUtils from '../../utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import ProjectContainer from '../project-container';
import FetchUser from '../fetch-user';
import FetchProject from '../fetch-project';
import NavBar, { LoadingNavBar } from '../navbar';
import ApplicationShell, {
  RestrictedApplication,
  UnrestrictedApplication,
  extractLanguageFromLocale,
  getBrowserLanguage,
  mergeMessages,
} from './application-shell';

jest.mock('@commercetools-frontend/storage');
jest.mock('@commercetools-frontend/sentry');
jest.mock('../../utils');

const createTestProps = props => ({
  applicationMessages: {
    en: { 'CustomApp.title': 'Title en' },
    'en-US': { 'CustomApp.title': 'Title' },
    de: { 'CustomApp.title': 'Titel' },
  },
  environment: {
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: false,
  },
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

const testLocaleData = {
  isLoading: false,
  language: 'en',
  messages: { 'AppKit.title': 'Title en', 'CustomApp.title': 'Title en' },
};

const renderForAsyncData = ({ props, userData, localeData = testLocaleData }) =>
  shallow(<RestrictedApplication {...props} />)
    .find(FetchUser)
    .renderProp('children', userData)
    .find(AsyncLocaleData)
    .renderProp('children', localeData);

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ApplicationShell {...props} />);
  });
  describe('providers', () => {
    it('should pass "environment" to <ApplicationContextProvider>', () => {
      expect(wrapper.find(ApplicationContextProvider)).toHaveProp(
        'environment',
        props.environment
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
            .prop('render')({
            location: { pathname: '/account' },
          })}
        </div>
      );
    });
    describe('when user is authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = routeRenderWrapper
          .find('Authenticated')
          .renderProp('children', {
            isAuthenticated: true,
          });
      });
      it('should render <RestrictedApplication> after track components', () => {
        expect(authRenderWrapper).toRender(RestrictedApplication);
      });
    });

    describe('when user is not authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = routeRenderWrapper
          .find('Authenticated')
          .renderProp('children', {
            isAuthenticated: false,
          })
          .find(AsyncLocaleData)
          .renderProp('children', {
            language: 'en',
            messages: testLocaleData.messages,
          });
      });
      it('should pass "language" to <ConfigureIntlProvider>', () => {
        expect(authRenderWrapper.find(ConfigureIntlProvider)).toHaveProp(
          'language',
          'en'
        );
      });
      it('should pass default "messages" to <ConfigureIntlProvider>', () => {
        expect(authRenderWrapper.find(ConfigureIntlProvider)).toHaveProp(
          'messages',
          expect.objectContaining({ 'AppKit.title': 'Title en' })
        );
      });
      it('should pass custom app "messages" to <ConfigureIntlProvider>', () => {
        expect(authRenderWrapper.find(ConfigureIntlProvider)).toHaveProp(
          'messages',
          expect.objectContaining({ 'AppKit.title': 'Title en' })
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
  let localeData;
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
          projects: {
            total: 0,
          },
          defaultProjectKey: 'foo-0',
          language: 'en-US',
          launchdarklyTrackingId: '123',
          launchdarklyTrackingGroup: 'ct',
          launchdarklyTrackingTeam: ['abc', 'def'],
          launchdarklyTrackingTenant: 'xy',
        },
      };
      wrapper = renderForAsyncData({ props, userData });
    });
    describe('when user is loading', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        props = createTestProps();
        userData = {
          isLoading: true,
        };
        wrapper = shallow(<RestrictedApplication {...props} />)
          .find(FetchUser)
          .renderProp('children', userData);
      });
      it('should pass "locale" as undefined to <AsyncLocaleData>', () => {
        expect(wrapper.find(AsyncLocaleData)).toHaveProp('locale', undefined);
      });
      it('should pass "user" as undefined to <ApplicationContextProvider>', () => {
        expect(wrapper.find(ApplicationContextProvider)).toHaveProp(
          'user',
          undefined
        );
      });
      it('should pass "environment" to <ApplicationContextProvider>', () => {
        expect(wrapper.find(ApplicationContextProvider)).toHaveProp(
          'environment',
          props.environment
        );
      });
    });
    describe('when user is loaded', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        props = createTestProps();
        wrapper = shallow(<RestrictedApplication {...props} />)
          .find(FetchUser)
          .renderProp('children', userData);
      });
      it('should pass "user" to <ApplicationContextProvider>', () => {
        expect(wrapper.find(ApplicationContextProvider)).toHaveProp(
          'user',
          userData.user
        );
      });
      it('should pass "environment" to <ApplicationContextProvider>', () => {
        expect(wrapper.find(ApplicationContextProvider)).toHaveProp(
          'environment',
          props.environment
        );
      });
    });
    describe('when locale data is loading', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        wrapper = shallow(<RestrictedApplication {...props} />)
          .find(FetchUser)
          .renderProp('children', userData)
          .find(AsyncLocaleData)
          .renderProp('children', {
            isLoading: true,
            language: null,
            messages: null,
          });
      });
      it('should not pass "language" prop to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).not.toHaveProp('language');
      });
      it('should not pass "messages" prop to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).not.toHaveProp('messages');
      });
    });
    describe('when fetching the user returns an error', () => {
      beforeEach(() => {
        reportErrorToSentry.mockClear();
        props = createTestProps();
        userData = {
          isLoading: false,
          error: new Error('Failed to fetch'),
        };
        wrapper = renderForAsyncData({ props, userData });
      });
      it('should pass "language" to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
          'language',
          'en'
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
      it('should pass default "messages" to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
          'messages',
          expect.objectContaining({
            'AppKit.title': 'Title en',
          })
        );
      });
      it('should pass application "messages" to <ConfigureIntlProvider>', () => {
        expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
          'messages',
          expect.objectContaining({
            'CustomApp.title': 'Title en',
          })
        );
      });
      it('should not render <ApplicationContextProvider>', () => {
        expect(wrapper).not.toRender(ApplicationContextProvider);
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
    describe('<NavBar>', () => {
      let wrapperAside;
      describe('when there is a project key in the url', () => {
        let project;
        beforeEach(() => {
          appShellUtils.selectProjectKeyFromUrl.mockReturnValue('foo-1');
          wrapper = renderForAsyncData({ props, userData });
          project = {
            key: 'foo-1',
            version: 1,
            name: 'Foo 1',
            countries: ['us'],
            currencies: ['USD'],
            languages: ['en'],
            owner: {
              id: 'foo-id',
            },
            permissions: { canManageProject: true },
          };
          wrapperAside = wrapper
            .find('aside')
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project,
            });
        });
        it('should pass "user" to <ApplicationContextProvider>', () => {
          expect(wrapperAside.find(ApplicationContextProvider)).toHaveProp(
            'user',
            userData.user
          );
        });
        it('should pass "project" to <ApplicationContextProvider>', () => {
          expect(wrapperAside.find(ApplicationContextProvider)).toHaveProp(
            'project',
            project
          );
        });
        it('should pass "environment" to <ApplicationContextProvider>', () => {
          expect(wrapperAside.find(ApplicationContextProvider)).toHaveProp(
            'environment',
            props.environment
          );
        });
        it('should pass the projectKey matched from the URL', () => {
          expect(wrapperAside.find(NavBar)).toHaveProp('projectKey', 'foo-1');
        });
        it('should pass the application language', () => {
          expect(wrapperAside.find(NavBar)).toHaveProp(
            'applicationLanguage',
            'en'
          );
        });
        it('should pass "useFullRedirectsForLinks"', () => {
          expect(wrapperAside.find(NavBar)).toHaveProp(
            'useFullRedirectsForLinks',
            props.INTERNAL__isApplicationFallback
          );
        });
        describe('when user, locale and project are loading', () => {
          beforeEach(() => {
            userData = {
              isLoading: true,
            };
            localeData = {
              isLoading: true,
            };
            wrapper = renderForAsyncData({ props, userData, localeData });
            wrapperAside = wrapper
              .find('aside')
              .find(FetchProject)
              .renderProp('children', {
                isLoading: true,
              });
          });
          it('should render <LoadingNavBar>', () => {
            expect(wrapperAside).toRender(LoadingNavBar);
          });
        });
        describe('when user is loaded, locale and project are loading', () => {
          beforeEach(() => {
            localeData = {
              isLoading: true,
            };
            wrapper = renderForAsyncData({ props, userData, localeData });
            wrapperAside = wrapper
              .find('aside')
              .find(FetchProject)
              .renderProp('children', {
                isLoading: true,
              });
          });
          it('should render <LoadingNavBar>', () => {
            expect(wrapperAside).toRender(LoadingNavBar);
          });
        });
        describe('when user and locale data are loaded, project is loading', () => {
          beforeEach(() => {
            wrapper = renderForAsyncData({ props, userData });
            wrapperAside = wrapper
              .find('aside')
              .find(FetchProject)
              .renderProp('children', {
                isLoading: true,
              });
          });
          it('should render <LoadingNavBar>', () => {
            expect(wrapperAside).toRender(LoadingNavBar);
          });
        });
      });
      describe('when there is no project key in the url', () => {
        beforeEach(() => {
          appShellUtils.selectProjectKeyFromUrl.mockReturnValue();
          wrapper = renderForAsyncData({ props, userData });
          wrapperAside = wrapper.find('aside');
        });
        it('should not render <LoadingNavBar>', () => {
          expect(wrapperAside).not.toRender(LoadingNavBar);
        });
        it('should not render <NavBar>', () => {
          expect(wrapperAside).not.toRender(NavBar);
        });
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
                redirectTo: `${window.location.origin}/foo-1/products`,
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

describe('getBrowserLanguage', () => {
  let testWindow;
  describe('when the locale is supported by the MC', () => {
    beforeEach(() => {
      testWindow = {
        navigator: {
          language: 'de',
        },
      };
    });
    it('should return the language', () => {
      expect(getBrowserLanguage(testWindow)).toBe('de');
    });
  });
  describe('when locale is not supported by the MC', () => {
    beforeEach(() => {
      testWindow = {
        navigator: {
          language: 'hu',
        },
      };
    });
    it('should return the default language, `en`', () => {
      expect(getBrowserLanguage(testWindow)).toBe('en');
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

describe('mergeMessages', () => {
  it('should merge multiple arguments', () => {
    expect(mergeMessages({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
  it('should merge even if arguments are not defined', () => {
    expect(mergeMessages(null, undefined, { c: 3 })).toEqual({
      c: 3,
    });
  });
});
