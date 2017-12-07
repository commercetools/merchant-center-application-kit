import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import ProjectDataLocale from '../project-data-locale';
import LocaleSwitcher from '../locale-switcher';
import ProjectContainer from './project-container';

const createTestProps = custom => ({
  match: { params: { projectKey: 'test-1' } },
  location: {},
  menuItems: [],
  render: jest.fn(),
  ...custom,
});

jest.mock('react-dom', () => ({
  createPortal: () => <div id="create-portal-has-been-called" />,
}));

describe('rendering', () => {
  let props;
  let wrapper;
  let fetchUserChildrenWrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<ProjectContainer {...props} />);
  });
  describe('when user is loading', () => {
    beforeEach(() => {
      fetchUserChildrenWrapper = shallow(
        <div>
          {wrapper.find(FetchUser).prop('children')({
            isLoading: true,
          })}
        </div>
      );
    });
    it('should render <LoadingSpinner>', () => {
      expect(fetchUserChildrenWrapper).toRender('LoadingSpinner');
    });
  });
  describe('when user is not loading', () => {
    describe('when user has no available projects', () => {
      beforeEach(() => {
        fetchUserChildrenWrapper = shallow(
          <div>
            {wrapper.find(FetchUser).prop('children')({
              isLoading: false,
              user: { availableProjects: [] },
            })}
          </div>
        );
      });
      it('should render <Redirect> with target to logout', () => {
        expect(fetchUserChildrenWrapper.find(Redirect)).toHaveProp(
          'to',
          '/logout?reason=no-projects'
        );
      });
    });
    describe('when user has available projects', () => {
      let fetchProjectChildrenWrapper;
      beforeEach(() => {
        fetchUserChildrenWrapper = shallow(
          <div>
            {wrapper.find(FetchUser).prop('children')({
              isLoading: false,
              user: { availableProjects: [{ key: 'p1' }] },
            })}
          </div>
        );
      });
      it('should render <FetchProject> with projectKey', () => {
        expect(fetchUserChildrenWrapper.find(FetchProject)).toHaveProp(
          'projectKey',
          'test-1'
        );
      });
      describe('when project is loading', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: true,
              })}
            </div>
          );
        });
        it('should render <LoadingSpinner>', () => {
          expect(fetchProjectChildrenWrapper).toRender('LoadingSpinner');
        });
      });
      describe('when project is not found', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: false,
                project: null,
              })}
            </div>
          );
        });
        it('should render <ProjectNotFound>', () => {
          expect(fetchProjectChildrenWrapper).toRender('ProjectNotFound');
        });
      });
      describe('when project is suspended', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: false,
                project: { suspended: true },
              })}
            </div>
          );
        });
        it('should render <ProjectSuspended>', () => {
          expect(fetchProjectChildrenWrapper).toRender('ProjectSuspended');
        });
      });
      describe('when project is expired', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: false,
                project: { suspended: false, expired: true },
              })}
            </div>
          );
        });
        it('should render <ProjectExpired>', () => {
          expect(fetchProjectChildrenWrapper).toRender('ProjectExpired');
        });
      });
      describe('when project has no settings', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: false,
                project: { suspended: false, expired: false, settings: null },
              })}
            </div>
          );
        });
        it('should render <ProjectWithoutSettings>', () => {
          expect(fetchProjectChildrenWrapper).toRender(
            'ProjectWithoutSettings'
          );
        });
      });
      describe('when project is in a valid state', () => {
        describe('<ProjectDataLocale>', () => {
          let projectDataLocaleChildrenWrapper;
          beforeEach(() => {
            fetchProjectChildrenWrapper = shallow(
              <div>
                {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                  isLoading: false,
                  project: {
                    suspended: false,
                    expired: false,
                    settings: {},
                    languages: ['de'],
                  },
                })}
              </div>
            );
            projectDataLocaleChildrenWrapper = shallow(
              <div>
                {fetchProjectChildrenWrapper
                  .find(ProjectDataLocale)
                  .prop('children')({
                  locale: 'de',
                  setProjectDataLocale: jest.fn(),
                })}
              </div>
            );
          });
          describe('when <ProjectContainer> is mounted', () => {
            beforeEach(() => {
              const el = document.createElement('div');
              wrapper.setState({ localeSwitcherNode: el });
              fetchProjectChildrenWrapper = shallow(
                <div>
                  {fetchUserChildrenWrapper.find(FetchProject).prop('children')(
                    {
                      isLoading: false,
                      project: {
                        suspended: false,
                        expired: false,
                        settings: {},
                        languages: ['de', 'en'],
                      },
                    }
                  )}
                </div>
              );
              projectDataLocaleChildrenWrapper = shallow(
                <div>
                  {fetchProjectChildrenWrapper
                    .find(ProjectDataLocale)
                    .prop('children')({
                    locale: 'de',
                    setProjectDataLocale: jest.fn(),
                  })}
                </div>
              );
            });
            it('should call render function', () => {
              expect(props.render).toHaveBeenCalled();
            });
            describe('when project has more than one language', () => {
              beforeEach(() => {
                const el = document.createElement('div');
                wrapper.setState({ localeSwitcherNode: el });
                fetchProjectChildrenWrapper = shallow(
                  <div>
                    {fetchUserChildrenWrapper
                      .find(FetchProject)
                      .prop('children')({
                      isLoading: false,
                      project: {
                        suspended: false,
                        expired: false,
                        settings: {},
                        languages: ['de', 'en'],
                      },
                    })}
                  </div>
                );
                projectDataLocaleChildrenWrapper = shallow(
                  <div>
                    {fetchProjectChildrenWrapper
                      .find(ProjectDataLocale)
                      .prop('children')({
                      locale: 'de',
                      setProjectDataLocale: jest.fn(),
                    })}
                  </div>
                );
              });
              it('should render portal', () => {
                expect(projectDataLocaleChildrenWrapper).toRender(
                  '#create-portal-has-been-called'
                );
              });
            });
            describe('when project has only one language', () => {
              beforeEach(() => {
                const el = document.createElement('div');
                wrapper.setState({ localeSwitcherNode: el });
                fetchProjectChildrenWrapper = shallow(
                  <div>
                    {fetchUserChildrenWrapper
                      .find(FetchProject)
                      .prop('children')({
                      isLoading: false,
                      project: {
                        suspended: false,
                        expired: false,
                        settings: {},
                        languages: ['de'],
                      },
                    })}
                  </div>
                );
                projectDataLocaleChildrenWrapper = shallow(
                  <div>
                    {fetchProjectChildrenWrapper
                      .find(ProjectDataLocale)
                      .prop('children')({
                      locale: 'de',
                      setProjectDataLocale: jest.fn(),
                    })}
                  </div>
                );
              });
              it('should not render <LocalSwitcher> through a portal', () => {
                expect(projectDataLocaleChildrenWrapper).not.toRender(
                  '#create-portal-has-been-called'
                );
              });
            });
          });
          describe('when <ProjectContainer> is mounting', () => {
            beforeEach(() => {
              fetchProjectChildrenWrapper = shallow(
                <div>
                  {fetchUserChildrenWrapper.find(FetchProject).prop('children')(
                    {
                      isLoading: false,
                      project: {
                        suspended: false,
                        expired: false,
                        settings: {},
                        languages: ['de', 'en'],
                      },
                    }
                  )}
                </div>
              );
              projectDataLocaleChildrenWrapper = shallow(
                <div>
                  {fetchProjectChildrenWrapper
                    .find(ProjectDataLocale)
                    .prop('children')({
                    locale: 'de',
                    setProjectDataLocale: jest.fn(),
                  })}
                </div>
              );
            });
            it('should not render <LocalSwitcher> through a portal', () => {
              expect(projectDataLocaleChildrenWrapper).not.toRender(
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
