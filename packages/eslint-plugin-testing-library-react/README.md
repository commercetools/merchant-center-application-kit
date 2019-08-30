# eslint-plugin-testing-library-react

<p align="center">
  <a href="https://www.npmjs.com/package/eslint-plugin-testing-library-react"><img src="https://badgen.net/npm/v/eslint-plugin-testing-library-react" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/eslint-plugin-testing-library-react"><img src="https://badgen.net/npm/v/eslint-plugin-testing-library-react/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=eslint-plugin-testing-library-react"><img src="https://badgen.net/bundlephobia/minzip/eslint-plugin-testing-library-react" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

ESLint plugin for React Testing Library rules guiding best practices.

## Install

```bash
$ npm install --save eslint-plugin-testing-library-react

$ npx install-peerdeps --dev eslint-plugin-testing-library-react
```

## Configuration

Use our preset to get reasonable defaults:

```json
{
  "extends": ["plugin:testing-library-react/recommended"]
}
```

If you do not use a preset you will need to specify individual rules and add extra configuration.

Add `testing-library-react` to the plugins section.

```json
{
  "plugins": ["testing-library-react"]
}
```

Enable the rules that you would like to use.

```json
{
  "rules": {
    "testing-library-react/prefer-expect-query-by": "error"
  }
}
```

## List of supported rules:

- [testing-library-react/prefer-expect-query-by](./docs/rules/prefer-expect-query-by.md)
