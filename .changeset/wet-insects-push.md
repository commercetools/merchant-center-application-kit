---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/application-config': minor
'@commercetools-frontend/application-shell': minor
'@commercetools-frontend/mc-html-template': minor
'@commercetools-frontend/mc-http-server': minor
'@commercetools-frontend/mc-scripts': minor
'playground': minor
'@commercetools-local/visual-testing-app': minor
---

This release introduces the usage of a new configuration file format and marks the deprecation of the `env.json` and `headers.json` files.

> The `env.json` and `headers.json` files will still keep working but they will be removed in the next major release.

The new configuration format aims to drastically simplify how to configure the Custom Application, as well as to make the configuration process less error prone.
In fact, the new configuration file is backed by a JSON schema that is shipped together with the new package. The configuration file is then validated against the JSON schema.

Furthermore, the new configuration file tries to infer as many required information as possible.

**Migrate to the new configuration file**

The new configuration file is a JSON file with one of the following names:

- `.custom-application-configrc`
- `.custom-application-config.json`
- `custom-application-config.json`

The file is automatically loaded by the other packages, so you don't need to explicitly specify it in, for example, the `mc-scripts` commands.

> The file needs to be located in the project root folder.

For example, given the following `env.json` and `headers.json` files:

```json
{
  "applicationName": "Avengers app",
  "frontendHost": "localhost:3001",
  "mcApiUrl": "https://mc-api.europe-west1.gcp.commercetools.com",
  "location": "gcp-eu",
  "env": "development",
  "cdnUrl": "http://localhost:3001",
  "servedByProxy": false
}
```

```json
{
  "csp": {
    "script-src": [],
    "connect-src": ["mc-api.europe-west1.gcp.commercetools.com"],
    "style-src": []
  }
}
```

and for production mode `env.prod.json` and `headers.prod.json`:

```json
{
  "applicationName": "Avengers app",
  "frontendHost": "avengers.app",
  "mcApiUrl": "https://mc-api.europe-west1.gcp.commercetools.com",
  "location": "gcp-eu",
  "env": "production",
  "cdnUrl": "https://cdn.avengers.app",
  "servedByProxy": true
}
```

```json
{
  "csp": {
    "script-src": ["avengers.app", "cdn.avengers.app"],
    "connect-src": [
      "mc-api.europe-west1.gcp.commercetools.com",
      "avengers.app",
      "cdn.avengers.app"
    ],
    "style-src": ["avengers.app", "cdn.avengers.app"]
  }
}
```

To migrate them to the new format, add a `custom-application-config.json` (or one of the other file names) with the following content:

```json
{
  "name": "Avengers app",
  "entryPointUriPath": "avengers",
  "cloudIdentifier": "gcp-eu",
  "env": {
    "production": {
      "url": "https://avengers.app",
      "cdnUrl": "https://cdn.avengers.app"
    }
  }
}
```

That's it! All other values are inferred from the config, like CSP headers, etc.

> Note that the environment placeholder values `${env:VALUE}` are still working.

**JSON Schema support for VSCode**

In the VSCode settings (either user settings or workspace settings), reference the schema JSON as described below:

```json
"json.schemas": [
  {
    "fileMatch": [
      "/.custom-application-configrc",
      "/.custom-application-config.json",
      "/custom-application-config.json"
    ],
    "url": "https://unpkg.com/@commercetools-frontend/application-config/schema.json"
  }
]
```
