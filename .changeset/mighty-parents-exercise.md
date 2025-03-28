---
'@commercetools-frontend/mc-scripts': patch
---

Add option `-e` as short flag for `--env`.

Note that when using the global option `--env` (one or multiple times) before a command, you need to declare it as following:

- Separating the global options from the command with `--`, otherwise the command is considered an option of `--env`:

```
mc-scripts --env .env.local -- start
```

- Using the `=` separator for each `--env` option:

```
mc-scripts --env=.env.local --env=.env.defaults start
```
