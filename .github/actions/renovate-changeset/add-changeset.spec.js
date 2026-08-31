const { parseDeps, generateChangesetContent, run } = require('./add-changeset');

describe('parseDeps', () => {
  it('parses single-quoted pnpm-workspace.yaml catalog entries', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n catalog:\n-    '@scope/pkg': 3.5.0\n+    '@scope/pkg': 3.5.1`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('@scope/pkg')).toBe('3.5.1');
  });

  it('parses double-quoted pnpm-workspace.yaml catalog entries', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n catalog:\n-    "@scope/pkg": "^3.5.0"\n+    "@scope/pkg": "^3.5.1"`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('@scope/pkg')).toBe('3.5.1');
  });

  it('parses unquoted pnpm-workspace.yaml catalog entries', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n catalog:\n-    pkg-name: 1.2.2\n+    pkg-name: 1.2.3`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('pkg-name')).toBe('1.2.3');
  });

  it('skips YAML structural keys like catalogs:, nimbus:, catalog:', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n+catalogs:\n+  nimbus:\n+catalog:\n+    pkg-name: 1.2.3`,
      },
    ];

    const result = parseDeps(files);

    expect(result.has('catalogs')).toBe(false);
    expect(result.has('nimbus')).toBe(false);
    expect(result.has('catalog')).toBe(false);
    expect(result.get('pkg-name')).toBe('1.2.3');
  });

  it('skips non-version values like true and false', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n+some-flag: true\n+other-flag: false`,
      },
    ];

    const result = parseDeps(files);

    expect(result.size).toBe(0);
  });

  it('parses package.json dependency changes', () => {
    const files = [
      {
        filename: 'package.json',
        patch: `@@ -1,3 +1,3 @@\n-    "@scope/pkg": "^3.5.0",\n+    "@scope/pkg": "^3.5.1",`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('@scope/pkg')).toBe('3.5.1');
  });

  it('strips range prefixes from captured versions', () => {
    const files = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n+    pkg-a: ^1.0.0\n+    pkg-b: ~2.0.0\n+    pkg-c: >=3.0.0`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('pkg-a')).toBe('1.0.0');
    expect(result.get('pkg-b')).toBe('2.0.0');
    expect(result.get('pkg-c')).toBe('3.0.0');
  });

  it('returns an empty map when there are no dependency changes', () => {
    const files = [
      { filename: 'README.md', patch: '@@ -1,1 +1,1 @@\n-old text\n+new text' },
      { filename: 'src/index.js' },
    ];

    const result = parseDeps(files);

    expect(result.size).toBe(0);
  });

  it('ignores +++ diff header lines', () => {
    const files = [
      {
        filename: 'package.json',
        patch: `@@ -1,3 +1,3 @@\n+++ b/package.json\n+    "@scope/pkg": "^3.5.1",`,
      },
    ];

    const result = parseDeps(files);

    expect(result.get('@scope/pkg')).toBe('3.5.1');
    expect(result.size).toBe(1);
  });

  it('ignores removal lines (lines starting with - but not ---)', () => {
    const files = [
      {
        filename: 'package.json',
        patch: `@@ -1,3 +1,3 @@\n-    "@scope/pkg": "^3.5.0",`,
      },
    ];

    const result = parseDeps(files);

    expect(result.size).toBe(0);
  });
});

describe('generateChangesetContent', () => {
  it('produces valid changeset markdown with sorted package entries', () => {
    const affectedPackages = new Set([
      '@commercetools-frontend/pkg-b',
      '@commercetools-frontend/pkg-a',
    ]);
    const changedDeps = new Map([['some-dep', '1.2.3']]);

    const content = generateChangesetContent(affectedPackages, changedDeps);

    const lines = content.split('\n');
    expect(lines[0]).toBe('---');
    expect(lines[1]).toBe("'@commercetools-frontend/pkg-a': patch");
    expect(lines[2]).toBe("'@commercetools-frontend/pkg-b': patch");
    expect(lines[3]).toBe('---');
  });

  it('produces a sensible description for a single dep update', () => {
    const affectedPackages = new Set(['@commercetools-frontend/pkg-a']);
    const changedDeps = new Map([['some-dep', '1.2.3']]);

    const content = generateChangesetContent(affectedPackages, changedDeps);

    expect(content).toContain('Update dependency');
    expect(content).toContain('`some-dep` to `1.2.3`');
  });

  it('lists all dep updates in the description for multiple deps', () => {
    const affectedPackages = new Set(['@commercetools-frontend/pkg-a']);
    const changedDeps = new Map([
      ['dep-one', '1.0.0'],
      ['dep-two', '2.0.0'],
    ]);

    const content = generateChangesetContent(affectedPackages, changedDeps);

    expect(content).toContain('`dep-one` to `1.0.0`');
    expect(content).toContain('`dep-two` to `2.0.0`');
  });
});

