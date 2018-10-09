## Contributing

Please _read_ before contributing to Merchant Center Application Kit as we settled on some informal
processes to keep components in Merchant Center Application Kit of a _high standard_ with _coherent_ APIs.

---

_coming soon_

## Cutting a Release

1. Make sure that each merged PR that should be mentioned in the release changelog is labelled with one of the [labels](https://github.com/commercetools/merchant-center-application-kit/labels) named `Type: ...` to indicate what kind of change it is.
2. Create a changelog entry for the release

- Copy `.env.template` and name it `.env`
- You'll need an [access token for the GitHub API](https://help.github.com/articles/creating-an-access-token-for-command-line-use/). Save it to the environment variable: `GITHUB_AUTH`
- Run `yarn changelog`. The command will find all the labeled pull requests merged since the last release and group them by the label and affected packages, and create a change log entry with all the changes and links to PRs and their authors. Copy and paste it to `CHANGELOG.md`.
- Add a four-space indented paragraph after each non-trivial list item, explaining what changed and why. For each breaking change also write who it affects and instructions for migrating existing code.
- Maybe add some newlines here and there. Preview the result on GitHub to get a feel for it. Changelog generator output is a bit too terse for my taste, so try to make it visually pleasing and well grouped.

3. (_Optional_) Include "_Migrating from ..._" instructions for the previous release in case you deem it necessary.
4. Commit the changelog
5. Run `yarn release`: you will get promted to select the version that you would like to release (minor, major, pre-release, etc.)
6. Wait a bit until lerna bumps the versions, creates a commit and a tag and finally publishes the packages to npm.
7. After publishing, create a GitHub Release with the same text as the changelog entry. See previous Releases for inspiration.
