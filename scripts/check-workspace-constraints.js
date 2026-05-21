#!/usr/bin/env node
/**
 * Enforces workspace dependency constraints that pnpm itself does not check.
 *
 * Per-package rules:
 * 1. A dependency must not appear in both "dependencies" and "devDependencies".
 *
 * Cross-workspace rules (catalog protocol — see pnpm-workspace.yaml):
 * 2. Every dep listed under `catalog:` (default) must be consumed via
 *    `catalog:` in workspace `dependencies` / `devDependencies`.
 * 3. Every dep listed under a named catalog `catalogs.<name>:` must be
 *    consumed via `catalog:<name>` in workspace `dependencies` /
 *    `devDependencies`.
 * 4. Every dep listed under `catalogs.peer:` must be consumed via
 *    `catalog:peer` in workspace `peerDependencies`.
 *    Literal versions on a cataloged dep are an error in all three cases.
 * 5. Drift: an uncataloged external dep used at two or more distinct
 *    specifiers across workspaces is an error — add it to a catalog so
 *    the version is centrally controlled. Install (deps + devDeps) and
 *    peer drift are checked separately.
 *
 * Published-package metadata rules (license, repository, engines.node, type)
 * are intentionally NOT enforced here — see FEC-952 for that pass.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Parse the `catalog:` (default) and `catalogs.<name>:` (named) blocks from
// pnpm-workspace.yaml. Minimal parser scoped to the shape we use — key:value
// entries with optional single-quoted keys, with blank lines separating
// named catalogs. Avoids pulling a YAML lib into a root-only script.
function readCatalogs() {
  const yaml = fs.readFileSync(path.join(ROOT, 'pnpm-workspace.yaml'), 'utf-8');
  const lines = yaml.split('\n');
  const out = { default: new Set(), named: new Map() };

  const indentOf = (l) => l.match(/^( *)/)[1].length;
  const entryKey = (l) => {
    const m = l.match(/^\s+'?([^'":\s]+)'?\s*:/);
    return m ? m[1] : null;
  };

  let mode = null; // 'default' | 'catalogs' | null
  let currentNamed = null;
  for (const line of lines) {
    const trimmed = line.trim();
    // Blank lines and comment-only lines are visual separators; preserve
    // current mode and currentNamed so sub-cohort grouping inside a named
    // catalog is allowed (with `# comment` headers and blank-line gaps).
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    if (/^\S/.test(line)) {
      if (/^catalog:\s*$/.test(line)) {
        mode = 'default';
        currentNamed = null;
      } else if (/^catalogs:\s*$/.test(line)) {
        mode = 'catalogs';
        currentNamed = null;
      } else {
        mode = null;
        currentNamed = null;
      }
      continue;
    }
    const ind = indentOf(line);
    if (mode === 'default' && ind === 2) {
      const k = entryKey(line);
      if (k) out.default.add(k);
    } else if (mode === 'catalogs') {
      if (ind === 2) {
        currentNamed = line.trim().replace(/:$/, '');
        if (!out.named.has(currentNamed)) {
          out.named.set(currentNamed, new Set());
        }
      } else if (ind >= 4 && currentNamed) {
        const k = entryKey(line);
        if (k) out.named.get(currentNamed).add(k);
      }
    }
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

// Catalog enforcement: every cataloged dep must be referenced via its
// catalog. Literal versions are an error — the catalog is the single
// source of truth, and skipping the reference re-introduces the version
// drift this rule exists to prevent.
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
