import React from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { render, waitForElement } from '../../test-utils';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';
import withApplicationsMenu from './with-applications-menu';

const Test = props => {
  if (props.menuQuery && props.menuQuery.applicationsMenu) {
    return props.menuQuery.applicationsMenu.navBar.map(menu => (
      <div key={menu.key}>{`Key: ${menu.key}`}</div>
    ));
  }
  if (props.menuQuery && props.menuQuery.error) {
    return <div>{`Error: ${props.menuQuery.error.message}`}</div>;
  }
  return <div>{'loading'}</div>;
};
Test.displayName = 'Test';
Test.propTypes = {
  menuQuery: PropTypes.shape({
    error: PropTypes.shape({ message: PropTypes.string.isRequired }),
    applicationsMenu: PropTypes.shape({
      navBar: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string })),
    }),
  }),
};

const createTestMenuConfig = (key, props) => ({
  key,
  labelAllLocales: [{ locale: 'en', value: upperFirst(key) }],
  uriPath: key,
  icon: 'UserFilledIcon',
  permissions: [],
  featureToggle: null,
  submenu: [
    {
      key: `${key}-new`,
      labelAllLocales: [{ locale: 'en', value: `${upperFirst(key)} new` }],
      uriPath: `${key}/new`,
      permissions: [],
      featureToggle: null,
    },
  ],
  shouldRenderDivider: false,
  ...props,
});

const createGraphqlResponse = custom => ({
  loading: false,
  applicationsMenu: {
    appBar: [],
    navBar: [createTestMenuConfig('orders')],
  },
  ...custom,
});

describe('fetching the menu query', () => {
  const Connected = withApplicationsMenu({ queryName: 'menuQuery' })(Test);
  describe('when the query succeeds', () => {
    it('should render menu key', async () => {
      const { getByText } = render(<Connected />, {
        mocks: [
          {
            request: {
              query: FetchApplicationsMenu,
            },
            result: {
              data: createGraphqlResponse(),
            },
          },
        ],
      });
      await waitForElement(() => getByText('loading'));
      await waitForElement(() => getByText(/Key: orders/i));
    });
  });
  describe('when the query fails', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it('should pass error as prop', async () => {
      const error = new Error('Oops');
      const { getByText } = render(<Connected />, {
        mocks: [
          {
            request: {
              query: FetchApplicationsMenu,
            },
            error,
          },
        ],
      });
      await waitForElement(() => getByText('loading'));
      await waitForElement(() => getByText(/Error: Oops/i));
    });
  });
});
