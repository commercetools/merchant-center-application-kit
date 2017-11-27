import React from 'react';
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

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppBar />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe('container for <LocaleSwitcher>', () => {
    let localeWrapper;
    let fetchUserChildrenWrapper;
    beforeEach(() => {
      localeWrapper = shallow(
        <LocaleSwitcherForProject
          match={{ params: { projectKey: 'test-1' } }}
        />
      );
    });
    describe('when user is loading', () => {
      beforeEach(() => {
        fetchUserChildrenWrapper = shallow(
          <div>
            {localeWrapper.find(FetchUser).prop('children')({
              isLoading: true,
            })}
          </div>
        );
      });
      it('should render null', () => {
        expect(fetchUserChildrenWrapper).toContainReact(<div />);
      });
    });
    describe('when user is not loading', () => {
      describe('when user has no available projects', () => {
        beforeEach(() => {
          fetchUserChildrenWrapper = shallow(
            <div>
              {localeWrapper.find(FetchUser).prop('children')({
                isLoading: false,
                user: { availableProjects: [] },
              })}
            </div>
          );
        });
        it('should render null', () => {
          expect(fetchUserChildrenWrapper).toContainReact(<div />);
        });
      });
      describe('when user has available projects', () => {
        let fetchProjectChildrenWrapper;
        describe('projectKey param is included in the available projects', () => {
          beforeEach(() => {
            fetchUserChildrenWrapper = shallow(
              <div>
                {localeWrapper.find(FetchUser).prop('children')({
                  isLoading: false,
                  user: { availableProjects: [{ key: 'test-1' }] },
                })}
              </div>
            );
          });
          describe('when project is loading', () => {
            beforeEach(() => {
              fetchProjectChildrenWrapper = shallow(
                <div>
                  {fetchUserChildrenWrapper.find(FetchProject).prop('children')(
                    {
                      isLoading: true,
                    }
                  )}
                </div>
              );
            });
            it('should render null', () => {
              expect(fetchProjectChildrenWrapper).toContainReact(<div />);
            });
          });
          describe('when project is not loading', () => {
            describe('when project has only one language', () => {
              beforeEach(() => {
                fetchProjectChildrenWrapper = shallow(
                  <div>
                    {fetchUserChildrenWrapper
                      .find(FetchProject)
                      .prop('children')({
                      isLoading: false,
                      project: { languages: ['en'] },
                    })}
                  </div>
                );
              });
              it('should render null', () => {
                expect(fetchProjectChildrenWrapper).toContainReact(<div />);
              });
            });
            describe('when project has more than one language', () => {
              beforeEach(() => {
                fetchProjectChildrenWrapper = shallow(
                  <div>
                    {fetchUserChildrenWrapper
                      .find(FetchProject)
                      .prop('children')({
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
            fetchUserChildrenWrapper = shallow(
              <div>
                {localeWrapper.find(FetchUser).prop('children')({
                  isLoading: false,
                  user: { availableProjects: [{ key: 'p1' }] },
                })}
              </div>
            );
          });
          it('should render null', () => {
            expect(fetchUserChildrenWrapper).toContainReact(<div />);
          });
        });
      });
    });
  });
  describe('container for <ProjectSwitcher>', () => {
    let projectWrapper;
    let fetchProjectChildrenWrapper;
    beforeEach(() => {
      projectWrapper = shallow(
        <ProjectSwitcherForUser match={{ params: { projectKey: 'test-1' } }} />
      );
    });
    describe('when user is loading', () => {
      beforeEach(() => {
        fetchProjectChildrenWrapper = shallow(
          <div>
            {projectWrapper.find(FetchUser).prop('children')({
              isLoading: true,
            })}
          </div>
        );
      });
      it('should render null', () => {
        expect(fetchProjectChildrenWrapper).toContainReact(<div />);
      });
    });
    describe('when user is not loading', () => {
      describe('when user has no available projects', () => {
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {projectWrapper.find(FetchUser).prop('children')({
                isLoading: false,
                user: { availableProjects: [] },
              })}
            </div>
          );
        });
        it('should render null', () => {
          expect(fetchProjectChildrenWrapper).toContainReact(<div />);
        });
      });
      describe('when user has available projects', () => {
        let projectSwitcherWrapper;
        describe('<ProjectSwitcher>', () => {
          beforeEach(() => {
            projectSwitcherWrapper = shallow(
              <div>
                {projectWrapper.find(FetchUser).prop('children')({
                  isLoading: false,
                  user: { availableProjects: [{ key: 'test-1' }] },
                })}
              </div>
            );
          });
          it('should render <ProjectSwitcher>', () => {
            expect(projectSwitcherWrapper).toRender(ProjectSwitcher);
          });
          it('should pass projectKey to <ProjectSwitcher>', () => {
            expect(projectSwitcherWrapper.find(ProjectSwitcher)).toHaveProp(
              'projectKey',
              'test-1'
            );
          });
          it('should pass available projects to <ProjectSwitcher>', () => {
            expect(projectSwitcherWrapper.find(ProjectSwitcher)).toHaveProp(
              'availableProjects',
              [{ key: 'test-1' }]
            );
          });
        });
      });
    });
  });
});
