import React from 'react';
import { shallow } from 'enzyme';
import FetchUser from '../fetch-user';
import ProjectSwitcher from '../project-switcher';
import AppBar from './app-bar';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppBar match={{ params: { projectKey: 'test-1' } }} />);
  });
  it('should match layout structure', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render element for locale switcher portal', () => {
    expect(wrapper).toRender('#locale-switcher');
  });
  describe('<ProjectSwitcher>', () => {
    let fetchUserChildrenWrapper;
    describe('when user is loading', () => {
      beforeEach(() => {
        fetchUserChildrenWrapper = shallow(
          <div>
            {wrapper.find(FetchUser).prop('children')({ isLoading: true })}
          </div>
        );
      });
      it('should not render <ProjectSwitcher>', () => {
        expect(fetchUserChildrenWrapper).not.toRender(ProjectSwitcher);
      });
    });
    describe('when user is not loading', () => {
      describe('when user has available projects', () => {
        beforeEach(() => {
          fetchUserChildrenWrapper = shallow(
            <div>
              {wrapper.find(FetchUser).prop('children')({
                isLoading: false,
                user: { availableProjects: [{ key: 'p1' }, { key: 'p2' }] },
              })}
            </div>
          );
        });
        it('should render <ProjectSwitcher>', () => {
          expect(fetchUserChildrenWrapper).toRender(ProjectSwitcher);
        });
        it('should pass projectKey to <ProjectSwitcher>', () => {
          expect(fetchUserChildrenWrapper.find(ProjectSwitcher)).toHaveProp(
            'projectKey',
            'test-1'
          );
        });
        it('should pass availableProjects to <ProjectSwitcher>', () => {
          expect(fetchUserChildrenWrapper.find(ProjectSwitcher)).toHaveProp(
            'availableProjects',
            [{ key: 'p1' }, { key: 'p2' }]
          );
        });
      });
      describe('when user does not have available projects', () => {
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
        it('should not render <ProjectSwitcher>', () => {
          expect(fetchUserChildrenWrapper).not.toRender(ProjectSwitcher);
        });
      });
    });
  });
});
