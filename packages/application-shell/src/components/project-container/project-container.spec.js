import React from 'react';
import { createPortal } from 'react-dom';
import { shallow } from 'enzyme';
import { Switch } from 'react-router-dom';
import * as storage from '@commercetools-frontend/storage';
import { Notifier } from '@commercetools-frontend/react-notifications';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import ProjectExpired from '../project-expired';
import ProjectNotFound from '../project-not-found';
import ProjectSuspended from '../project-suspended';
import ProjectNotInitialized from '../project-not-initialized';
import { STORAGE_KEYS } from '../../constants';
import ApplicationLoader from '../application-loader';
import FetchProject from '../fetch-project';
import ProjectDataLocale from '../project-data-locale';
import LocaleSwitcher from '../locale-switcher';
import { ProjectContainer } from './project-container';

const createTestUserProps = custom => ({
  id: 'u1',
  email: 'foo@bar.com',
  firstName: 'Foo',
  lastName: 'Bar',
  language: 'eu',
  projects: { total: 0 },
  ...custom,
});
const createTestProjectProps = custom => ({
  key: 'foo-1',
  version: 1,
  name: 'Foo 1',
  initialized: true,
  countries: ['us'],
  currencies: ['USD'],
  languages: ['en'],
  owner: {
    id: 'foo-1',
  },
  permissions: { canManageProject: true },
  menuVisibilities: { hideDashboard: true },
  ...custom,
});

const createTestProps = custom => ({
  match: { params: { projectKey: 'test-1' } },
  location: {
    pathname: '/test-project/products',
  },
  user: createTestUserProps(),
  intl: {
    formatMessage: jest.fn(),
  },
  environment: {
    applicationName: 'my-app',
    frontendHost: 'localhost:3001',
    mcApiUrl: 'https://mc-api.commercetools.com',
    location: 'eu',
    env: 'development',
    cdnUrl: 'http://localhost:3001',
    servedByProxy: false,
    enableSignUp: true,
  },
  render: jest.fn(),
  ...custom,
});

