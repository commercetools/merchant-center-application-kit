const getConfigDiff = require('./get-config-diff');

const oldConfig = {
  name: 'test name',
  description: 'test description',
  url: 'https://test.com',
  icon: '<svg><path fill="#000000"></path></svg>',
  permissions: [],
  mainMenuLink: {},
  submenuLinks: [],
};

const newConfig = {
  name: 'test name',
  description: 'test description',
  url: 'https://test.com',
  icon: '<svg><path fill="#000000"></path></svg>',
  permissions: [],
  mainMenuLink: {},
  submenuLinks: [],
};

describe('getConfigDiff', () => {
  it('should display no diff', () => {
    expect(getConfigDiff(oldConfig, newConfig)).toBe('');
  });

  it('should display name diff', () => {
    const updatedNewConfig = {
      ...newConfig,
      name: 'updated test name',
    };
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toMatchSnapshot();
  });

  it('should display diff for name, description, icon, url', () => {
    const updatedNewConfig = {
      ...newConfig,
      name: 'updated test name',
      description: 'updated description',
      url: 'https://updated-test.com',
      icon: '<svg><path fill="#ffffff"></path></svg>',
    };
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toMatchSnapshot();
  });

  it('should display diff for permissions', () => {
    const updatedOldConfig = {
      ...oldConfig,
      permissions: [
        {
          oAuthScopes: ['manage_product'],
          name: 'manageTestCustomApp',
        },
        {
          oAuthScopes: ['view_products', 'view_customers'],
          name: 'viewTestCustomApp',
        },
      ],
    };

    const updatedNewConfig = {
      ...newConfig,
      permissions: [
        {
          oAuthScopes: ['manage_customer'],
          name: 'manageTestCustomApp',
        },
        {
          oAuthScopes: ['view_products', 'view_customers'],
          name: 'viewTestCustomApps',
        },
      ],
    };

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toMatchSnapshot();
  });

  it('should display diff for mainMenuLink', () => {
    const updatedOldConfig = {
      ...newConfig,
      mainMenuLink: {
        defaultLabel: 'Avengers',
        permissions: ['viewTestCustomApps'],
        labelAllLocales: [
          {
            locale: 'de',
            value: 'lorem',
          },
          {
            locale: 'en',
            value: 'ipsum',
          },
        ],
      },
    };

    const updatedNewConfig = {
      ...newConfig,
      mainMenuLink: {
        defaultLabel: 'Justice league',
        permissions: ['manageTestCustomApps'],
        labelAllLocales: [
          {
            locale: 'fr',
            value: 'test',
          },
          {
            locale: 'en',
            value: 'lorem ipsum',
          },
        ],
      },
    };

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toMatchSnapshot();
  });

  it('should display diff for submenuLink', () => {
    const updatedOldConfig = {
      ...oldConfig,
      submenuLinks: [
        {
          uriPath: 'custom-app/hello',
          defaultLabel: 'hello',
          permissions: ['ViewCustomApp', 'ManageOldCustomApp'],
          labelAllLocales: [
            {
              locale: 'fr',
              value: 'test',
            },
            {
              locale: 'de',
              value: 'lorem',
            },
            {
              locale: 'en',
              value: 'ipsum',
            },
          ],
        },
        {
          uriPath: 'custom-app/lorem',
          defaultLabel: 'lorem',
          permissions: [],
          labelAllLocales: [],
        },
      ],
    };

    const updatedNewConfig = {
      ...newConfig,
      submenuLinks: [
        {
          uriPath: 'custom-app/hello',
          defaultLabel: 'hello world',
          permissions: ['ViewCustomApp', 'ManageCustomApp'],
          labelAllLocales: [
            {
              locale: 'fr',
              value: 'test',
            },
            {
              locale: 'de',
              value: 'ipsum',
            },
            {
              locale: 'es',
              value: 'value',
            },
          ],
        },
        {
          uriPath: 'custom-app/ipsum',
          defaultLabel: 'ipsum',
          permissions: [],
          labelAllLocales: [],
        },
      ],
    };

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toMatchSnapshot();
  });
});
