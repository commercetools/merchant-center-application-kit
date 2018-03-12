import React from 'react';
import { shallow } from 'enzyme';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import Authenticated from './authenticated';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = custom => ({
  children: jest.fn(),
  ...custom,
});
const createWrapper = props => shallow(<Authenticated {...props} />);

describe('rendering', () => {
  let props;
  describe('when user is authenticated', () => {
    beforeEach(() => {
      storage.put(CORE_STORAGE_KEYS.TOKEN, 'xxx');
      props = createTestProps();
      createWrapper(props);
    });
    it('should call children with `isAuthenticated` set to true', () => {
      expect(props.children).toHaveBeenCalledTimes(1);
      expect(props.children).toHaveBeenCalledWith({ isAuthenticated: true });
    });
  });
  describe('when the user is not logged in', () => {
    beforeEach(() => {
      storage.remove(CORE_STORAGE_KEYS.TOKEN);
      props = createTestProps();
      createWrapper(props);
    });
    it('should call children with `isAuthenticated` set to true', () => {
      expect(props.children).toHaveBeenCalledTimes(1);
      expect(props.children).toHaveBeenCalledWith({ isAuthenticated: false });
    });
  });
});
