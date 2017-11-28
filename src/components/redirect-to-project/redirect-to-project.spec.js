import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import FetchUser from '../fetch-user';
import RedirectToProject from './redirect-to-project';

jest.mock('@commercetools-local/utils/storage');

describe('rendering', () => {
  let fetchUserChildrenWrapper;

  const renderChildrenWrapper = props => {
    const wrapper = shallow(<RedirectToProject />);
    return shallow(
      <div>{wrapper.find(FetchUser).prop('children')(props)}</div>
    );
  };

  describe('when user is loading', () => {
    beforeEach(() => {
      fetchUserChildrenWrapper = renderChildrenWrapper({ isLoading: true });
    });
    it('should render null', () => {
      expect(fetchUserChildrenWrapper).toContainReact(<div />);
    });
  });
  describe('when user is not loading', () => {
    describe('when user has no available projects', () => {
      beforeEach(() => {
        fetchUserChildrenWrapper = renderChildrenWrapper({
          isLoading: false,
          user: { availableProjects: [] },
        });
      });
      it('should render null', () => {
        expect(fetchUserChildrenWrapper).toContainReact(<div />);
      });
    });
    describe('when user has available projects', () => {
      describe('when there is a cached projectKey', () => {
        beforeEach(() => {
          storage.put(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY, 'old-project');
          fetchUserChildrenWrapper = renderChildrenWrapper({
            isLoading: false,
            user: { availableProjects: [{ key: 'p1' }] },
          });
        });
        it('should render Redirect with target to cached project key', () => {
          expect(fetchUserChildrenWrapper.find(Redirect)).toHaveProp(
            'to',
            '/old-project'
          );
        });
      });
      describe('when there is not a cached projectKey', () => {
        beforeEach(() => {
          storage.remove(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
          fetchUserChildrenWrapper = renderChildrenWrapper({
            isLoading: false,
            user: { availableProjects: [{ key: 'p1' }] },
          });
        });
        it('should render Redirect with target to first project key in the available projects list', () => {
          expect(fetchUserChildrenWrapper.find(Redirect)).toHaveProp(
            'to',
            '/p1'
          );
        });
      });
    });
  });
});
