import React from 'react';
import { shallow } from 'enzyme';
import { DOMAINS } from '@commercetools-local/constants';
import ConfigureIntlProvider from '../configure-intl-provider';
import IntercomBooter from '../intercom-booter';
import IntercomUserTracker from '../intercom-user-tracker';
import NavBar from '../navbar';
import UserProfile from '../user-profile';
import ApplicationShell from './application-shell';

const createTestProps = props => ({
  i18n: { en: {}, de: {} },
  configuration: {},
  menuItems: [],
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
  onRegisterGlobalErrorListeners: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ApplicationShell {...props} />);
  });
  it('should match main structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('providers', () => {
    it('should pass "configuration" to <ConfigurationProvider>', () => {
      expect(wrapper.find('ConfigurationProvider')).toHaveProp(
        'configuration',
        props.configuration
      );
    });
    it('should pass "i18n" to <ConfigureIntlProvider>', () => {
      expect(wrapper.find(ConfigureIntlProvider)).toHaveProp(
        'i18n',
        props.i18n
      );
    });
  });
  describe('trackers', () => {
    it('should render <IntercomUrlTracker> below <Router>', () => {
      expect(wrapper).toRender('BrowserRouter > IntercomUrlTracker');
    });
    it('should render <GtmBooter> below <IntercomUrlTracker>', () => {
      expect(wrapper).toRender('IntercomUrlTracker > GtmBooter');
    });
    it('should pass "trackingEventWhitelist" to <GtmBooter>', () => {
      expect(wrapper.find('GtmBooter')).toHaveProp(
        'trackingEventWhitelist',
        props.trackingEventWhitelist
      );
    });
  });
  it('should render <Authenticated> after track components', () => {
    expect(wrapper).toRender('GtmBooter > Authenticated');
  });

  describe('<Authenticated>', () => {
    let authRenderWrapper;
    describe('when user is authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = shallow(
          <div>
            {wrapper.find('Authenticated').prop('children')({
              isAuthenticated: true,
            })}
          </div>
        );
      });
      it('should match layout structure', () => {
        expect(authRenderWrapper).toMatchSnapshot();
      });
      it('should boot intercom', () => {
        expect(authRenderWrapper).toRender(IntercomBooter);
      });
      it('should setup flopflip provider', () => {
        expect(authRenderWrapper).toRender('SetupFlopFlipProvider');
      });
      describe('layout', () => {
        it('should render "global-notifications" container inside "app-layout"', () => {
          expect(authRenderWrapper).toRender(
            '.app-layout > .global-notifications'
          );
        });
        it('should render "header" element inside "app-layout"', () => {
          expect(authRenderWrapper).toRender('.app-layout > header');
        });
        it('should render "aside" element inside "app-layout"', () => {
          expect(authRenderWrapper).toRender('.app-layout > aside');
        });
        it('should render "main" container inside "app-layout"', () => {
          expect(authRenderWrapper).toRender('.app-layout > .main');
        });
        it('should mark "main" container with "main" role', () => {
          expect(authRenderWrapper).toRender(
            '.app-layout > .main[role="main"]'
          );
        });
      });
      it('should render GLOBAL <NotificationsList>', () => {
        expect(authRenderWrapper.find('NotificationsList').at(0)).toHaveProp(
          'domain',
          DOMAINS.GLOBAL
        );
      });
      it('should render PAGE <NotificationsList>', () => {
        expect(authRenderWrapper.find('NotificationsList').at(1)).toHaveProp(
          'domain',
          DOMAINS.PAGE
        );
      });
      it('should render SIDE <NotificationsList>', () => {
        expect(authRenderWrapper.find('NotificationsList').at(2)).toHaveProp(
          'domain',
          DOMAINS.SIDE
        );
      });
      it('should render <AppBar> below header element', () => {
        expect(authRenderWrapper).toRender('header > AppBar');
      });
      it('should render <Route> for "/:projectKey" below aside element', () => {
        expect(authRenderWrapper.find('aside > Route')).toHaveProp(
          'path',
          '/:projectKey'
        );
      });
      describe('<NavBar>', () => {
        let routeRenderWrapper;
        beforeEach(() => {
          routeRenderWrapper = shallow(
            <div>
              {authRenderWrapper.find('aside > Route').prop('render')({
                location: {},
                match: { params: { projectKey: 'foo-1' } },
              })}
            </div>
          );
        });
        it('should render <NavBar> inside <Route> below aside element', () => {
          expect(routeRenderWrapper).toRender(NavBar);
        });
      });
      it('should render <Route> for "/logout" below main container', () => {
        expect(authRenderWrapper.find('.main')).toRender({ path: '/logout' });
      });
      it('should render <Route> for "/profile" below main container', () => {
        expect(authRenderWrapper.find('.main')).toRender({ path: '/profile' });
      });
      describe('<UserProfile>', () => {
        let routeRenderWrapper;
        beforeEach(() => {
          routeRenderWrapper = shallow(
            <div>
              {authRenderWrapper
                .find('.main')
                .find({ path: '/profile' })
                .prop('render')()}
            </div>
          );
        });
        it('should render <UserProfile> inside <Route> below main container', () => {
          expect(routeRenderWrapper).toRender(UserProfile);
        });
      });
      it('should render <Route> matching exact ":projectKey" path', () => {
        expect(authRenderWrapper.find('.main')).toRender({
          exact: true,
          path: '/:projectKey',
        });
      });
      describe('<Redirect> to dashboard', () => {
        let routeRenderWrapper;
        beforeEach(() => {
          routeRenderWrapper = shallow(
            <div>
              {authRenderWrapper
                .find('.main')
                .find({ exact: true, path: '/:projectKey' })
                .prop('render')({ match: { url: '/foo-1' } })}
            </div>
          );
        });
        it('should render <Redirect> to "/dashboard', () => {
          expect(routeRenderWrapper.find('Redirect')).toHaveProp(
            'to',
            '/foo-1/dashboard'
          );
        });
      });
      it('should render <Route> matching ":projectKey" path', () => {
        expect(authRenderWrapper.find('.main')).toRender({
          exact: false,
          path: '/:projectKey',
        });
      });
      describe('project container <Route>', () => {
        let routeRenderWrapper;
        let routerProps;
        beforeEach(() => {
          routerProps = {
            location: {},
            match: { params: { projectKey: 'foo-1' } },
          };
          routeRenderWrapper = shallow(
            <div>
              {authRenderWrapper
                .find('.main')
                .find({ exact: false, path: '/:projectKey' })
                .prop('render')(routerProps)}
            </div>
          );
        });
        it('should match layout structure', () => {
          expect(authRenderWrapper).toMatchSnapshot();
        });
        it('should pass "projectKey" to <SetupFlopFlipProvider>', () => {
          expect(routeRenderWrapper.find('SetupFlopFlipProvider')).toHaveProp(
            'projectKey',
            routerProps.match.params.projectKey
          );
        });
        it('should pass "projectKey" to <IntercomUserTracker>', () => {
          expect(routeRenderWrapper.find(IntercomUserTracker)).toHaveProp(
            'projectKey',
            routerProps.match.params.projectKey
          );
        });
        it('should pass "match" to <ProjectContainer>', () => {
          expect(routeRenderWrapper.find('ProjectContainer')).toHaveProp(
            'match',
            routerProps.match
          );
        });
        it('should pass "location" to <ProjectContainer>', () => {
          expect(routeRenderWrapper.find('ProjectContainer')).toHaveProp(
            'location',
            routerProps.location
          );
        });
        it('should pass "render" to <ProjectContainer>', () => {
          expect(routeRenderWrapper.find('ProjectContainer')).toHaveProp(
            'render',
            props.render
          );
        });
      });
      it('should render <Route> matching "/" path', () => {
        expect(authRenderWrapper.find('.main')).toRender({
          path: '/',
        });
      });
    });
    describe('when user is not authenticated', () => {
      beforeEach(() => {
        authRenderWrapper = shallow(
          <div>
            {wrapper.find('Authenticated').prop('children')({
              isAuthenticated: false,
            })}
          </div>
        );
      });
      it('should match layout structure', () => {
        expect(authRenderWrapper).toMatchSnapshot();
      });
      describe('catch <Route>', () => {
        let routeRenderWrapper;
        let routerProps;
        beforeEach(() => {
          routerProps = {
            location: { pathname: '/' },
          };
          routeRenderWrapper = shallow(
            <div>
              {authRenderWrapper
                .find('Route')
                .last()
                .prop('render')(routerProps)}
            </div>
          );
        });
        it('should render <Redirect> to "/login', () => {
          expect(routeRenderWrapper.find('Redirect')).toHaveProp(
            'to',
            expect.objectContaining({ pathname: '/login' })
          );
        });
        it('should render <Redirect> with "reason" in search param', () => {
          expect(routeRenderWrapper.find('Redirect')).toHaveProp(
            'to',
            expect.objectContaining({
              search: expect.stringContaining('reason=unauthorized'),
            })
          );
        });
        describe('when location pathname is "/"', () => {
          it('should render <Redirect> without "redirectTo" search param', () => {
            expect(routeRenderWrapper.find('Redirect')).not.toHaveProp(
              'to',
              expect.objectContaining({
                search: expect.stringContaining('redirectTo'),
              })
            );
          });
        });
        describe('when location pathname is "/foo-1/products"', () => {
          beforeEach(() => {
            routerProps = {
              location: { pathname: '/foo-1/products' },
            };
            routeRenderWrapper = shallow(
              <div>
                {authRenderWrapper
                  .find('Route')
                  .last()
                  .prop('render')(routerProps)}
              </div>
            );
          });
          it('should render <Redirect> wit "redirectTo" search param', () => {
            expect(routeRenderWrapper.find('Redirect')).toHaveProp(
              'to',
              expect.objectContaining({
                search: expect.stringContaining(
                  `redirectTo=${encodeURIComponent('/foo-1/products')}`
                ),
              })
            );
          });
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
    it('should call onRegisterGlobalErrorListeners', () => {
      expect(props.onRegisterGlobalErrorListeners).toHaveBeenCalled();
    });
  });
});
