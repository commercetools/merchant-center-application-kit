import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import LocaleSwitcher from '../locale-switcher';
import ProjectSwitcher from '../project-switcher';
import WithProjectDataLocale from '../with-project-data-locale';
import AppBar, {
  LocaleSwitcherForProject,
  ProjectSwitcherForUser,
} from './app-bar';

const createTestPropsForRouteComponents = props => ({
  projectKey: 'test-1',
  isLoadingUser: true,
  user: null,
  ...props,
});

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppBar />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('inner routes', () => {
    let fetchUserChildrenWrapper;
    let fetchUserChildrenProps;
    beforeEach(() => {
      fetchUserChildrenProps = {
        isLoading: true,
        user: { availableProjects: [] },
      };
      fetchUserChildrenWrapper = shallow(
        <div>
          {wrapper.find(FetchUser).prop('children')(fetchUserChildrenProps)}
        </div>
      );
    });
    it('should render <Route>', () => {
      expect(fetchUserChildrenWrapper).toRender(Route);
    });
    describe('render route', () => {
      let renderRouteChildrenWrapper;
      let renderRouteChildrenProps;
      beforeEach(() => {
        renderRouteChildrenProps = {
          match: { params: { projectKey: 'test-1' } },
        };
        renderRouteChildrenWrapper = shallow(
          <div>
            {fetchUserChildrenWrapper.find(Route).prop('render')(
              renderRouteChildrenProps
            )}
          </div>
        );
      });
      it('should pass projectKey to <LocaleSwitcherForProject>', () => {
        expect(
          renderRouteChildrenWrapper.find(LocaleSwitcherForProject)
        ).toHaveProp('projectKey', 'test-1');
      });
      it('should pass isLoadingUser to <LocaleSwitcherForProject>', () => {
        expect(
          renderRouteChildrenWrapper.find(LocaleSwitcherForProject)
        ).toHaveProp('isLoadingUser', fetchUserChildrenProps.isLoading);
      });
      it('should pass user to <LocaleSwitcherForProject>', () => {
        expect(
          renderRouteChildrenWrapper.find(LocaleSwitcherForProject)
        ).toHaveProp('user', fetchUserChildrenProps.user);
      });
      it('should pass projectKey to <ProjectSwitcherForUser>', () => {
        expect(
          renderRouteChildrenWrapper.find(ProjectSwitcherForUser)
        ).toHaveProp('projectKey', 'test-1');
      });
      it('should pass isLoadingUser to <ProjectSwitcherForUser>', () => {
        expect(
          renderRouteChildrenWrapper.find(ProjectSwitcherForUser)
        ).toHaveProp('isLoadingUser', fetchUserChildrenProps.isLoading);
      });
      it('should pass user to <ProjectSwitcherForUser>', () => {
        expect(
          renderRouteChildrenWrapper.find(ProjectSwitcherForUser)
        ).toHaveProp('user', fetchUserChildrenProps.user);
      });
    });
  });
  describe('container for <LocaleSwitcher>', () => {
    let props;
    let localeWrapper;
    describe('when user is loading', () => {
      beforeEach(() => {
        props = createTestPropsForRouteComponents();
        localeWrapper = shallow(<LocaleSwitcherForProject {...props} />);
      });
      it('should render null', () => {
        expect(localeWrapper.type()).toBe(null);
      });
    });
    describe('when user is not loading', () => {
      describe('when user has no available projects', () => {
        beforeEach(() => {
          props = createTestPropsForRouteComponents({
            isLoadingUser: false,
            user: { availableProjects: [] },
          });
          localeWrapper = shallow(<LocaleSwitcherForProject {...props} />);
        });
        it('should render null', () => {
          expect(localeWrapper.type()).toBe(null);
        });
      });
      describe('when user has available projects', () => {
        let fetchProjectChildrenWrapper;
        describe('projectKey param is included in the available projects', () => {
          beforeEach(() => {
            props = createTestPropsForRouteComponents({
              isLoadingUser: false,
              user: { availableProjects: [{ key: 'test-1' }] },
            });
            localeWrapper = shallow(<LocaleSwitcherForProject {...props} />);
          });
          describe('when project is loading', () => {
            beforeEach(() => {
              fetchProjectChildrenWrapper = localeWrapper
                .find(FetchProject)
                .prop('children')({
                isLoading: true,
              });
            });
            it('should render null', () => {
              expect(fetchProjectChildrenWrapper).toBe(null);
            });
          });
          describe('when project is not loading', () => {
            describe('when project has only one language', () => {
              beforeEach(() => {
                fetchProjectChildrenWrapper = localeWrapper
                  .find(FetchProject)
                  .prop('children')({
                  isLoading: false,
                  project: { languages: ['en'] },
                });
              });
              it('should render null', () => {
                expect(fetchProjectChildrenWrapper).toBe(null);
              });
            });
            describe('when project has more than one language', () => {
              beforeEach(() => {
                fetchProjectChildrenWrapper = shallow(
                  <div>
                    {localeWrapper.find(FetchProject).prop('children')({
                      isLoading: false,
                      project: { languages: ['en', 'de'] },
                    })}
                  </div>
                );
              });
              it('should pass project locales to <WithProjectDataLocale>', () => {
                expect(
                  fetchProjectChildrenWrapper.find(WithProjectDataLocale)
                ).toHaveProp('locales', ['en', 'de']);
              });
              describe('<LocaleSwitcher>', () => {
                let localeSwitcherWrapper;
                beforeEach(() => {
                  localeSwitcherWrapper = shallow(
                    <div>
                      {fetchProjectChildrenWrapper
                        .find(WithProjectDataLocale)
                        .prop('children')({
                        locale: 'en',
                        setProjectDataLocale: jest.fn(),
                      })}
                    </div>
                  );
                });
                it('should render <LocaleSwitcher>', () => {
                  expect(localeSwitcherWrapper).toRender(LocaleSwitcher);
                });
                it('should pass projectDataLocale to <LocaleSwitcher>', () => {
                  expect(localeSwitcherWrapper.find(LocaleSwitcher)).toHaveProp(
                    'projectDataLocale',
                    'en'
                  );
                });
                it('should pass setProjectDataLocale to <LocaleSwitcher>', () => {
                  expect(localeSwitcherWrapper.find(LocaleSwitcher)).toHaveProp(
                    'setProjectDataLocale',
                    expect.any(Function)
                  );
                });
                it('should pass project languages to <LocaleSwitcher>', () => {
                  expect(localeSwitcherWrapper.find(LocaleSwitcher)).toHaveProp(
                    'availableLocales',
                    ['en', 'de']
                  );
                });
              });
            });
          });
        });
        describe('projectKey param is not included in the available projects', () => {
          beforeEach(() => {
            props = createTestPropsForRouteComponents({
              isLoadingUser: false,
              user: { availableProjects: [{ key: 'p1' }] },
            });
            localeWrapper = shallow(<LocaleSwitcherForProject {...props} />);
          });
          it('should render null', () => {
            expect(localeWrapper.type()).toBe(null);
          });
        });
      });
    });
  });
  describe('container for <ProjectSwitcher>', () => {
    let props;
    let projectWrapper;
    beforeEach(() => {
      props = createTestPropsForRouteComponents();
      projectWrapper = shallow(<ProjectSwitcherForUser {...props} />);
    });
    describe('when user is loading', () => {
      beforeEach(() => {
        props = createTestPropsForRouteComponents();
        projectWrapper = shallow(<ProjectSwitcherForUser {...props} />);
      });
      it('should render null', () => {
        expect(projectWrapper.type()).toBe(null);
      });
    });
    describe('when user is not loading', () => {
      describe('when user has no available projects', () => {
        beforeEach(() => {
          props = createTestPropsForRouteComponents({
            isLoadingUser: false,
            user: { availableProjects: [] },
          });
          projectWrapper = shallow(<ProjectSwitcherForUser {...props} />);
        });
        it('should render null', () => {
          expect(projectWrapper.type()).toBe(null);
        });
      });
      describe('when user has available projects', () => {
        describe('<ProjectSwitcher>', () => {
          beforeEach(() => {
            props = createTestPropsForRouteComponents({
              isLoadingUser: false,
              user: { availableProjects: [{ key: 'test-1' }] },
            });
            projectWrapper = shallow(<ProjectSwitcherForUser {...props} />);
          });
          it('should render <ProjectSwitcher>', () => {
            expect(projectWrapper).toRender(ProjectSwitcher);
          });
          it('should pass projectKey to <ProjectSwitcher>', () => {
            expect(projectWrapper.find(ProjectSwitcher)).toHaveProp(
              'projectKey',
              'test-1'
            );
          });
          it('should pass available projects to <ProjectSwitcher>', () => {
            expect(projectWrapper.find(ProjectSwitcher)).toHaveProp(
              'availableProjects',
              [{ key: 'test-1' }]
            );
          });
        });
      });
    });
  });
});
