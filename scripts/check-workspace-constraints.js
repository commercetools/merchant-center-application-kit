#!/usr/bin/env node
/**
 * Enforces workspace dependency constraints that pnpm itself does not check.
 *
 * Per-package rules:
 * 1. A dependency must not appear in both "dependencies" and "devDependencies".
 *
 * Cross-workspace rules (catalog protocol — see pnpm-workspace.yaml):
 * 2. Every external dep used in `dependencies` / `devDependencies` of any
 *    workspace package must be consumed via either a `catalog:` reference
 *    or a `workspace:` protocol. Literal version strings are an error —
 *    pnpm-workspace.yaml is the single source of truth for every
 *    third-party version in the repo.
 * 3. Every dep listed under `catalog:` (default) must be consumed via
 *    `catalog:`; every dep under `catalogs.<name>:` must be consumed via
 *    `catalog:<name>`. Wrong-catalog or literal references are an error.
 * 4. Every dep listed under `catalogs.peer:` must be consumed via
 *    `catalog:peer` in workspace `peerDependencies`.
 * 5. Drift: peerDependencies are deliberately allowed to use raw ranges
 *    (e.g. `jest@30.x`) and are NOT covered by rule 2. But an uncataloged
 *    peer dep used at two or more distinct specifiers across workspaces
 *    is still an error — add it to `catalogs.peer:` so the consumer
 *    range is centrally controlled.
 *
 * Published-package metadata rules (license, repository, engines.node, type)
 * are intentionally NOT enforced here — see FEC-952 for that pass.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { parse: parseYaml } = require('yaml');

const ROOT = path.resolve(__dirname, '..');

/**
 * Parsed view of pnpm-workspace.yaml's catalog declarations.
 *
 * @typedef {Object} CatalogIndex
 * @property {Set<string>} default  Dep names declared under top-level `catalog:`.
 * @property {Map<string, Set<string>>} named  Named catalog → dep names declared
 *   under `catalogs.<name>:`. The `peer` catalog is included like any other.
 */

/**
 * Cross-workspace usage accumulator. Records every place a given dependency
 * appears in a workspace `package.json`, grouped by the literal specifier
 * string so that drift between specifiers is detectable.
 *
 * @typedef {Map<string, Map<string, Set<string>>>} UsageMap
 *   depName → spec → set of workspace labels that pin the dep to that spec.
 */

/**
 * Parse the `catalog:` (default) and `catalogs.<name>:` (named) blocks from
 * pnpm-workspace.yaml into an index of declared dep names per catalog.
 *
 * @returns {CatalogIndex}
 */
function readCatalogs() {
  const text = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf-8');
  const doc = parseYaml(text) ?? {};
  const out = {
    default: new Set(Object.keys(doc.catalog ?? {})),
    named: new Map(),
  };
  for (const [name, entries] of Object.entries(doc.catalogs ?? {})) {
    out.named.set(name, new Set(Object.keys(entries)));
  }
  return out;
}

const catalogs = readCatalogs();
const defaultCatalogKeys = catalogs.default;
const peerCatalogKeys = catalogs.named.get('peer') || new Set();

// Discover all workspace packages via pnpm.
const workspaces = JSON.parse(
  execSync('pnpm ls --json -r --depth -1', { cwd: ROOT, encoding: 'utf-8' })
);

const errors = [];

// Cross-workspace usage accumulators: depName -> Map<spec, Set<workspaceLabel>>.
// Split by section group because the default catalog applies to install
// specifiers (dependencies + devDependencies) and the named `peer` catalog
// applies to peerDependencies — semantically distinct.
const installUsage = new Map();
const peerUsage = new Map();

