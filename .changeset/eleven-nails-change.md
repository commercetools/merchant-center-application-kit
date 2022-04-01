---
'@commercetools-frontend/mc-scripts': minor
---

Add new CLI command `mc-script config:sync`

This command allows users to synchronize the local Custom Application config with the Merchant Center. The sync implies that a new Custom Application will be created or an existing one will be updated.

Developers can use the `config:sync` command to automatically manage the configuration of a Custom Application from the config file instead of having to manually fill out the information in the Merchant Center.

If a new Custom Application needs to be created, an interactive prompt will ask the user to select the Organization where the Custom Application should be configured to.

Additionally, the Custom Application ID is automatically synced when running the `config:sync` command.

Note that this command requires a valid API token. You can get one by using the `mc-scripts login` command.

The command also supports a `--dry-run` option. If enabled, the command is exectured but does not send any mutation request. Instead, the request payload is logged.
