import {
  getCustomApplicationConfigDiff,
  getCustomViewConfigDiff,
} from './get-config-diff';

const createTestCustomApplicationConfig = (customConfig = {}) => ({
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

const createTestCustomViewConfig = (customConfig = {}) => ({
  id: 'id',
  defaultLabel: 'test name',
  description: 'test description',
  url: 'https://test.com',
  locators: [
    'products.product_variant_details.images',
    'customers.customer_details.custom_fields',
  ],
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  permissions: [],
  labelAllLocales: [{ locale: 'en', value: 'custom-view' }],
  ...customConfig,
});

describe('Custom Application Config Diff', () => {
  describe('when there are no changes', () => {
    it('should display no diff', () => {
      expect(
        getCustomApplicationConfigDiff(
          createTestCustomApplicationConfig(),
          createTestCustomApplicationConfig()
        )
      ).toBe('');
    });
  });
  describe('when there are changes', () => {
    it('should display diff if "name", "description", "icon", "url" changed', () => {
      const newConfig = createTestCustomApplicationConfig({
        name: 'updated test name',
        description: 'updated description',
        url: 'https://updated-test.com',
        icon: '<svg><path fill="#ffffff"></path></svg>',
      });
      expect(
        getCustomApplicationConfigDiff(
          createTestCustomApplicationConfig(),
          newConfig
        )
      ).toMatchInlineSnapshot(`
        "name changed: <color-red>test name</color-red> => <color-green>updated test name</color-green>
        description changed: <color-red>test description</color-red> => <color-green>updated description</color-green>
        url changed: <color-red>https://test.com</color-red> => <color-green>https://updated-test.com</color-green>
        icon changed: <color-red><svg><path fill="#000000"></path></svg></color-red> => <color-green><svg><path fill="#ffffff"></path></svg></color-green>"
      `);
    });
    it('should display diff if "description" is removed', () => {
      const newConfig = createTestCustomApplicationConfig({
        description: undefined,
      });
      expect(
        getCustomApplicationConfigDiff(
          createTestCustomApplicationConfig(),
          newConfig
        )
      ).toMatchInlineSnapshot(
        `"description removed: <color-red>test description</color-red>"`
      );
    });

    it('should display diff for "permissions"', () => {
      const oldConfig = createTestCustomApplicationConfig({
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

      const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
          mainMenuLink: {
            defaultLabel: 'Avengers',
            permissions: [],
            labelAllLocales: [],
          },
        });

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
          mainMenuLink: {
            defaultLabel: 'Avengers',
            permissions: ['ViewMyTestApp'],
            labelAllLocales: [],
          },
        });

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
          mainMenuLink: {
            defaultLabel: 'Avengers',
            permissions: [],
            labelAllLocales: [],
          },
        });

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
          mainMenuLink: {
            defaultLabel: 'Avengers',
            permissions: [],
            labelAllLocales: [{ locale: 'de', value: 'Die Avengers' }],
          },
        });

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
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

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
          submenuLinks: [],
        });

        const newConfig = createTestCustomApplicationConfig({
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
        const oldConfig = createTestCustomApplicationConfig({
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

        const newConfig = createTestCustomApplicationConfig({
          submenuLinks: [],
        });

        expect(getCustomApplicationConfigDiff(oldConfig, newConfig))
          .toMatchInlineSnapshot(`
          "submenuLink changed
            menu link removed: <color-red>my-test-app/new</color-red>"
        `);
      });
      it('should display multiple diff for changes of existing "submenuLinks"', () => {
        const oldConfig = createTestCustomApplicationConfig({
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

        const newConfig = createTestCustomApplicationConfig({
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
});
describe('Custom View Config Diff', () => {
  describe('when there are no changes', () => {
    it('should display no diff', () => {
      expect(
        getCustomViewConfigDiff(
          createTestCustomViewConfig(),
          createTestCustomViewConfig()
        )
      ).toBe('');
    });
  });
  describe('when there are changes', () => {
    it('should display diff if "defaultLabel", "description", "url" changed', () => {
      const newConfig = createTestCustomViewConfig({
        defaultLabel: 'updated test name',
        description: 'updated description',
        url: 'https://updated-test.com',
      });
      expect(getCustomViewConfigDiff(createTestCustomViewConfig(), newConfig))
        .toMatchInlineSnapshot(`
        "defaultLabel changed: <color-red>test name</color-red> => <color-green>updated test name</color-green>
        description changed: <color-red>test description</color-red> => <color-green>updated description</color-green>
        url changed: <color-red>https://test.com</color-red> => <color-green>https://updated-test.com</color-green>"
      `);
    });
    it('should display diff if "description" is removed', () => {
      const newConfig = createTestCustomViewConfig({
        description: undefined,
      });
      expect(
        getCustomViewConfigDiff(createTestCustomViewConfig(), newConfig)
      ).toMatchInlineSnapshot(
        `"description removed: <color-red>test description</color-red>"`
      );
    });

    it('should display diff for "permissions"', () => {
      const oldConfig = createTestCustomViewConfig({
        permissions: [
          {
            name: 'viewMyTestView',
            oAuthScopes: ['view_products', 'view_customers'],
          },
          { name: 'manageMyTestView', oAuthScopes: ['manage_product'] },
          {
            name: 'viewMyTestViewMovies',
            oAuthScopes: ['view_products'],
          },
          { name: 'manageMyTestViewMovies', oAuthScopes: [] },
          {
            name: 'viewMyTestViewMerch',
            oAuthScopes: ['view_channels'],
          },
          { name: 'manageMyTestViewMerch', oAuthScopes: [] },
        ],
      });

      const newConfig = createTestCustomViewConfig({
        permissions: [
          {
            name: 'viewMyTestView',
            oAuthScopes: ['view_products', 'view_channel'],
          },
          {
            name: 'manageMyTestView',
            oAuthScopes: ['manage_product', 'manage_channel'],
          },
          {
            name: 'viewMyTestViewMovies',
            oAuthScopes: ['view_products', 'view_channel'],
          },
          { name: 'manageMyTestViewMovies', oAuthScopes: [] },
          {
            name: 'viewMyTestViewCharacters',
            oAuthScopes: ['view_channels'],
          },
          { name: 'manageMyTestViewCharacters', oAuthScopes: [] },
        ],
      });

      expect(getCustomViewConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "permissions changed
          "viewMyTestView" changed
            oauth scope added: <color-green>view_channel</color-green>
            oauth scope removed: <color-red>view_customers</color-red>
          "manageMyTestView" changed
            oauth scope added: <color-green>manage_channel</color-green>
          "viewMyTestViewMovies" changed
            oauth scope added: <color-green>view_channel</color-green>
          "<color-green>viewMyTestViewCharacters</color-green>" was added
          "<color-green>manageMyTestViewCharacters</color-green>" was added
          "<color-red>viewMyTestViewMerch</color-red>" was removed
          "<color-red>manageMyTestViewMerch</color-red>" was removed"
      `);
    });

    it('should display diff for "typeSettings"', () => {
      const oldConfig = createTestCustomViewConfig({
        typeSettings: {
          size: 'LARGE',
        },
      });

      const newConfig = createTestCustomViewConfig({
        typeSettings: {
          size: 'SMALL',
        },
      });

      expect(getCustomViewConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
          "type settings changed
            size changed: <color-red>LARGE</color-red> => <color-green>SMALL</color-green>"
        `);
    });

    it('should display diff for "labelAllLocales"', () => {
      const oldConfig = createTestCustomViewConfig({
        labelAllLocales: [{ locale: 'en', value: 'custom-view' }],
      });

      const newConfig = createTestCustomViewConfig({
        labelAllLocales: [
          { locale: 'en', value: 'custom-view-en' },
          { locale: 'de', value: 'custom-view-de' },
        ],
      });

      expect(getCustomViewConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
          "labelAllLocales changed
            locale "en" changed: <color-red>custom-view</color-red> => <color-green>custom-view-en</color-green>
            locale added: <color-green>de</color-green>"
        `);
    });

    it('should display diff for "locators"', () => {
      const oldConfig = createTestCustomViewConfig();

      const newConfig = createTestCustomViewConfig({
        locators: [
          'customers.customer_details.custom_fields',
          'customers.customer_details.another_one',
        ],
      });

      expect(getCustomViewConfigDiff(oldConfig, newConfig))
        .toMatchInlineSnapshot(`
        "locators changed
          locators added: <color-green>customers.customer_details.another_one</color-green>
          locators removed: <color-red>products.product_variant_details.images</color-red>"
        `);
    });
  });
});
