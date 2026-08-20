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
          createOrUpdateFileContents: jest.fn(async () => ({})),
        },
      },
    };
  }

  function createContext() {
    return {
      payload: {
        pull_request: {
          number: prNumber,
          head: { ref },
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
    expect(github.rest.repos.createOrUpdateFileContents).not.toHaveBeenCalled();
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
    expect(github.rest.repos.createOrUpdateFileContents).not.toHaveBeenCalled();
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

    expect(github.rest.repos.createOrUpdateFileContents).toHaveBeenCalledWith(
      expect.objectContaining({
        owner,
        repo,
        path: `.changeset/dependencies-GH-${prNumber}.md`,
        branch: ref,
      })
    );
    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
  });

  it('handles a 409 race condition from createOrUpdateFileContents gracefully', async () => {
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
    github.rest.repos.createOrUpdateFileContents = jest.fn(async () => {
      const err = new Error('Conflict');
      err.status = 409;
      throw err;
    });
    const context = createContext();
    const core = createCore();

    await run({ github, context, core });

    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
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

    expect(github.rest.repos.createOrUpdateFileContents).toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('has_changeset', 'true');
  });
});