for (const ws of workspaces) {
  const pkgPath = path.join(ws.path, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const rel = path.relative(ROOT, ws.path);
  const label = `${pkg.name} (${rel}/package.json)`;

  // A dependency must not appear in both "dependencies" and "devDependencies".
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = new Set(Object.keys(pkg.devDependencies || {}));
  for (const dep of deps) {
    if (devDeps.has(dep)) {
      errors.push(
        `${label}: "${dep}" appears in both "dependencies" and "devDependencies" (remove from "devDependencies")`
      );
    }
  }

  // Accumulate cross-workspace dep usage. Skip workspace: refs (internal
  // links) — only cataloging external deps. Split install (deps + devDeps)
  // from peer because cataloged keysets differ.
  const addUsage = (map, name, spec) => {
    if (!map.has(name)) map.set(name, new Map());
    const bySpec = map.get(name);
    if (!bySpec.has(spec)) bySpec.set(spec, new Set());
    bySpec.get(spec).add(label);
  };
  for (const section of ['dependencies', 'devDependencies']) {
    const sectionDeps = pkg[section] || {};
    for (const [name, spec] of Object.entries(sectionDeps)) {
      if (typeof spec !== 'string' || spec.startsWith('workspace:')) continue;
      addUsage(installUsage, name, spec);
    }
  }
  const peerDeps = pkg.peerDependencies || {};
  for (const [name, spec] of Object.entries(peerDeps)) {
    if (typeof spec !== 'string' || spec.startsWith('workspace:')) continue;
    addUsage(peerUsage, name, spec);
  }
}

/**
 * Catalog enforcement: every cataloged dep must be referenced via its
 * catalog. Literal versions are an error — the catalog is the single
 * source of truth, and skipping the reference re-introduces the version
 * drift this rule exists to prevent. Appends violations to the outer
 * `errors` array.
 *
 * @param {Set<string>} catalogKeys  Dep names that the catalog declares.
 * @param {UsageMap} usage           Observed usage across all workspaces.
 * @param {string} expectedSpec      The spec consumers must use (e.g. `catalog:build`).
 * @param {string} ruleName          Human label used in the error message.
 */
function enforceCatalog(catalogKeys, usage, expectedSpec, ruleName) {
  for (const name of catalogKeys) {
    const bySpec = usage.get(name);
    if (!bySpec) continue;
    for (const [spec, workspaceLabels] of bySpec) {
      if (spec === expectedSpec) continue;
      for (const label of workspaceLabels) {
        errors.push(
          `${label}: "${name}" must use "${expectedSpec}" (got ${JSON.stringify(
            spec
          )}); ${ruleName} version is declared in pnpm-workspace.yaml`
        );
      }
    }
  }
}

enforceCatalog(defaultCatalogKeys, installUsage, 'catalog:', 'default catalog');
for (const [name, keys] of catalogs.named) {
  if (name === 'peer') continue; // peer applies to peerDeps, handled below
  enforceCatalog(keys, installUsage, `catalog:${name}`, `${name} catalog`);
}
enforceCatalog(peerCatalogKeys, peerUsage, 'catalog:peer', 'peer catalog');

// Coverage enforcement: every external dep in dependencies/devDependencies
// must resolve through pnpm-workspace.yaml. `workspace:` specs were dropped
// at accumulation time, so anything that reaches `installUsage` must either
// already use a `catalog:` reference (catalog hit) or be added to one. A
// literal spec is an error even when the dep isn't cataloged yet — the
// catalog is the single source of truth.
const installCatalogedKeysForCoverage = new Set([
  ...defaultCatalogKeys,
  ...[...catalogs.named.entries()]
    .filter(([n]) => n !== 'peer')
    .flatMap(([, s]) => [...s]),
]);
for (const [name, bySpec] of installUsage) {
  // Skip deps already covered by enforceCatalog — that pass produces a
  // more specific message ("must use catalog:<name>").
  if (installCatalogedKeysForCoverage.has(name)) continue;
  for (const [spec, workspaceLabels] of bySpec) {
    if (spec.startsWith('catalog:')) continue;
    for (const label of workspaceLabels) {
      errors.push(
        `${label}: "${name}" is declared at literal version ${JSON.stringify(
          spec
        )}; add it to a catalog in pnpm-workspace.yaml and reference it via "catalog:" / "catalog:<name>"`
      );
    }
  }
}

// Drift detection: an uncataloged dep used at multiple distinct specs across
// workspaces is drift. Cataloged deps are skipped — their consistency is
// already enforced by enforceCatalog above. Install and peer are scanned
// separately because their cataloged keysets differ (install pins vs peer
// compatibility ranges).
const installCatalogedKeys = new Set([
  ...defaultCatalogKeys,
  ...[...catalogs.named.entries()]
    .filter(([n]) => n !== 'peer')
    .flatMap(([, s]) => [...s]),
]);

/**
 * Flag deps that are not in any catalog yet but are already used at two or
 * more distinct specs across the workspace. Appends violations to the outer
 * `errors` array.
 *
 * @param {UsageMap} usage           Observed usage across all workspaces.
 * @param {Set<string>} catalogedKeys  Dep names already covered by a catalog;
 *   these are skipped because `enforceCatalog` has already vetted them.
 * @param {string} scope             `'install'` or `'peer'` — used in the
 *   error message to disambiguate the two scans.
 */
function detectDrift(usage, catalogedKeys, scope) {
  for (const [name, bySpec] of usage) {
    if (catalogedKeys.has(name)) continue;
    if (bySpec.size <= 1) continue;
    const lines = [];
    for (const [spec, labels] of bySpec) {
      for (const label of labels) {
        lines.push(`    ${JSON.stringify(spec)} — ${label}`);
      }
    }
    errors.push(
      `[${scope} drift] "${name}" is used at ${
        bySpec.size
      } different versions across workspaces; add it to a catalog in pnpm-workspace.yaml\n${lines.join(
        '\n'
      )}`
    );
  }
}

detectDrift(installUsage, installCatalogedKeys, 'install');
detectDrift(peerUsage, peerCatalogKeys, 'peer');

if (errors.length > 0) {
  console.error(`Found ${errors.length} workspace constraint violation(s):\n`);
  for (const err of errors) {
    console.error(`  ✗ ${err}`);
  }
  process.exit(1);
} else {
  console.log('All workspace constraints passed.');
  process.exit(0);
}
