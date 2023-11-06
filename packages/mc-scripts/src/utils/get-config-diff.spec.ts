import { getCustomApplicationConfigDiff } from './get-config-diff';

const createTestConfig = (customConfig = {}) => ({
  id: 'id',
  entryPointUriPath: 'my-test-app',
  name: 'test name',
  description: 'test description',
  url: 'https://test.com',
  icon: '<svg><path fill="#000000"></path></svg>',
  permissions: [],
  mainMenuLink: {
    defaultLabel: 'Test',
    labelAllLocales: [],
    permissions: [],
  },
  submenuLinks: [],
  ...customConfig,
});

describe('when there are no changes', () => {
  it('should display no diff', () => {
    expect(
      getCustomApplicationConfigDiff(createTestConfig(), createTestConfig())
    ).toBe('');
  });
});
describe('when there are changes', () => {
  it('should display diff if "name", "description", "icon", "url" changed', () => {
    const newConfig = createTestConfig({
      name: 'updated test name',
      description: 'updated description',
      url: 'https://updated-test.com',
      icon: '<svg><path fill="#ffffff"></path></svg>',
    });
    expect(getCustomApplicationConfigDiff(createTestConfig(), newConfig))
      .toMatchInlineSnapshot(`
      "name changed: <color-red>test name</color-red> => <color-green>updated test name</color-green>
      description changed: <color-red>test description</color-red> => <color-green>updated description</color-green>
      url changed: <color-red>https://test.com</color-red> => <color-green>https://updated-test.com</color-green>
      icon changed: <color-red><svg><path fill="#000000"></path></svg></color-red> => <color-green><svg><path fill="#ffffff"></path></svg></color-green>"
    `);
  });
  it('should display diff if "description" is removed', () => {
    const newConfig = createTestConfig({
      description: undefined,
    });
    expect(
      getCustomApplicationConfigDiff(createTestConfig(), newConfig)
    ).toMatchInlineSnapshot(
      `"description removed: <color-red>test description</color-red>"`
    );
  });

  it('should display diff for "permissions"', () => {
    const oldConfig = createTestConfig({
      permissions: [
        {
          name: 'viewMyTestApp',
          oAuthScopes: ['view_products', 'view_customers'],
        },
        { name: 'manageMyTestApp', oAuthScopes: ['manage_product'] },
        {
          name: 'viewMyTestAppMovies',
          oAuthScopes: ['view_products'],
        },
        { name: 'manageMyTestAppMovies', oAuthScopes: [] },
        {
          name: 'viewMyTestAppMerch',
          oAuthScopes: ['view_channels'],
        },
        { name: 'manageMyTestAppMerch', oAuthScopes: [] },
      ],
    });

    const newConfig = createTestConfig({
      permissions: [
        {
          name: 'viewMyTestApp',
          oAuthScopes: ['view_products', 'view_channel'],
        },
        {
          name: 'manageMyTestApp',
          oAuthScopes: ['manage_product', 'manage_channel'],
        },
        {
          name: 'viewMyTestAppMovies',
          oAuthScopes: ['view_products', 'view_channel'],
        },
        { name: 'manageMyTestAppMovies', oAuthScopes: [] },
        {
          name: 'viewMyTestAppCharacters',
          oAuthScopes: ['view_channels'],
        },
        { name: 'manageMyTestAppCharacters', oAuthScopes: [] },
      ],
    });

    expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
      .toMatchInlineSnapshot(`
      "permissions changed
        "viewMyTestApp" changed
          oauth scope added: <color-green>view_channel</color-green>
          oauth scope removed: <color-red>view_customers</color-red>
        "manageMyTestApp" changed
          oauth scope added: <color-green>manage_channel</color-green>
        "viewMyTestAppMovies" changed
          oauth scope added: <color-green>view_channel</color-green>
        "<color-green>viewMyTestAppCharacters</color-green>" was added
        "<color-green>manageMyTestAppCharacters</color-green>" was added
        "<color-red>viewMyTestAppMerch</color-red>" was removed
        "<color-red>manageMyTestAppMerch</color-red>" was removed"
    `);
  });

  describe('for "mainMenuLink"', () => {
    it('should display diff for "mainMenuLink" when assigning new permissions', () => {
      const oldConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [],
        },
      });

      const newConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: ['ViewMyTestApp'],
          labelAllLocales: [],
        },
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "mainMenuLink changed
          permissions changed
            applied permission added: <color-green>ViewMyTestApp</color-green>"
      `);
    });
    it('should display diff for "mainMenuLink" when removing permissions', () => {
      const oldConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: ['ViewMyTestApp'],
          labelAllLocales: [],
        },
      });

      const newConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [],
        },
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "mainMenuLink changed
          permissions changed
            applied permission removed: <color-red>ViewMyTestApp</color-red>"
      `);
    });
    it('should display diff for "mainMenuLink" when assigning new labels', () => {
      const oldConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [],
        },
      });

      const newConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [{ locale: 'de', value: 'Die Avengers' }],
        },
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "mainMenuLink changed
          labelAllLocales changed
            locale added: <color-green>de</color-green>"
      `);
    });
    it('should display diff for "mainMenuLink" when removing labels', () => {
      const oldConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [{ locale: 'de', value: 'Die Avengers' }],
        },
      });

      const newConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: [],
          labelAllLocales: [],
        },
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "mainMenuLink changed
          labelAllLocales changed
            locale removed: <color-red>de</color-red>"
      `);
    });
    it('should display multiple diff for changes of existing "mainMenuLink"', () => {
      const oldConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Avengers',
          permissions: ['ViewMyTestApp'],
          labelAllLocales: [
            {
              locale: 'de',
              value: 'Die Avengers',
            },
            {
              locale: 'en',
              value: 'The Avengers',
            },
          ],
        },
      });

      const newConfig = createTestConfig({
        mainMenuLink: {
          defaultLabel: 'Justice League',
          permissions: ['ManageMyTestApp'],
          labelAllLocales: [
            {
              locale: 'de',
              value: 'Die Justice League',
            },
            {
              locale: 'it',
              value: 'La Justice League',
            },
          ],
        },
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "mainMenuLink changed
          defaultLabel changed: <color-red>Avengers</color-red> => <color-green>Justice League</color-green>
          permissions changed
            applied permission added: <color-green>ManageMyTestApp</color-green>
            applied permission removed: <color-red>ViewMyTestApp</color-red>
          labelAllLocales changed
            locale "de" changed: <color-red>Die Avengers</color-red> => <color-green>Die Justice League</color-green>
            locale added: <color-green>it</color-green>
            locale removed: <color-red>en</color-red>"
      `);
    });
  });

  describe('for "submenuLinks"', () => {
    it('should display diff for "submenuLinks" when adding a new menu link', () => {
      const oldConfig = createTestConfig({
        submenuLinks: [],
      });

      const newConfig = createTestConfig({
        submenuLinks: [
          {
            uriPath: 'my-test-app/new',
            defaultLabel: 'New Avenger',
            permissions: ['ManageMyTestApp'],
            labelAllLocales: [
              {
                locale: 'de',
                value: 'Neu Avenger',
              },
            ],
          },
        ],
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "submenuLink changed
          menu link added: <color-green>my-test-app/new</color-green>"
      `);
    });
    it('should display diff for "submenuLinks" when removing a menu link', () => {
      const oldConfig = createTestConfig({
        submenuLinks: [
          {
            uriPath: 'my-test-app/new',
            defaultLabel: 'New Avenger',
            permissions: ['ManageMyTestApp'],
            labelAllLocales: [
              {
                locale: 'de',
                value: 'Neu Avenger',
              },
            ],
          },
        ],
      });

      const newConfig = createTestConfig({
        submenuLinks: [],
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "submenuLink changed
          menu link removed: <color-red>my-test-app/new</color-red>"
      `);
    });
    it('should display multiple diff for changes of existing "submenuLinks"', () => {
      const oldConfig = createTestConfig({
        submenuLinks: [
          {
            uriPath: 'my-test-app/new',
            defaultLabel: 'New Avenger',
            permissions: ['ManageMyTestApp'],
            labelAllLocales: [
              {
                locale: 'de',
                value: 'Neu Avenger',
              },
              {
                locale: 'en',
                value: 'Add Avenger',
              },
            ],
          },
        ],
      });

      const newConfig = createTestConfig({
        submenuLinks: [
          {
            uriPath: 'my-test-app/new',
            defaultLabel: 'Add Avenger',
            permissions: [],
            labelAllLocales: [
              {
                locale: 'de',
                value: 'Avenger hinzufügen',
              },
              {
                locale: 'it',
                value: 'Nuovo Avenger',
              },
            ],
          },
        ],
      });

      expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "submenuLink changed
          menu link "my-test-app/new" changed
            defaultLabel changed: <color-red>New Avenger</color-red> => <color-green>Add Avenger</color-green>
            permissions changed
              applied permission removed: <color-red>ManageMyTestApp</color-red>
            labelAllLocales changed
              locale "de" changed: <color-red>Neu Avenger</color-red> => <color-green>Avenger hinzufügen</color-green>
              locale added: <color-green>it</color-green>
              locale removed: <color-red>en</color-red>"
      `);
    });
  });
});