jest.mock('react-dom');
jest.mock('@commercetools-frontend/storage');

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    createPortal.mockImplementation(() => (
      <div id="create-portal-has-been-called" />
    ));
    props = createTestProps();
    wrapper = shallow(<ProjectContainer {...props} />);
  });
  describe('when there is an error', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectContainer {...props} />);
      wrapper.setState({ hasError: true });
    });
    it('should render a fallback UI', () => {
      expect(wrapper).toRender('ErrorApologizer');
    });
  });
  describe('when user has no projects', () => {
    beforeEach(() => {
      props = createTestProps({
        isLoadingUser: false,
        user: createTestUserProps({ projects: { total: 0 } }),
      });
      wrapper = shallow(<ProjectContainer {...props} />);
    });
    it('should render <Switch>', () => {
      expect(wrapper).toRender(Switch);
    });
  });
  describe('when user has projects', () => {
    beforeEach(() => {
      props = createTestProps({
        isLoadingUser: false,
        user: createTestUserProps({ projects: { total: 1 } }),
      });
      wrapper = shallow(<ProjectContainer {...props} />);
    });
    it('should render <FetchProject> with projectKey', () => {
      expect(wrapper.find(FetchProject)).toHaveProp('projectKey', 'test-1');
    });
    describe('when project is loading', () => {
      beforeEach(() => {
        wrapper = wrapper.find(FetchProject).renderProp('children', {
          isLoading: true,
        });
      });
      it('should render <ApplicationLoader>', () => {
        expect(wrapper).toRender(ApplicationLoader);
      });
    });
    describe('when project is not found', () => {
      beforeEach(() => {
        wrapper = wrapper.find(FetchProject).renderProp('children', {
          isLoading: false,
          project: null,
        });
      });
      it('should render <ProjectNotFound>', () => {
        expect(wrapper).toRender(ProjectNotFound);
      });
    });
    describe('when project is suspended', () => {
      let projectSuspendedWrapper;
      beforeEach(() => {
        projectSuspendedWrapper = wrapper
          .find(FetchProject)
          .renderProp('children', {
            isLoading: false,
            project: createTestProjectProps({ suspension: { isActive: true } }),
          });
      });
      it('should render <ProjectSuspended>', () => {
        expect(projectSuspendedWrapper).toRender(ProjectSuspended);
      });
      describe('when suspension reason is temporary', () => {
        beforeEach(() => {
          projectSuspendedWrapper = wrapper
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project: createTestProjectProps({
                suspension: {
                  isActive: true,
                  reason: 'TemporaryMaintenance',
                },
              }),
            });
        });

        it('should render <ProjectSuspended>', () => {
          expect(projectSuspendedWrapper).toRender(ProjectSuspended);
        });

        it('should pass `isTemporary` to <ProjectSuspended>', () => {
          expect(projectSuspendedWrapper.find(ProjectSuspended)).toHaveProp(
            'isTemporary',
            true
          );
        });
      });
    });
    describe('when project has days left on before expiry', () => {
      describe('when trial days are less than two weeks (14 days)', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project: createTestProjectProps({
                suspension: { isActive: false },
                expiry: { isActive: false, daysLeft: 13 },
                settings: {},
                languages: ['de'],
              }),
            })
            .find(ProjectDataLocale)
            .renderProp('children', {
              locales: ['de'],
            });
        });
        it('should render Notifier component', () => {
          expect(wrapper).toRender(Notifier);
        });
      });
      describe('when trial days are greater than two weeks (14 days)', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project: createTestProjectProps({
                suspension: { isActive: false, daysLeft: 16 },
                expiry: { isActive: false },
                settings: {},
                languages: ['de'],
              }),
            })
            .find(ProjectDataLocale)
            .renderProp('children', {
              locales: ['de'],
            });
        });

        it('should not render Notifier component', () => {
          expect(wrapper).not.toRender(Notifier);
        });
      });
      describe('when trial days are equal to two weeks (14 days)', () => {
        beforeEach(() => {
          wrapper = wrapper
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project: createTestProjectProps({
                suspension: { isActive: false },
                expiry: { isActive: false, daysLeft: 14 },
                settings: {},
                languages: ['de'],
              }),
            })
            .find(ProjectDataLocale)
            .renderProp('children', {
              locales: ['de'],
            });
        });

        it('should render Notifier component', () => {
          expect(wrapper).toRender(Notifier);
        });
      });
    });
    describe('when project is expired', () => {
      beforeEach(() => {
        wrapper = wrapper.find(FetchProject).renderProp('children', {
          isLoading: false,
          project: createTestProjectProps({
            suspension: { isActive: false },
            expiry: { isActive: true },
          }),
        });
      });
      it('should render <ProjectExpired>', () => {
        expect(wrapper).toRender(ProjectExpired);
      });
    });
    describe('when project is not initialized', () => {
      beforeEach(() => {
        wrapper = wrapper.find(FetchProject).renderProp('children', {
          isLoading: false,
          project: createTestProjectProps({
            initialized: false,
          }),
        });
      });
      it('should render <ProjectNotInitialized>', () => {
        expect(wrapper).toRender(ProjectNotInitialized);
      });
    });
    describe('when project is in a valid state', () => {
      describe('<ProjectDataLocale>', () => {
        let wrapperDataLocale;
        let project;
        let dataLocale;
        beforeEach(() => {
          project = createTestProjectProps({
            suspension: { isActive: false },
            expiry: { isActive: false },
            settings: {},
            languages: ['de'],
          });
          dataLocale = 'de';
          wrapperDataLocale = wrapper
            .find(FetchProject)
            .renderProp('children', {
              isLoading: false,
              project,
            })
            .find(ProjectDataLocale)
            .renderProp('children', {
              locale: dataLocale,
              setProjectDataLocale: jest.fn(),
            });
        });
        it('should pass "user" to <ApplicationContextProvider>', () => {
          expect(wrapperDataLocale.find(ApplicationContextProvider)).toHaveProp(
            'user',
            props.user
          );
        });
        it('should pass "project" to <ApplicationContextProvider>', () => {
          expect(wrapperDataLocale.find(ApplicationContextProvider)).toHaveProp(
            'project',
            project
          );
        });
        it('should pass "projectDataLocale" to <ApplicationContextProvider>', () => {
          expect(wrapperDataLocale.find(ApplicationContextProvider)).toHaveProp(
            'projectDataLocale',
            'de'
          );
        });
        it('should pass "environment" to <ApplicationContextProvider>', () => {
          expect(wrapperDataLocale.find(ApplicationContextProvider)).toHaveProp(
            'environment',
            props.environment
          );
        });
        describe('when <ProjectContainer> is mounted', () => {
          beforeEach(() => {
            const el = document.createElement('div');
            wrapper.setState({ localeSwitcherNode: el });
            wrapperDataLocale = wrapper
              .find(FetchProject)
              .renderProp('children', {
                isLoading: false,
                project: createTestProjectProps({
                  suspension: { isActive: false },
                  expiry: { isActive: false },
                  settings: {},
                  languages: ['de', 'en'],
                }),
              })
              .find(ProjectDataLocale)
              .renderProp('children', {
                locale: 'de',
                setProjectDataLocale: jest.fn(),
              });
          });
          it('should call render function', () => {
            expect(props.render).toHaveBeenCalled();
          });
          describe('when project has more than one language', () => {
            beforeEach(() => {
              const el = document.createElement('div');
              wrapper.setState({ localeSwitcherNode: el });
              wrapperDataLocale = wrapper
                .find(FetchProject)
                .renderProp('children', {
                  isLoading: false,
                  project: createTestProjectProps({
                    suspension: { isActive: false },
                    expiry: { isActive: false },
                    settings: {},
                    languages: ['de', 'en'],
                  }),
                })
                .find(ProjectDataLocale)
                .renderProp('children', {
                  locale: 'de',
                  setProjectDataLocale: jest.fn(),
                });
            });
            it('should render portal', () => {
              expect(wrapperDataLocale).toRender(
                '#create-portal-has-been-called'
              );
            });
          });
          describe('when project has only one language', () => {
            beforeEach(() => {
              const el = document.createElement('div');
              wrapper.setState({ localeSwitcherNode: el });
              wrapperDataLocale = wrapper
                .find(FetchProject)
                .renderProp('children', {
                  isLoading: false,
                  project: createTestProjectProps({
                    suspension: { isActive: false },
                    expiry: { isActive: false },
                    settings: {},
                    languages: ['de'],
                  }),
                })
                .find(ProjectDataLocale)
                .renderProp('children', {
                  locale: 'de',
                  setProjectDataLocale: jest.fn(),
                });
            });
            it('should not render <LocalSwitcher> through a portal', () => {
              expect(wrapperDataLocale).not.toRender(
                '#create-portal-has-been-called'
              );
            });
          });
        });
        describe('when <ProjectContainer> is mounting', () => {
          beforeEach(() => {
            wrapperDataLocale = wrapper
              .find(FetchProject)
              .renderProp('children', {
                isLoading: false,
                project: createTestProjectProps({
                  suspension: { isActive: false },
                  expiry: { isActive: false },
                  settings: {},
                  languages: ['de', 'en'],
                }),
              })
              .find(ProjectDataLocale)
              .renderProp('children', {
                locale: 'de',
                setProjectDataLocale: jest.fn(),
              });
          });
          it('should not render <LocalSwitcher> through a portal', () => {
            expect(wrapperDataLocale).not.toRender(
              '#create-portal-has-been-called'
            );
          });
        });
      });
    });
  });
  describe('switcher', () => {
    let switcherWrapper;
    beforeEach(() => {
      switcherWrapper = shallow(
        <div>
          {wrapper.instance().renderSwitcher({
            projectDataLocale: 'de',
            setProjectDataLocale: jest.fn(),
            availableLocales: ['en', 'de'],
          })}
        </div>
      );
    });
    it('should pass "projectDataLocale" as prop', () => {
      expect(switcherWrapper.find(LocaleSwitcher)).toHaveProp(
        'projectDataLocale',
        'de'
      );
    });
    it('should pass "setProjectDataLocale" as prop', () => {
      expect(switcherWrapper.find(LocaleSwitcher)).toHaveProp(
        'setProjectDataLocale',
        expect.any(Function)
      );
    });
    it('should pass "availableLocales" as prop', () => {
      expect(switcherWrapper.find(LocaleSwitcher)).toHaveProp(
        'availableLocales',
        ['en', 'de']
      );
    });
  });
});

