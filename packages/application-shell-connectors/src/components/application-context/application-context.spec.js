import React from 'react';
import { shallow } from 'enzyme';
import { ApplicationContextProvider } from './application-context';

describe('rendering', () => {
  let wrapper;

  describe('Provider', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ApplicationContextProvider
          user={{
            id: 'u1',
            email: 'foo@bar.com',
            firstName: 'foo',
            lastName: 'bar',
            language: 'en',
            // Fields that should not be exposed
            numberFormat: 'en',
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
          environment={{
            frontendHost: 'localhost:3001',
            mcApiUrl: 'https://mc-api.commercetools.com',
            location: 'eu',
            env: 'development',
            cdnUrl: 'http://localhost:3001',
            servedByProxy: false,
          }}
        >
          <div />
        </ApplicationContextProvider>
      );
    });
    it('should pass mapped user to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          user: {
            id: expect.any(String),
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            locale: expect.any(String),
            timeZone: expect.any(String),
          },
        })
      );
    });
    it('should pass mapped project to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          project: {
            key: expect.any(String),
            version: expect.any(Number),
            name: expect.any(String),
            countries: expect.any(Array),
            currencies: expect.any(Array),
            languages: expect.any(Array),
            ownerId: expect.any(String),
          },
        })
      );
    });
    it('should pass mapped permissions to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          permissions: {
            canManageProject: true,
          },
        })
      );
    });
    it('should pass mapped dataLocale to Provider', () => {
      expect(wrapper).toHaveProp(
        'value',
        expect.objectContaining({
          dataLocale: expect.any(String),
        })
      );
    });
  });
  // TODO: we can write some functional tests using mount
  // as soon as the new changes of the enzyme adapter are released.
  // https://github.com/airbnb/enzyme/pull/1513
});