describe('run', () => {
  const owner = 'commercetools';
  const repo = 'merchant-center-application-kit';
  const prNumber = 123;
  const ref = 'renovate/some-dep-1.x';

  function createGithub({ files, contents }) {
    return {
      paginate: jest.fn(async () => files),
      graphql: jest.fn(async () => ({
        createCommitOnBranch: { commit: { oid: 'newsha' } },
      })),
      rest: {
        pulls: {
          listFiles: jest.fn(),
        },
        repos: {
          getContent: jest.fn(async ({ path }) => {
            if (contents[path]) {
              return { data: contents[path] };
            }
            const err = new Error('Not Found');
            err.status = 404;
            throw err;
          }),
        },
      },
    };
  }

  function createContext() {
    return {
      payload: {
        pull_request: {
          number: prNumber,
          head: { ref, sha: 'headsha123' },
        },
      },
      repo: { owner, repo },
    };
  }

  function createCore() {
    return {
      info: jest.fn(),
      setOutput: jest.fn(),
    };
  }

  it('returns early with has_changeset=true when a changeset already exists', async () => {
    const github = createGithub({
      files: [
        { filename: '.changeset/dependencies-GH-123.md', status: 'added' },
      ],
      contents: {},
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core });

    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
    expect(github.graphql).not.toHaveBeenCalled();
  });

  it('sets has_changeset=false when no dependency changes are detected', async () => {
    const github = createGithub({
      files: [{ filename: 'README.md', patch: '+hello' }],
      contents: {},
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core });

    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'false');
    expect(github.graphql).not.toHaveBeenCalled();
  });

  it('creates a changeset when a workspace package consumes the changed dep', async () => {
    const pkgJson = {
      name: '@commercetools-frontend/some-pkg',
      dependencies: { 'some-dep': '^1.0.0' },
    };
    const github = createGithub({
      files: [
        {
          filename: 'pnpm-workspace.yaml',
          patch: `@@ -1,3 +1,3 @@\n+    'some-dep': 1.2.3`,
        },
      ],
      contents: {
        packages: [{ type: 'dir', name: 'some-pkg' }],
        'packages/some-pkg/package.json': {
          content: Buffer.from(JSON.stringify(pkgJson)).toString('base64'),
        },
      },
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core });

    expect(github.graphql).toHaveBeenCalledWith(
      expect.stringContaining('createCommitOnBranch'),
      expect.objectContaining({
        input: expect.objectContaining({
          branch: {
            repositoryNameWithOwner: `${owner}/${repo}`,
            branchName: ref,
          },
          expectedHeadOid: 'headsha123',
          fileChanges: {
            additions: [
              expect.objectContaining({
                path: `.changeset/dependencies-GH-${prNumber}.md`,
              }),
            ],
          },
        }),
      })
    );

    // Assert what actually gets committed — the decoded file body and the
    // commit message — not just the path. This is the surface the PR changes,
    // so a dropped `contents` or `headline` must fail a test.
    const { input } = github.graphql.mock.calls[0][1];
    expect(input.message.headline).toBe(
      'chore(deps): add changeset for dependency update'
    );
    const committedContent = Buffer.from(
      input.fileChanges.additions[0].contents,
      'base64'
    ).toString();
    expect(committedContent).toBe(
      "---\n'@commercetools-frontend/some-pkg': patch\n---\n\nUpdate dependency `some-dep` to `1.2.3`.\n"
    );

    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
  });

  it('treats a concurrent run that already added the changeset as success', async () => {
    const pkgJson = {
      name: '@commercetools-frontend/some-pkg',
      dependencies: { 'some-dep': '^1.0.0' },
    };
    const depFiles = [
      {
        filename: 'pnpm-workspace.yaml',
        patch: `@@ -1,3 +1,3 @@\n+    'some-dep': 1.2.3`,
      },
    ];
    const github = createGithub({
      files: depFiles,
      contents: {
        packages: [{ type: 'dir', name: 'some-pkg' }],
        'packages/some-pkg/package.json': {
          content: Buffer.from(JSON.stringify(pkgJson)).toString('base64'),
        },
      },
    });
    // Step 1 sees no changeset; the post-failure re-check sees one that a
    // concurrent run committed while our expectedHeadOid went stale.
    github.paginate = jest
      .fn()
      .mockResolvedValueOnce(depFiles)
      .mockResolvedValueOnce([
        ...depFiles,
        { filename: '.changeset/dependencies-GH-123.md', status: 'added' },
      ]);
    github.graphql = jest.fn(async () => {
      throw new Error('expectedHeadOid mismatch: branch head moved');
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core });

    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
  });

  it('re-throws when the commit fails and no changeset is present', async () => {
    const pkgJson = {
      name: '@commercetools-frontend/some-pkg',
      dependencies: { 'some-dep': '^1.0.0' },
    };
    const github = createGithub({
      files: [
        {
          filename: 'pnpm-workspace.yaml',
          patch: `@@ -1,3 +1,3 @@\n+    'some-dep': 1.2.3`,
        },
      ],
      contents: {
        packages: [{ type: 'dir', name: 'some-pkg' }],
        'packages/some-pkg/package.json': {
          content: Buffer.from(JSON.stringify(pkgJson)).toString('base64'),
        },
      },
    });
    github.graphql = jest.fn(async () => {
      throw new Error('Resource not accessible by integration');
    });
    const context = createContext();
    const core = createCore();

    await expect(run({ github, context, core })).rejects.toThrow(
      'Resource not accessible by integration'
    );
  });

  it('respects a custom packageDirs option', async () => {
    const pkgJson = {
      name: '@commercetools-frontend/backend-pkg',
      dependencies: { 'some-dep': '^1.0.0' },
    };
    const github = createGithub({
      files: [
        {
          filename: 'pnpm-workspace.yaml',
          patch: `@@ -1,3 +1,3 @@\n+    'some-dep': 1.2.3`,
        },
      ],
      contents: {
        'custom-dir': [{ type: 'dir', name: 'backend-pkg' }],
        'custom-dir/backend-pkg/package.json': {
          content: Buffer.from(JSON.stringify(pkgJson)).toString('base64'),
        },
      },
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core }, { packageDirs: ['custom-dir'] });

    expect(github.graphql).toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
  });
});
