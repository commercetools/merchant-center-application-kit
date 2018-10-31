import React from 'react';
import { shallow } from 'enzyme';
import { ApplicationStateProvider } from './application-state';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ApplicationStateProvider
          user={{
            id: 'u1',
            email: 'foo@bar.com',
            firstName: 'foo',
            lastName: 'bar',
            language: 'en',
            numberFormat: 'en',
            // Fields that should not be exposed
            gravatarHash: 'aaa',
            launchdarklyTrackingId: '1',
            defaultProjectKey: 'aaaa',
          }}
          project={{
            key: 'foo-1',
            version: 1,
            name: 'Foo 1',
            countries: ['us'],
            currencies: ['USD'],
            languages: ['en'],
            permissions: { canManageProject: true },
            // Fields that should not be exposed
            expiry: { isActive: false },
            suspension: { isActive: false },
            owner: { id: 'o1' },
          }}
          projectDataLocale="en"
          environment={{ location: 'eu', env: 'production-eu' }}
        >
          <div />
        </ApplicationStateProvider>
      );
    });
    it('should pass mapped user to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          user: expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            applicationLocale: expect.any(String),
            numberFormat: expect.any(String),
          }),
        })
      );
    });
    it('should pass mapped project to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          project: expect.objectContaining({
            key: expect.any(String),
            version: expect.any(Number),
            name: expect.any(String),
            countries: expect.any(Array),
            currencies: expect.any(Array),
            languages: expect.any(Array),
            permissions: expect.any(Object),
            dataLocale: expect.any(String),
          }),
        })
      );
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
