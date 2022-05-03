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
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toMatchInlineSnapshot(
      `"name changed: [31mtest name[39m => [32mupdated test name[39m"`
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
    expect(getConfigDiff(oldConfig, updatedNewConfig)).toMatchInlineSnapshot(`
      "name changed: [31mtest name[39m => [32mupdated test name[39m
      description changed: [31mtest description[39m => [32mupdated description[39m
      url changed: [31mhttps://test.com[39m => [32mhttps://updated-test.com[39m
      icon changed: [31m<svg><path fill=\\"#000000\\"></path></svg>[39m => [32m<svg><path fill=\\"#ffffff\\"></path></svg>[39m"
    `);
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "permissions changed
        manageTestCustomApp changed
          Item with \\"[32mmanage_customer[39m\\" added
          Item with \\"[31mmanage_product[39m\\" removed
        \\"[32mviewTestCustomApps[39m\\" was added
        \\"[31mviewTestCustomApp[39m\\" was removed"
    `);
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "mainMenuLink changed
        defaultLabel changed: [31mAvengers[39m => [32mJustice league[39m
        permission changed
          Item with \\"[32mmanageTestCustomApps[39m\\" added
          Item with \\"[31mviewTestCustomApps[39m\\" removed
        labelAllLocales changed
          locale with \\"[32mfr[39m\\" was added
          locale with \\"en\\" was changed: [31mipsum[39m => [32mlorem ipsum[39m
          locale with \\"[31mde[39m\\" was removed"
    `);
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

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "submenuLink changed
        Item with \\"custom-app/hello\\" was changed
          defaultLabel changed: [31mhello[39m => [32mhello world[39m
          permission changed
            Item with \\"[32mManageCustomApp[39m\\" added
            Item with \\"[31mManageOldCustomApp[39m\\" removed
          labelAllLocales changed
            locale with \\"de\\" was changed: [31mlorem[39m => [32mipsum[39m
            locale with \\"[32mes[39m\\" was added
            locale with \\"[31men[39m\\" was removed
        Item with \\"[32mcustom-app/ipsum[39m\\" was added
        Item with \\"[31mcustom-app/lorem[39m\\" was removed"
    `);
  });
});
