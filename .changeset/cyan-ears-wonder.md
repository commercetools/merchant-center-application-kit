---
'merchant-center-application-template-starter': minor
'@commercetools-frontend/mc-scripts': minor
'playground': minor
'@commercetools-website/custom-applications': minor
---

New CLI options! 🎉

## Loading dotenv files

The `mc-script` CLI now supports loading environment variables from [dotenv files](https://www.npmjs.com/package/dotenv).

Previously, we recommended to use `dotenv-cli` to load environment variables before executing the `mc-scripts` command. For example:

```
dotenv -c development -- mc-scripts start

NODE_ENV=production dotenv -- mc-scripts compile-html

NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
```

Now the `mc-scripts` CLI has the dotenv features built-in, so you don't need to install and use `dotenv-cli` anymore.

By default, the following dotenv files are loaded according to the current environment values specified on each command: `process.MC_APP_ENV` or `process.NODE_ENV`. The priority of how the files are merged and overwritten goes from top to bottom (highest defined variable overrides lower).

- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env`

Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

Furthermore, you can pass additional dotenv files by using the following option:

- `--env <path>`: Parses the file path as a dotenv file and adds the variables to the environment. Multiple flags are allowed.

These files will take higher priority over the standard environment dotenv files.

The example above can then be refactored as following:

```diff
-dotenv -c development -- mc-scripts start
+mc-scripts start

-NODE_ENV=production dotenv -- mc-scripts compile-html
+NODE_ENV=production mc-scripts compile-html

-NODE_ENV=production dotenv -e .env.gcp-production-eu -- mc-scripts compile-html
+NODE_ENV=production mc-scripts --env .env.gcp-production-eu compile-html
```

## Prompt for selecting an application to start

If you are developing multiple Custom Applications in the same repository, chances are that you use a mono-repository setup.

If that's the case, you can now run the `mc-scripts start` command from the workspace root folder and pass the option `--match <glob>`. The option will attempt to gather a list of packages in the repository that match the glob pattern and show it as a prompt. You can then select the application that you want to start from that list.

We hope you find it useful.
