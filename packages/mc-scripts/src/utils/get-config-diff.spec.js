const { green, red } = require('chalk');
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
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toBe(
      `name changed: ${red('test name')} => ${green('updated test name')}`
    );
  });

  it('should display diff for name, description, icon, url', () => {
    const updatedNewConfig = {
      ...newConfig,
      name: 'updated test name',
      description: 'updated description',
      url: 'https://updated-test.com',
      icon: '<svg><path fill="#ffffff"></path></svg>',
    };
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toBe(
      `name changed: ${red('test name')} => ${green(
        'updated test name'
      )}\ndescription changed: ${red('test description')} => ${green(
        'updated description'
      )}\nurl changed: ${red('https://test.com')} => ${green(
        'https://updated-test.com'
      )}\nicon changed: ${red(
        '<svg><path fill="#000000"></path></svg>'
      )} => ${green('<svg><path fill="#ffffff"></path></svg>')}`
    );
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toBe(
      `permissions changed\n\tmanageTestCustomApp changed\n\t\tItem with "${green(
        'manage_customer'
      )}" added\n\t\tItem with "${red('manage_product')}" removed\n\t"${green(
        'viewTestCustomApps'
      )}" was added\n\t"${red('viewTestCustomApp')}" was removed`
    );
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toBe(
      `mainMenuLink changed\n\tdefaultLabel changed: ${red(
        'Avengers'
      )} => ${green(
        'Justice league'
      )}\n\tpermission changed\n\t\tItem with "${green(
        'manageTestCustomApps'
      )}" added\n\t\tItem with "${red(
        'viewTestCustomApps'
      )}" removed\n\tlabelAllLocales changed\n\t\tlocale with "${green(
        'fr'
      )}" was added\n\t\tlocale with "en" was changed: ${red(
        'ipsum'
      )} => ${green('lorem ipsum')}\n\t\tlocale with "${red('de')}" was removed`
    );
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig)).toBe(
      `submenuLink changed\n\tItem with "custom-app/hello" was changed\n\t\tdefaultLabel changed: ${red(
        'hello'
      )} => ${green(
        'hello world'
      )}\n\t\tpermission changed\n\t\t\tItem with "${green(
        'ManageCustomApp'
      )}" added\n\t\t\tItem with "${red(
        'ManageOldCustomApp'
      )}" removed\n\t\tlabelAllLocales changed\n\t\t\tlocale with "de" was changed: ${red(
        'lorem'
      )} => ${green('ipsum')}\n\t\t\tlocale with "${green(
        'es'
      )}" was added\n\t\t\tlocale with "${red(
        'en'
      )}" was removed\n\tItem with "${green(
        'custom-app/ipsum'
      )}" was added\n\tItem with "${red('custom-app/lorem')}" was removed`
    );
  });
});