describe('lifecycle', () => {
  let props;
  let wrapper;
  describe('componentDidUpdate', () => {
    beforeEach(() => {
      storage.put.mockClear();
    });
    describe('when `projectKey` is in url', () => {
      beforeEach(() => {
        props = createTestProps({ match: { params: { projectKey: 'p1' } } });
        storage.get.mockReturnValueOnce('p1');
        wrapper = shallow(<ProjectContainer {...props} />);
        wrapper.instance().componentDidUpdate(props);
      });
      it('should store the project key in localStorage', () => {
        expect(storage.put).toHaveBeenCalledWith(
          STORAGE_KEYS.ACTIVE_PROJECT_KEY,
          'p1'
        );
      });
    });
    describe('when `projectKey` is not in url', () => {
      beforeEach(() => {
        props = createTestProps({ match: { params: { projectKey: null } } });
        storage.get.mockReturnValueOnce('p1');
        wrapper = shallow(<ProjectContainer {...props} />);
        wrapper.instance().componentDidUpdate(props);
      });
      it('should not store the project key in localStorage', () => {
        expect(storage.put).not.toHaveBeenCalled();
      });
    });
  });
  describe('when the user navigated to a different route', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectContainer {...props} />);
      wrapper.setState({ hasError: true });
      wrapper.instance().componentDidUpdate({
        ...props,
        location: { pathname: 'test-project/categories' },
      });
    });
    it('should reset the `hasError` state', () => {
      expect(wrapper).toHaveState('hasError', false);
    });
  });
});
