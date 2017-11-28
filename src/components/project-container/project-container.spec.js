import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import ProjectContainer from './project-container';

describe('rendering', () => {
  let wrapper;
  let fetchUserChildrenWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ProjectContainer match={{ params: { projectKey: 'test-1' } }}>
        <div>{'foo'}</div>
      </ProjectContainer>
    );
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
        beforeEach(() => {
          fetchProjectChildrenWrapper = shallow(
            <div>
              {fetchUserChildrenWrapper.find(FetchProject).prop('children')({
                isLoading: false,
                project: { suspended: false, expired: false, settings: {} },
              })}
            </div>
          );
        });
        it('should render children', () => {
          expect(fetchProjectChildrenWrapper).toContainReact(
            <div>{'foo'}</div>
          );
        });
      });
    });
  });
});
