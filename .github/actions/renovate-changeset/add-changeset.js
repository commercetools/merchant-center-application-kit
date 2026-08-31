// Inline replacement for mscharley/dependency-changesets-action, which has a
// bug parsing single-quoted YAML keys in pnpm-workspace.yaml diffs
// (https://github.com/mscharley/dependency-changesets-action/issues/691).
// This repo's pnpm catalogs use single-quoted scoped package names (pnpm's
// default), so the upstream action silently no-ops.
//
// This script talks entirely to the GitHub API (reads PR files/commits and
// writes the changeset via the GraphQL createCommitOnBranch mutation) — no
// checkout needed for the data it operates on (only the script itself needs to
// be checked out by the calling workflow).
//
// The changeset is committed with createCommitOnBranch (not the REST Contents
// API) because GitHub signs commits made this way, marking them "verified".
// The org-wide "Require signed commits" ruleset rejects unsigned commits, and
// REST Contents API commits are unsigned — which was blocking every Renovate
// PR that received an auto-generated changeset (FEC-1316).

const DEFAULT_PACKAGE_DIRS = ['packages', 'packages-backend'];

/**
 * Parses PR file diffs (as returned by `pulls.listFiles`) to find changed
 * dependency names/versions from `pnpm-workspace.yaml` catalog entries and
 * `package.json` dependency entries.
 *
 * @param {Array<{filename: string, patch?: string}>} files
 * @returns {Map<string, string>} dependency name -> version
 */
function parseDeps(files) {
  const changedDeps = new Map(); // name → version

  for (const file of files) {
    if (!file.patch) continue;

    // Parse pnpm-workspace.yaml catalog changes
    if (
      file.filename === 'pnpm-workspace.yaml' ||
      file.filename.endsWith('/pnpm-workspace.yaml')
    ) {
      for (const line of file.patch.split('\n')) {
        if (!line.startsWith('+') || line.startsWith('+++')) continue;
        // Handle single-quoted, double-quoted, and unquoted YAML keys:
        //   +    '@scope/pkg': 3.5.1
        //   +    "@scope/pkg": "^3.5.1"
        //   +    pkg-name: 1.2.3
        const m = line.match(
          /^\+\s*['"]?([^\s'"]+?)['"]?:\s+['"]?([^\s'"]+?)['"]?\s*$/
        );
        if (!m) continue;
        const [, name, value] = m;
        // Only match dependency specifiers (start with digit or range prefix),
        // skip YAML structure keys like `catalogs:`, `nimbus:`, or `true`/`false`.
        if (/^[\d^~>=<*]/.test(value)) {
          changedDeps.set(name, value.replace(/^[\^~>=<]+/, ''));
        }
      }
    }

    // Parse package.json dependency changes
    if (
      file.filename === 'package.json' ||
      file.filename.endsWith('/package.json')
    ) {
      for (const line of file.patch.split('\n')) {
        if (!line.startsWith('+') || line.startsWith('+++')) continue;
        const m = line.match(/^\+\s*"([^"]+)":\s*"([^"]+)"/);
        if (!m) continue;
        const [, name, value] = m;
        if (/^[\d^~>=<*]/.test(value)) {
          changedDeps.set(name, value.replace(/^[\^~>=<]+/, ''));
        }
      }
    }
  }

  return changedDeps;
}

/**
 * Generates changeset markdown content for the affected packages and the
 * dependency updates that triggered them.
 *
 * @param {Set<string>} affectedPackages
 * @param {Map<string, string>} changedDeps
 * @returns {string}
 */
function generateChangesetContent(affectedPackages, changedDeps) {
  const frontmatter = [...affectedPackages]
    .sort()
    .map((p) => `'${p}': patch`)
    .join('\n');
  const depList = [...changedDeps.entries()]
    .map(([k, v]) => `\`${k}\` to \`${v}\``)
    .join(', ');
  return `---\n${frontmatter}\n---\n\nUpdate dependency ${depList}.\n`;
}

/**
 * Returns true if a PR file list already contains a changeset entry (any
 * `.changeset/*.md` other than the README that hasn't been removed).
 *
 * @param {Array<{filename: string, status?: string}>} files
 * @returns {boolean}
 */
function hasChangesetFile(files) {
  return files.some(
    (f) =>
      f.filename.startsWith('.changeset/') &&
      f.filename.endsWith('.md') &&
      f.filename !== '.changeset/README.md' &&
      f.status !== 'removed'
  );
}

/**
 * Lists every file on a PR, paginating through all pages.
 *
 * @param {{github: object, owner: string, repo: string, prNumber: number}} params
 * @returns {Promise<Array<{filename: string, status?: string, patch?: string}>>}
 */
