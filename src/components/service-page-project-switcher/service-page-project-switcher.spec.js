import React from 'react';
import { shallow } from 'enzyme';
import FetchUser from '../fetch-user';
import ProjectSwitcher from '../project-switcher';
import { ServicePageProjectSwitcher } from './service-page-project-switcher';

describe('rendering', () => {
  let wrapper;
  let fetchUserChildrenWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ServicePageProjectSwitcher
        match={{ params: { projectKey: 'test-1' } }}
      />
    );
  });
  it('should render <FetchUser>', () => {
    expect(wrapper).toRender(FetchUser);
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
    it('should render null', () => {
      expect(fetchUserChildrenWrapper).toContainReact(<div />);
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
      it('should render null', () => {
        expect(fetchUserChildrenWrapper).toContainReact(<div />);
      });
    });
    describe('when user has available projects', () => {
      let projectSwitcherWrapper;
      describe('<ProjectSwitcher>', () => {
        beforeEach(() => {
          projectSwitcherWrapper = shallow(
            <div>
              {wrapper.find(FetchUser).prop('children')({
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
