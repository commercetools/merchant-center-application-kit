import React from 'react';
import { createPortal } from 'react-dom';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import * as storage from '@commercetools-local/storage';
import { Notifier } from '@commercetools-local/react-notifications';
import { STORAGE_KEYS } from '../../constants';
import FetchProject from '../fetch-project';
import ProjectDataLocale from '../project-data-locale';
import LocaleSwitcher from '../locale-switcher';
import ProjectWithoutSettings from '../project-without-settings';
import { ProjectContainer } from './project-container';

const createTestProps = custom => ({
  match: { params: { projectKey: 'test-1' } },
  location: {
    pathname: '/test-project/products',
  },
  isLoadingUser: false,
  user: { availableProjects: [] },
  intl: {
    formatMessage: jest.fn(),
  },
  render: jest.fn(),
  ...custom,
});

jest.mock('react-dom');
jest.mock('@commercetools-local/storage');

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
  describe('when user is loading', () => {
    beforeEach(() => {
      props = createTestProps({ isLoadingUser: true });
      wrapper = shallow(<ProjectContainer {...props} />);
    });
    it('should render <LoadingSpinner>', () => {
      expect(wrapper).toRender('LoadingSpinner');
    });
  });
  describe('when user is not loading', () => {
    describe('when user has no available projects', () => {
      beforeEach(() => {
        props = createTestProps({
          isLoadingUser: false,
          user: { availableProjects: [] },
        });
        wrapper = shallow(<ProjectContainer {...props} />);
      });
      it('should render <Redirect> with target to logout', () => {
        expect(wrapper.find(Redirect)).toHaveProp(
          'to',
          '/logout?reason=no-projects'
        );
      });
    });
    describe('when user has available projects', () => {
      beforeEach(() => {
        props = createTestProps({
          isLoadingUser: false,
          user: { availableProjects: [{ key: 'p1' }] },
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
        it('should render <LoadingSpinner>', () => {
          expect(wrapper).toRender('LoadingSpinner');
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
          expect(wrapper).toRender('ProjectNotFound');
        });
      });
      describe('when project is suspended', () => {
        beforeEach(() => {
          wrapper = wrapper.find(FetchProject).renderProp('children', {
            isLoading: false,
            project: { suspended: true },
          });
        });
        it('should render <ProjectSuspended>', () => {
          expect(wrapper).toRender('ProjectSuspended');
        });
      });
      describe('when project has trialDaysLeft', () => {
        describe('when trial days are less than two weeks (14 days)', () => {
          beforeEach(() => {
            wrapper = wrapper
              .find(FetchProject)
              .renderProp('children', {
                isLoading: false,
                project: {
                  suspended: false,
                  expired: false,
                  settings: {},
                  languages: ['de'],
                  trialDaysLeft: 13,
                },
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
                project: {
                  suspended: false,
                  expired: false,
                  settings: {},
                  languages: ['de'],
                  trialDaysLeft: 16,
                },
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
                project: {
                  suspended: false,
                  expired: false,
                  settings: {},
                  languages: ['de'],
                  trialDaysLeft: 14,
                },
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
            project: { suspended: false, expired: true },
          });
        });
        it('should render <ProjectExpired>', () => {
          expect(wrapper).toRender('ProjectExpired');
        });
      });
      describe('when project has no settings', () => {
        beforeEach(() => {
          wrapper = wrapper.find(FetchProject).renderProp('children', {
            isLoading: false,
            project: { suspended: false, expired: false, settings: null },
          });
        });
        it('should render <ProjectWithoutSettings>', () => {
          expect(wrapper).toRender(ProjectWithoutSettings);
        });
      });
      describe('when project is in a valid state', () => {
        describe('<ProjectDataLocale>', () => {
          let wrapperDataLocale;
          beforeEach(() => {
            wrapperDataLocale = wrapper
              .find(FetchProject)
              .renderProp('children', {
                isLoading: false,
                project: {
                  suspended: false,
                  expired: false,
                  settings: {},
                  languages: ['de'],
                },
              })
              .find(ProjectDataLocale)
              .renderProp('children', {
                locale: 'de',
                setProjectDataLocale: jest.fn(),
              });
          });
          describe('when <ProjectContainer> is mounted', () => {
            beforeEach(() => {
              const el = document.createElement('div');
              wrapper.setState({ localeSwitcherNode: el });
              wrapperDataLocale = wrapper
                .find(FetchProject)
                .renderProp('children', {
                  isLoading: false,
                  project: {
                    suspended: false,
                    expired: false,
                    settings: {},
                    languages: ['de', 'en'],
                  },
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
                    project: {
                      suspended: false,
                      expired: false,
                      settings: {},
                      languages: ['de', 'en'],
                    },
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
                    project: {
                      suspended: false,
                      expired: false,
                      settings: {},
                      languages: ['de'],
                    },
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
                  project: {
                    suspended: false,
                    expired: false,
                    settings: {},
                    languages: ['de', 'en'],
                  },
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
