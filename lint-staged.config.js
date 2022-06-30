const micromatch = require('micromatch');

module.exports = {
  '*.md': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.graphql': ['prettier --write --parser graphql'],
  '*.json': ['prettier --write --parser json'],
  '*.mc.graphql': () => 'yarn generate-types:mc',
  '*.ctp.graphql': () => 'yarn generate-types:ctp',
  '*.settings.graphql': () => 'yarn generate-types:settings',
  '*.proxy.graphql': () => 'yarn generate-types:proxy',
  '*.js': [
    'prettier --write',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:js --reporters=jest-silent-reporter --onlyChanged',
  ],
  '!(cypress)/**/*.{ts,tsx}': [
    'prettier --write',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:js --reporters=jest-silent-reporter --onlyChanged',
    // Always include the `client.d.ts` file.
    'tsc-files --noEmit packages/application-config/client.d.ts',
  ],
  'cypress/**/*.ts': [
    'prettier --write',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:js --reporters=jest-silent-reporter --onlyChanged',
    () => 'yarn typecheck:cypress',
  ],
  '*.css': [
    'prettier --write --parser css',
    // NOTE: apparently if you pass some argument that is not a flag AFTER the `reporters`
    // flag, jest does not seem correctly parse the arguments.
    //
    //   No tests found related to files changed since last commit.
    //   Run Jest without `-o` or with `--all` to run all tests.
    //   Error: An error occurred while adding the reporter at path "/path/to/file".Reporter is not a constructor
    //
    // For that reason, we move the `--onlyChanged` flag next to it.
    'yarn lint:css --reporters=jest-silent-reporter --onlyChanged',
  ],
  'packages/application-config/schema.json': () =>
    'yarn workspace @commercetools-frontend/application-config build:schema',
};
