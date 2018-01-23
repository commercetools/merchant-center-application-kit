import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import ProjectSwitcher from '../project-switcher';
import UserSettingsMenu from '../user-settings-menu';
import AppBar from './app-bar';

const createTestProps = props => ({
  isLoading: true,
  user: {
    availableProjects: [],
    firstName: 'John',
    lastName: 'Snow',
    email: 'john.snow@got.com',
  },
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<AppBar {...props} />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render placeholder for "loader-for-requests-in-flight"', () => {
    expect(wrapper).toRender('#loader-for-requests-in-flight');
  });

  it('should render <Route>', () => {
    expect(wrapper).toRender(Route);
  });
  describe('<UserSettingsMenu>', () => {
    describe('when user is loading', () => {
      it('should not render the user settings menu', () => {
        expect(wrapper).not.toRender(UserSettingsMenu);
      });
    });
    describe('when user is loaded', () => {
      beforeEach(() => {
        props = createTestProps({ isLoading: false });
        wrapper = shallow(<AppBar {...props} />);
      });
      describe('<UserSettingsMenu>', () => {
        it('should render', () => {
          expect(wrapper).toRender(UserSettingsMenu);
        });
        it('should receive "firstName"', () => {
          expect(wrapper.find(UserSettingsMenu)).toHaveProp(
            'firstName',
            'John'
          );
        });
        it('should receive "lastName"', () => {
          expect(wrapper.find(UserSettingsMenu)).toHaveProp('lastName', 'Snow');
        });
        it('should receive "email"', () => {
          expect(wrapper.find(UserSettingsMenu)).toHaveProp(
            'email',
            'john.snow@got.com'
          );
        });
      });
    });
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
          {wrapper.find(Route).prop('render')(renderRouteChildrenProps)}
        </div>
      );
    });
    it('should render placeholder for "locale-switcher"', () => {
      expect(renderRouteChildrenWrapper).toRender('#locale-switcher');
    });
    describe('<ProjectSwitcher>', () => {
      describe('when user is loading', () => {
        beforeEach(() => {
          props = createTestProps({
            isLoading: true,
            user: { ...props.user, availableProjects: [] },
          });
          wrapper = shallow(<AppBar {...props} />);
          renderRouteChildrenWrapper = shallow(
            <div>
              {wrapper.find(Route).prop('render')(renderRouteChildrenProps)}
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
            props = createTestProps({
              isLoading: false,
              user: { ...props.user, availableProjects: [] },
            });
            wrapper = shallow(<AppBar {...props} />);
            renderRouteChildrenWrapper = shallow(
              <div>
                {wrapper.find(Route).prop('render')(renderRouteChildrenProps)}
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
              props = createTestProps({
                isLoading: false,
                user: {
                  ...props.user,
                  availableProjects: [{ key: 'test-1' }],
                },
              });
              wrapper = shallow(<AppBar {...props} />);
              renderRouteChildrenWrapper = shallow(
                <div>
                  {wrapper.find(Route).prop('render')(renderRouteChildrenProps)}
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
