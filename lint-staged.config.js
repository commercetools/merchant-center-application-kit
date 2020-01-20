module.exports = {
  '*.{md,mdx}': ['prettier --write --parser markdown'],
  '*.yaml': ['prettier --write --parser yaml'],
  '*.graphql': [
    'prettier --write --parser graphql',
    'git add',
    'yarn generate:types',
  ],
  '*.{js,ts,tsx}': [
    'prettier --write',
    'git add',
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
  '*.css': [
    'prettier --write --parser css',
    'git add',
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
};
