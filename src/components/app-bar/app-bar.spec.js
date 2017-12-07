import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import FetchUser from '../fetch-user';
import ProjectSwitcher from '../project-switcher';
import AppBar from './app-bar';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppBar />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render placeholder for "loader-for-requests-in-flight"', () => {
    expect(wrapper).toRender('#loader-for-requests-in-flight');
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
      it('should render placeholder for "locale-switcher"', () => {
        expect(renderRouteChildrenWrapper).toRender('#locale-switcher');
      });
      describe('<ProjectSwitcher>', () => {
        describe('when user is loading', () => {
          beforeEach(() => {
            fetchUserChildrenProps = {
              isLoading: true,
              user: { availableProjects: [] },
            };
            fetchUserChildrenWrapper = shallow(
              <div>
                {wrapper.find(FetchUser).prop('children')(
                  fetchUserChildrenProps
                )}
              </div>
            );
            renderRouteChildrenWrapper = shallow(
              <div>
                {fetchUserChildrenWrapper.find(Route).prop('render')(
                  renderRouteChildrenProps
                )}
              </div>
            );
          });
          it('should not render <ProjectSwitcher>', () => {
            expect(renderRouteChildrenWrapper).not.toRender(ProjectSwitcher);
          });
        });
        describe('when user is not loading', () => {
          describe('when user has no available projects', () => {
            beforeEach(() => {
              fetchUserChildrenProps = {
                isLoading: false,
                user: { availableProjects: [] },
              };
              fetchUserChildrenWrapper = shallow(
                <div>
                  {wrapper.find(FetchUser).prop('children')(
                    fetchUserChildrenProps
                  )}
                </div>
              );
              renderRouteChildrenWrapper = shallow(
                <div>
                  {fetchUserChildrenWrapper.find(Route).prop('render')(
                    renderRouteChildrenProps
                  )}
                </div>
              );
            });
            it('should not render <ProjectSwitcher>', () => {
              expect(renderRouteChildrenWrapper).not.toRender(ProjectSwitcher);
            });
          });
          describe('when user has available projects', () => {
            describe('<ProjectSwitcher>', () => {
              beforeEach(() => {
                fetchUserChildrenProps = {
                  isLoading: false,
                  user: { availableProjects: [{ key: 'test-1' }] },
                };
                fetchUserChildrenWrapper = shallow(
                  <div>
                    {wrapper.find(FetchUser).prop('children')(
                      fetchUserChildrenProps
                    )}
                  </div>
                );
                renderRouteChildrenWrapper = shallow(
                  <div>
                    {fetchUserChildrenWrapper.find(Route).prop('render')(
                      renderRouteChildrenProps
                    )}
                  </div>
                );
              });
              it('should render <ProjectSwitcher>', () => {
                expect(renderRouteChildrenWrapper).toRender(ProjectSwitcher);
              });
              it('should pass projectKey to <ProjectSwitcher>', () => {
                expect(
                  renderRouteChildrenWrapper.find(ProjectSwitcher)
                ).toHaveProp('projectKey', 'test-1');
              });
              it('should pass available projects to <ProjectSwitcher>', () => {
                expect(
                  renderRouteChildrenWrapper.find(ProjectSwitcher)
                ).toHaveProp('availableProjects', [{ key: 'test-1' }]);
              });
            });
          });
        });
      });
    });
  });
});
