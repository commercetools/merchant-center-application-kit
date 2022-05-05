const getConfigDiff = require('./get-config-diff');

const createTestConfig = (customConfig) => ({
  name: 'test name',
  description: 'test description',
  url: 'https://test.com',
  icon: '<svg><path fill="#000000"></path></svg>',
  permissions: [],
  mainMenuLink: {},
  submenuLinks: [],
  ...customConfig,
});

describe('getConfigDiff', () => {
  it('should display no diff', () => {
    expect(getConfigDiff(createTestConfig(), createTestConfig())).toBe('');
  });

  it('should display name diff', () => {
    const updatedNewConfig = createTestConfig({
      name: 'updated test name',
    });
    expect(
      getConfigDiff(createTestConfig(), updatedNewConfig)
    ).toMatchInlineSnapshot(
      `"name changed: <color-red>test name)</color-red> => <color-green>(updated test name)</color-green>"`
    );
  });

  it('should display diff for name, description, icon, url', () => {
    const updatedNewConfig = createTestConfig({
      name: 'updated test name',
      description: 'updated description',
      url: 'https://updated-test.com',
      icon: '<svg><path fill="#ffffff"></path></svg>',
    });
    expect(getConfigDiff(createTestConfig(), updatedNewConfig))
      .toMatchInlineSnapshot(`
      "name changed: <color-red>test name)</color-red> => <color-green>(updated test name)</color-green>
      description changed: <color-red>test description)</color-red> => <color-green>(updated description)</color-green>
      url changed: <color-red>https://test.com)</color-red> => <color-green>(https://updated-test.com)</color-green>
      icon changed: <color-red><svg><path fill=\\"#000000\\"></path></svg>)</color-red> => <color-green>(<svg><path fill=\\"#ffffff\\"></path></svg>)</color-green>"
    `);
  });

  it('should display diff for permissions', () => {
    const updatedOldConfig = createTestConfig({
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
    });

    const updatedNewConfig = createTestConfig({
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
    });

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "permissions changed
        manageTestCustomApp changed
          Item with \\"<color-green>(manage_customer)</color-green>\\" added
          Item with \\"<color-red>manage_product)</color-red>\\" removed
        \\"<color-green>(viewTestCustomApps)</color-green>\\" was added
        \\"<color-red>viewTestCustomApp)</color-red>\\" was removed"
    `);
  });

  it('should display diff for mainMenuLink', () => {
    const updatedOldConfig = createTestConfig({
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
    });

    const updatedNewConfig = createTestConfig({
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
    });

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "mainMenuLink changed
        defaultLabel changed: <color-red>Avengers)</color-red> => <color-green>(Justice league)</color-green>
        permission changed
          Item with \\"<color-green>(manageTestCustomApps)</color-green>\\" added
          Item with \\"<color-red>viewTestCustomApps)</color-red>\\" removed
        labelAllLocales changed
          locale with \\"<color-green>(fr)</color-green>\\" was added
          locale with \\"en\\" was changed: <color-red>ipsum)</color-red> => <color-green>(lorem ipsum)</color-green>
          locale with \\"<color-red>de)</color-red>\\" was removed"
    `);
  });

  it('should display diff for submenuLink', () => {
    const updatedOldConfig = createTestConfig({
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
    });

    const updatedNewConfig = createTestConfig({
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
    });

    expect(getConfigDiff(updatedOldConfig, updatedNewConfig))
      .toMatchInlineSnapshot(`
      "submenuLink changed
        Item with \\"custom-app/hello\\" was changed
          defaultLabel changed: <color-red>hello)</color-red> => <color-green>(hello world)</color-green>
          permission changed
            Item with \\"<color-green>(ManageCustomApp)</color-green>\\" added
            Item with \\"<color-red>ManageOldCustomApp)</color-red>\\" removed
          labelAllLocales changed
            locale with \\"de\\" was changed: <color-red>lorem)</color-red> => <color-green>(ipsum)</color-green>
            locale with \\"<color-green>(es)</color-green>\\" was added
            locale with \\"<color-red>en)</color-red>\\" was removed
        Item with \\"<color-green>(custom-app/ipsum)</color-green>\\" was added
        Item with \\"<color-red>custom-app/lorem)</color-red>\\" was removed"
    `);
  });
});
