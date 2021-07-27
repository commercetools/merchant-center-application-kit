---
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/assets': minor
'@commercetools-frontend/constants': minor
'@commercetools-frontend/cypress': minor
'@commercetools-frontend/mc-html-template': minor
'playground': minor
---

Introduce a new configuration option for defining menu links when developing a Custom Application.

At the moment, menu links are expected to be defined in a `menu.json` file and loaded by the Custom Application using a special prop `DEV_ONLY__loadNavbarMenuConfig` passed to the `<ApplicationShell>`. Something like this:

```js
<ApplicationShell
  // ...
  DEV_ONLY__loadNavbarMenuConfig={() =>
    import('../../../menu.json').then((data) => data.default || data)
  }
/>
```

This poses some issues and confusion:

* The prop `DEV_ONLY__loadNavbarMenuConfig` is confusing, and users have to explicitly load the `menu.json` with code splitting, to avoid having the content in the production bundles.
* The content of the `menu.json` is not validated at all, relying on try-error approaches from the users.
* The `menu.json` is not really documented.
* Having an extra `menu.json` file besides the `custom-application-config.json` is not ideal.

Now we support defining the menu links in the `custom-application-config.json` itself, which aims to solve all the issues mentioned before. It also comes with some additional improvements such as:

* Less configuration fields.
* Support for two new variable placeholders:
  * `intl`: Given that menu labels are translated, you can reference a translation using the following syntax: `${intl:<local>:<translation_key>}`, for example `${intl:en:Menu.Avengers}`.
  * `path`: Reference a file to load the its content and inline it. This is usually useful for SVG icons. The path can be relative to the application folder, for example `${path:./app.svg}`, or from a module, for example `${path:@commercetools-frontend/assets/application-icons/heart.svg}`.

> NOTE: This is an opt-in feature and is meant to replace the `menu.json` approach. For now it's fully backwards compatible.

The menu links can be defined in the `custom-application-config.json` using the field `menuLinks`. You can check the JSON schema to inspect the supported fields.

Example:

```json
{
  // ...
  "menuLinks": {
    "icon": "${path:@commercetools-frontend/assets/application-icons/rocket.svg}",
    "defaultLabel": "${intl:en:Menu.StateMachines}",
    "labelAllLocales": [
      {
        "locale": "en",
        "value": "${intl:en:Menu.StateMachines}"
      },
      {
        "locale": "de",
        "value": "${intl:de:Menu.StateMachines}"
      }
    ],
    "submenuLinks": [
      {
        "uriPath": "echo-server",
        "defaultLabel": "${intl:en:Menu.EchoServer}",
        "labelAllLocales": [
          {
            "locale": "en",
            "value": "${intl:en:Menu.EchoServer}"
          },
          {
            "locale": "de",
            "value": "${intl:de:Menu.EchoServer}"
          }
        ]
      }
    ]
  }
}
```
