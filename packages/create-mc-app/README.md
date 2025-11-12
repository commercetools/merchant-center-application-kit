# @commercetools-frontend/create-mc-app

<p align="center">
  <a href="https://www.npmjs.com/package/@commercetools-frontend/create-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/create-mc-app" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/create-mc-app"><img src="https://badgen.net/npm/v/@commercetools-frontend/create-mc-app/next" alt="Latest release (next dist-tag)" /></a> <a href="https://bundlephobia.com/result?p=@commercetools-frontend/create-mc-app"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/create-mc-app" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/merchant-center-application-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/merchant-center-application-kit" alt="GitHub license" /></a>
</p>

Check out the [documentation](https://docs.commercetools.com/merchant-center-customizations/api-reference/create-mc-app) for more information.

## Local Development

This guide is for **internal developers** who want to modify starter templates and test changes locally without publishing a new release.

### How It Works

The CLI clones templates from the GitHub repository (not your local filesystem). This means you must push template changes to a git branch before testing them locally.

### Prerequisites

- Repository cloned locally
- `pnpm` installed
- Git push access to the repository

### Workflow

#### 1. Make Template Changes

Edit files in the template directories:

```bash
# For custom applications
application-templates/starter/
application-templates/starter-typescript/

# For custom views
custom-views-templates/starter/
custom-views-templates/starter-typescript/
```

#### 2. Commit and Push to a Branch

```bash
git checkout -b my-template-changes # create a new branch
git add application-templates/starter/ # do this after you make changes
git commit -m "chore(templates): add welcome header to starter template"
git push origin my-template-changes # push the changes to the new branch
```

#### 3. Build the CLI Locally

```bash
cd packages/create-mc-app
pnpm build
```

#### 4. Run the Local CLI with Your Branch

From the repository root:

```bash
NODE_ENV=test node packages/create-mc-app/bin/cli.js my-test-app \
  --template starter \
  --template-version my-template-changes # important: use the branch name you created
```

**Important:** Use relative paths (e.g., `my-test-app`) not absolute paths (e.g., `/Users/name/my-test-app`).

#### 5. Verify Your Changes

```bash
cd my-test-app # navigate to the new app
yarn start # verify your template changes are present
```

### Quick Reference

```bash
# Complete workflow
git checkout -b template-updates # create a new branch
# ... make changes to application-templates/starter/ (e.g., add a welcome message) ...
git add application-templates/starter/ # do this after you make changes
git commit -m "chore(templates): update landing page styles"
git push origin template-updates # push the changes to the new branch

cd packages/create-mc-app
pnpm build
cd ../..

NODE_ENV=test node packages/create-mc-app/bin/cli.js test-project \
  --template starter \
  --template-version template-updates

cd test-project # navigate to the new app
yarn start # verify your template changes are present
```

### Key Points

- ✅ **Must push changes to git** - Templates are cloned from GitHub, not copied from local filesystem
- ✅ **Use relative paths** - Avoid absolute paths starting with `/`
- ✅ **Use `--template-version`** - Specify your branch name to test changes
- ✅ **No npm publish needed** - Test directly with git branches
- ✅ **Test before merging** - Validate template changes work correctly before merging to `main`

### Troubleshooting

**Error: "Name contains illegal characters"**

- You're using an absolute path. Use a relative path instead (e.g., `my-app` instead of `/Users/name/my-app`)

**Templates not reflecting changes**

- Ensure you've pushed your changes to the git branch
- Verify the `--template-version` flag matches your branch name