function listPrFiles({ github, owner, repo, prNumber }) {
  return github.paginate(github.rest.pulls.listFiles, {
    owner,
    repo,
    pull_number: prNumber,
  });
}

/**
 * Main entry point invoked by `actions/github-script`. Checks whether a
 * changeset already exists on the PR, and if not, detects changed
 * dependencies and, for any affected published workspace packages, commits a
 * generated changeset file to the PR branch.
 *
 * @param {{github: object, context: object, core: object}} octokit
 * @param {{packageDirs?: string[]}} [opts]
 */
async function run({ github, context, core }, opts = {}) {
  const packageDirs = opts.packageDirs || DEFAULT_PACKAGE_DIRS;

  const prNumber = context.payload.pull_request.number;
  const { owner, repo } = context.repo;
  const ref = context.payload.pull_request.head.ref;

  // 1. Check if changeset already exists in the PR
  const files = await listPrFiles({ github, owner, repo, prNumber });

  if (hasChangesetFile(files)) {
    core.info('Changeset already exists in the PR');
    core.setOutput('has_changeset', 'true');
    return;
  }

  // 2. Find changed dependencies from pnpm-workspace.yaml and package.json diffs
  const changedDeps = parseDeps(files);

  if (changedDeps.size === 0) {
    core.info('No dependency version changes detected in PR diff');
    core.setOutput('has_changeset', 'false');
    return;
  }

  core.info(
    `Changed deps: ${[...changedDeps.entries()]
      .map(([k, v]) => `${k}@${v}`)
      .join(', ')}`
  );

  // 3. Find published workspace packages that consume the changed dependencies
  const affectedPackages = new Set();

  for (const dir of packageDirs) {
    let entries;
    try {
      const { data } = await github.rest.repos.getContent({
        owner,
        repo,
        path: dir,
        ref,
      });
      entries = Array.isArray(data) ? data : [];
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (entry.type !== 'dir') continue;
      try {
        const { data: pkgData } = await github.rest.repos.getContent({
          owner,
          repo,
          path: `${dir}/${entry.name}/package.json`,
          ref,
        });
        const pkg = JSON.parse(
          Buffer.from(pkgData.content, 'base64').toString()
        );
        if (pkg.private) continue;

        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
        };

        for (const depName of changedDeps.keys()) {
          if (allDeps[depName]) {
            affectedPackages.add(pkg.name);
            break;
          }
        }
      } catch {
        continue;
      }
    }
  }

  if (affectedPackages.size === 0) {
    core.info('No published workspace packages are affected');
    core.setOutput('has_changeset', 'false');
    return;
  }

  core.info(`Affected packages: ${[...affectedPackages].join(', ')}`);

  // 4. Generate changeset content
  const content = generateChangesetContent(affectedPackages, changedDeps);

  // 5. Commit the changeset via the GraphQL createCommitOnBranch mutation.
  // Commits created this way are signed/verified by GitHub, which the
  // "Require signed commits" ruleset requires; the REST Contents API produces
  // unsigned commits and would block the PR (FEC-1316).
  const changesetPath = `.changeset/dependencies-GH-${prNumber}.md`;
  try {
    await github.graphql(
      `mutation ($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input) {
          commit {
            oid
          }
        }
      }`,
      {
        input: {
          branch: {
            repositoryNameWithOwner: `${owner}/${repo}`,
            branchName: ref,
          },
          expectedHeadOid: context.payload.pull_request.head.sha,
          message: {
            headline: 'chore(deps): add changeset for dependency update',
          },
          fileChanges: {
            additions: [
              {
                path: changesetPath,
                contents: Buffer.from(content).toString('base64'),
              },
            ],
          },
        },
      }
    );
    core.info(`Created changeset: ${changesetPath}`);
    core.setOutput('has_changeset', 'true');
  } catch (err) {
    // A concurrent run (e.g. an overlapping synchronize event) may have added
    // the changeset and moved the branch head, making createCommitOnBranch
    // reject our now-stale expectedHeadOid. If a changeset is present after the
    // failure, that race already did the work; otherwise re-throw.
    //
    // Guard the recovery re-list: if it throws too (transient API/rate-limit
    // error), surface the original commit failure rather than the misleading
    // secondary listFiles error.
    let currentFiles;
    try {
      currentFiles = await listPrFiles({ github, owner, repo, prNumber });
    } catch {
      throw err;
    }
    if (hasChangesetFile(currentFiles)) {
      core.info('Changeset already created by a concurrent run');
      core.setOutput('has_changeset', 'true');
    } else {
      throw err;
    }
  }
}

module.exports = { parseDeps, generateChangesetContent, run };
