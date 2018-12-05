import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import ProjectSwitcher from '../project-switcher';
import UserSettingsMenu from '../user-settings-menu';
import AppBar from './app-bar';

jest.mock('../../utils');

const createTestProps = props => ({
  user: {
    projects: {
      total: 0,
    },
    defaultProjectKey: 'test-default-project-key',
    firstName: 'John',
    lastName: 'Snow',
    gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
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
  it('should render placeholder for "locale-switcher"', () => {
    expect(wrapper).toRender('#locale-switcher');
  });
  describe('<UserSettingsMenu>', () => {
    describe('when user is not defined', () => {
      beforeEach(() => {
        props = createTestProps({ user: null });
        wrapper = shallow(<AppBar {...props} />);
      });
      it('should not render the user settings menu', () => {
        expect(wrapper).not.toRender(UserSettingsMenu);
      });
    });
    describe('when user is loaded', () => {
      beforeEach(() => {
        props = createTestProps();
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
        it('should receive "gravatarHash"', () => {
          expect(wrapper.find(UserSettingsMenu)).toHaveProp(
            'gravatarHash',
            '20c9c1b252b46ab49d6f7a4cee9c3e68'
          );
        });
      });
    });
  });
  describe('<ProjectSwitcher>', () => {
    describe('with project key in url', () => {
      describe('when user is not defined', () => {
        beforeEach(() => {
          props = createTestProps({
            user: null,
            projectKeyFromUrl: 'test-project-key',
          });
          wrapper = shallow(<AppBar {...props} />);
        });
        it('should not render <ProjectSwitcher>', () => {
          expect(wrapper).not.toRender(ProjectSwitcher);
        });
      });
      describe('when user is defined', () => {
        describe('when user has no projects', () => {
          beforeEach(() => {
            props = createTestProps({
              user: { ...props.user, projects: { total: 0 } },
              projectKeyFromUrl: 'test-project-key',
            });
            wrapper = shallow(<AppBar {...props} />);
          });
          it('should not render <ProjectSwitcher>', () => {
            expect(wrapper).not.toRender(ProjectSwitcher);
          });
        });
        describe('when user has projects', () => {
          describe('<ProjectSwitcher>', () => {
            beforeEach(() => {
              props = createTestProps({
                user: {
                  ...props.user,
                  projects: { total: 1 },
                },
                projectKeyFromUrl: 'test-project-key',
              });
              wrapper = shallow(<AppBar {...props} />);
            });
            it('should render <ProjectSwitcher>', () => {
              expect(wrapper).toRender(ProjectSwitcher);
            });
            it('should pass projectKey to <ProjectSwitcher>', () => {
              expect(wrapper.find(ProjectSwitcher)).toHaveProp(
                'projectKey',
                props.projectKeyFromUrl
              );
            });
            it('should pass total to <ProjectSwitcher>', () => {
              expect(wrapper.find(ProjectSwitcher)).toHaveProp('total', 1);
            });
          });
        });
      });
    });
    describe('without project key in url', () => {
      describe('when user is defined', () => {
        describe('when user has projects', () => {
          describe('<ProjectSwitcher>', () => {
            beforeEach(() => {
              props = createTestProps({
                user: {
                  ...props.user,
                  projects: { total: 1 },
                },
              });
              wrapper = shallow(<AppBar {...props} />);
            });
            it('should not render <ProjectSwitcher>', () => {
              expect(wrapper).not.toRender(ProjectSwitcher);
            });

            it('should not render <Link> with path to previous project (default project)', () => {
              expect(wrapper).toRender(Link);
              expect(wrapper.find(Link)).toHaveProp(
                'to',
                `/${props.user.defaultProjectKey}`
              );
            });
          });
        });
      });
    });
  });
});
