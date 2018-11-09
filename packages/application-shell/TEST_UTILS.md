# Test Utils

We want to make it easy to test features of the application you're building with `ApplicationShell`. `ApplicationShell` renders your components with quite some context. It should be easy to influence this context in the tests so that your component can be tested under different circumstances as rendered by `ApplicationShell`.

The `ApplicationShell` provides the following context:

- `IntlProvider` for i18n and l10n ([`react-intl`](https://github.com/yahoo/react-intl))
- `ApolloProvider` for GraphQL ([`react-apollo`](https://github.com/apollographql/react-apollo))
- `ConfigureFlopFlip` for feature-toggles ([`flopflip`](https://github.com/tdeekens/flopflip))
- `ApplicationContextprovider` for information about the MC application like `user`, `project`, `environment`, `dataLocale` and `permissions` ([`application-shell-connectors`](https://github.com/commercetools/merchant-center-application-kit/blob/master/packages/application-shell-connectors/src/components/application-context/README.md))
- `Router` for routing ([`react-router`](https://github.com/ReactTraining/react-router))

## Table of Contents

- [react-testing-library](#react-testing-library)
- [test-utils](#test-utils-1)
  - [Basics](#basics)
  - [API](#api)
    - [render(ui: ReactElement, options: Object)](#renderui-reactelement-options-object)
    - [rtlRender(ui: ReactElement, options: Object)](#rtlrenderui-reactelement-options-object)
  - [Examples](#examples)
    - [`locale` (`react-intl`)](#locale-react-intl)
    - [`dataLocale` (Localisation)](#datalocale-localisation)
    - [`mocks` (GraphQL)](#mocks-graphql)
    - [`flags` (Feature Flags)](#flags-feature-flags)
    - [Application Contenxt](#application-context)
    - [Permissions](#permissions)
    - [Router (`react-router`)](#router-react-router)

## `react-testing-library`

[`react-testing-library`](https://github.com/kentcdodds/react-testing-library) allows you to interact with the component using the DOM. It is a great testing library due to its philosophy of testing from a user-perspective, instead of testing the implementation. The assertions are written against the produced DOM, and the component-under-test is interacted with using DOM events.

The `render` method exposed by `react-testing-library` is used to render your component and returns a bunch of getters to query the DOM produced by the component-under-test. `ApplicationShell`s `test-utils` export an enhanced `render` method which adds more context to the component-under-test, so that it can be rendered as-if it was rendered by `ApplicationShell` itself.

## `test-utils`

### Basics

This section will introduce you to testing with `test-utils`.
Let's assume a simple component which prints the authenticated user's first name.

```jsx
const FirstName = () => (
  <ApplicationContext
    render={applicationContext =>
      applicationContext.user ? applicationContext.user.firstName : 'Anonymous'
    }
  />
);
```

This component uses `ApplicationContext` which allows it to access the `applicationContext` provided by `ApplicationShell`.

A test which verifies the authenticated user's first name being rendered by this component can look like this:

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';

describe('FirstName', () => {
  it('should render the authenticated users first name', () => {
    const { container, user } = render(<FirstName />);
    expect(container).toHaveTextContent('Sheldon');
  });
});
```

This test renders the `FirstName` component and then verifies that the name _"Sheldon"_ gets printed. _"Sheldon"_ is the name of our default user in tests. You can find the default test data [here](packages/application-shell/src/test-utils.js).

We can make the test more robust by explicitly declaring the authenticated users first name. This ensures the test keeps working even when the defaults change, and makes it easier to follow.

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';

describe('FirstName', () => {
  it('should render the authenticated users first name', () => {
    const { container, user } = render(<FirstName />, {
      user: {
        firstName: 'Leonard',
      },
    });
    expect(container).toHaveTextContent('Leonard');
  });
});
```

Here we overwrite the authenticated user's `firstName` for our test. The data we pass in gets merged with the default data.

We can also test the case in which no user is authenticated by passing `{ user: null }`:

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';

describe('FirstName', () => {
  it('should render the authenticated users first name', () => {
    const { container, user } = render(<FirstName />, { user: null });
    expect(container).toHaveTextContent('Anonymous');
  });
});
```

When passing `null` for `user` the default `user` will not be added to the context and the component-under-test will get rendered as-if no user was authenticated. This also works for `project`, `permissions` and `environment` as you will see below.

### API

This section describes the methods exported by `@commercetools-frontend/application-shell/test-utils`.

`test-utils` is builds on top of `react-testing-library`, so all `react-testing-library` exports are available. It should not be necessary for you to import `react-testing-library` into your tests. The following section describes the additional exports added on top of `react-testing-library` and the overwritten `render` of `react-testing-library` itself.

#### `render(ui: ReactElement, options: Object)`

| Argument              | Type          | Concern             | Description                                                                                                                                                                                                                                                                       |
| --------------------- | ------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui`                  | React Element | React               | React Element to render.                                                                                                                                                                                                                                                          |
| `options.locale`      | `String`      | Localisation        | Determines the UI language and number format, is used to configure `IntlProvider`. Only _core_ messages will be available during tests, no matter the `locale`.                                                                                                                   |
| `options.dataLocale`  | `String`      | Localisation        | Sets the locale which is used to display [`LocalizedString`](https://docs.commercetools.com/http-api-types#localizedstring)s.                                                                                                                                                     |
| `options.mocks`       | `Array`       | Apollo              | Allows to mock requests made with Apollo. `mocks` is forwareded as the `mocks` argument to [`MockedProvider`](https://www.apollographql.com/docs/guides/testing-react-components.html#MockedProvider).                                                                            |
| `options.addTypename` | `Boolean`     | Apollo              | If queries are lacking `__typename` (which happens when mocking) it’s important to pass `addTypename: false`, which is the default. See [`MockedProvider.addTypename`](https://www.apollographql.com/docs/guides/testing-react-components.html#addTypename) for more information. |
| `options.route`       | `String`      | Routing             | The route the user is on, like `/test-project/products`. Defaults to `/`.                                                                                                                                                                                                         |
| `options.history`     | `Object`      | Routing             | By default a memory-history is generated which has the provided `options.route` set as its initial history entry. It's possible to pass a compeltely custom history.                                                                                                              |
| `options.adapter`     | `Object`      | Feature Toggles     | The [flopflip](https://github.com/tdeekens/flopflip) adapter to use when configuring `flopflip`. Defaults to [`memoryAdapter`](https://github.com/tdeekens/flopflip/tree/master/packages/memory-adapter).                                                                         |
| `options.flags`       | `Object`      | Feature Toggles     | An object whose keys are feature-toggles and whose values are their toggle state. Use this to test your component with different feature toggle combinations.                                                                                                                     |
| `options.environment` | `Object`      | Application Context | Allows to set the `applicationContext.environment`. The passed object gets merged with the tests default environment. Pass `null` to completely remove the `environment`, which renders the `ui` as if no `environment` was given.                                                |
| `options.user`        | `Object`      | Application Context | Allows to set the `applicationContext.user`. The passed object gets merged with the tests default user. Pass `null` to completely remove the `environment`, which renders the `ui` as if no user was authenticated.                                                               |
| `options.project`     | `Object`      | Application Context | Allows to set the `applicationContext.project`. The passed object gets merged with the tests default project. Pass `null` to completely remove the `project` which renders the `ui` outside of a project context.                                                                 |
| `options.permissions` | `Object`      | Application Context | Use `options.permissions` to influence the user's permissions in the project. The permissions will overwrite the default permissions. Default permissions are `{ canManageProject: true }` which grants permission for everything.                                                |

**Additional return values**

Calling `render` returns an object which contains all keys `react-testing-library`'s `render` method contains, but also contains these additional entries:

| Entry         | Type     | Description                                                                                                                                                                                                                                                                                                       |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `history`     | `Object` | The history created by `render` which is passed to the rotuer. It can be used to simulate location changes and so on.                                                                                                                                                                                             |
| `user`        | `Object` | The `user` object used to configure `ApplicationContextProvider`, so the result of merging the default user with `options.user`. Note that this is not the same as `applicationContext.user`. Can be `undefined` when no user is authenticated (when `options.user` was `null`).                                  |
| `project`     | `Object` | The `project` object used to configure `ApplicationContextProvider`, so the result of merging the default project with `options.project`. Note that this is not the same as `applicationContext.project`. Can be `undefined` when no project was set (when `options.project` was `null`).                         |
| `environment` | `Object` | The `environment` object used to configure `ApplicationContextProvider`, so the result of merging the default environment with `options.environment`. Note that this is not the same as `applicationContext.environment`. Can be `undefined` when no environment was set (when `options.environment` was `null`). |

#### `rtlRender(ui: ReactElement, options: Object)`

This is the renamed original bare-bones `render` method of `react-testing-library`. `rtl` is short for `react-testing-library`. See the the original [`render` documentation](https://github.com/kentcdodds/react-testing-library#render).

### Examples

#### `locale` (`react-intl`)

The component-under- rendered with `render` will get rendered in `react-intl`s `IntlProvider`. During tests, the core-messages will be used. It's still possible to use a different locale though.

```jsx
const Flag = props => {
  if (props.intl.locale.startsWith('en-US')) return '🇺🇸';
  if (props.intl.locale.startsWith('en')) return '🇬🇧';
  if (props.intl.locale.startsWith('de')) return '🇩🇪';
  return '🏳️';
};

export default injectIntl(Flag);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import Flag from './flag';

describe('Flag', () => {
  it('should render the british flag when the locale is english', () => {
    const { container } = render(<Flag />);
    expect(container).toHaveTextContent('🇬🇧');
  });
  it('should render the german flag when the locale is german', () => {
    const { container } = render(<Flag />, { locale: 'de' });
    expect(container).toHaveTextContent('🇩🇪');
  });
});
```

#### `dataLocale` (Localisation)

```jsx
export const ProductName = props => (
  <ApplicationContext
    render={applicationContext =>
      props.product.name[applicationContext.project.dataLocale]
    }
  />
);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import { ProductName } from './product-name';

describe('ProductName', () => {
  const partyParrot = {
    name: { en: 'Party Parrot', de: 'Party Papagei' },
  };
  it('should render the product name in the given data locale', async () => {
    const { container } = render(<ProductName product={partyParrot} />, {
      dataLocale: 'en',
    });
    expect(container).toHaveTextContent('Party Parrot');
  });
  it('should render the product name in the given data locale', async () => {
    const { container } = render(<ProductName product={partyParrot} />, {
      dataLocale: 'de',
    });
    expect(container).toHaveTextContent('Party Papagei');
  });
});
```

#### `mocks` (GraphQL)

```jsx
import gql from 'graphql-tag';

export const BankAccountBalanceQuery = gql`
  query BankAccountBalanceQuery {
    account {
      balance
    }
  }
`;
export const BankAccountBalance = props => (
  <Query query={BankAccountBalanceQuery} variables={{ token: props.token }}>
    {payload => {
      if (!payload || !payload.data || !payload.data.account)
        return 'Loading..';
      return `Your balance is ${payload.data.account.balance}€`;
    }}
  </Query>
);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import {
  BankAccountBalance,
  BankAccountBalanceQuery,
} from './bank-account-balance';

describe('BankAccountBalance', () => {
  it('should render the balance', async () => {
    const { container } = render(<BankAccountBalance token="foo-bar" />, {
      mocks: [
        {
          request: {
            query: BankAccountBalanceQuery,
            variables: { token: 'foo-bar' },
          },
          result: { data: { account: { balance: 300 } } },
        },
      ],
    });
    expect(container).toHaveTextContent('Loading..');
    await wait(() => {
      expect(container).toHaveTextContent('Your balance is 300€');
    });
  });
});
```

#### `flags` (Feature Flags)

```jsx
const Profile = props => (
  <div>
    {props.name}
    {props.showAge && `(${props.age})`}
  </div>
);

export default injectFeatureToggle('experimentalAgeOnProfileFlag', 'showAge')(
  Profile
);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import Profile from './profile';

describe('Profile', () => {
  const baseProps = { name: 'Penny', age: 32 };

  it('should show no age when feature is toggled off', () => {
    const { container } = render(<Profile {...baseProps} />, {
      flags: { experimentalAgeOnProfileFlag: false },
    });
    expect(container).toHaveTextContent('Penny');
    expect(container).not.toHaveTextContent('32');
  });

  it('should show age when feature toggle is on', () => {
    const { container } = render(<Profile {...baseProps} />, {
      flags: { experimentalAgeOnProfileFlag: true },
    });
    expect(container).toHaveTextContent('Penny (32)');
  });
});
```

#### Application Context

See the [Basics](#basics) example. The same works for `project` and `environment` as well. Check out [`ApplicationContext`](https://github.com/commercetools/merchant-center-application-kit/blob/master/packages/application-shell-connectors/src/components/application-context/README.md) to learn about the details of `applicationContext` like `user`, `project`, `permissions` and `environment`.

#### Permissions

```jsx
const DeleteProductButton = () => (
  <RestrictedByPermissions
    permissions={[{ mode: 'manage', resource: 'products' }]}
  >
    {({ isAuthorized }) => (
      <button type="button" onClick={() => {}} disabled={!isAuthorized}>
        Delete Product
      </button>
    )}
  </RestrictedByPermissions>
);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import DeleteProductButton from './delete-product-button';

describe('DeleteProductButton', () => {
  it('should be disabled when the user does not have permission to manage products', () => {
    const { getByText } = render(<DeleteProductButton />, {
      permissions: { canManageProducts: false },
    });
    expect(getByText('Delete Product')).toBeDisabled();
  });
  it('should be enabled when the user has permission to manage products', () => {
    const { getByText } = render(<DeleteProductButton />, {
      permissions: { canManageProducts: true },
    });
    expect(getByText('Delete Product')).not.toBeDisabled();
  });
});
```

#### Router (`react-router`)

```jsx
import { Switch, Route, Redirect } from 'react-router';

export const ProductTabs = () => (
  <Switch>
    <Route path="/products/:productId/general" render={() => 'General'} />
    <Route path="/products/:productId/pricing" render={() => 'Pricing'} />
    {/* Define a catch-all route */}
    <Redirect from="/products/:productId" to="/products/:productId/general" />
  </Switch>
);
```

```jsx
import { render } from '@commercetools-frontend/application-shell/test-utils';
import ProductTabs from './product-tabs';

describe('router', () => {
  it('should redirect to "general" when no tab is given', () => {
    const { container } = render(<ProductTabs />, {
      route: '/products/party-parrot',
    });
    expect(container).toHaveTextContent('General');
  });
  it('should render "general" when on general tab', () => {
    const { container } = render(<ProductTabs />, {
      route: '/products/party-parrot/general',
    });
    expect(container).toHaveTextContent('General');
  });
  it('should render "pricing" when on pricing tab', () => {
    const { container } = render(<ProductTabs />, {
      route: '/products/party-parrot/pricing',
    });
    expect(container).toHaveTextContent('Pricing');
  });
});
```
