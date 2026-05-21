import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { ListrTask } from 'listr2';
import type { TCliTaskOptions } from '../types';
import { getPreferredPackageManager, slugify } from '../utils';

// Catalog references in workspace package.json files point at entries in
// pnpm-workspace.yaml. They have to be flattened to concrete version
// specifiers in the scaffolded app because the scaffolded app is not part
// of any workspace.
type CatalogMap = {
  // Maps cataloged dep name -> resolved spec from the default `catalog:` block.
  default: Map<string, string>;
  // Maps `<catalogName>` -> Map<depName, resolvedSpec> from `catalogs.<name>:`.
  named: Map<string, Map<string, string>>;
};

// Minimal pnpm-workspace.yaml parser scoped to the shape we use — `key: value`
// entries with optional single-quoted keys, blank lines and `# comment`
// separators tolerated inside catalog blocks. Mirrors the parser in
// scripts/check-workspace-constraints.js so the two stay in lockstep.
function parseCatalogs(yaml: string): CatalogMap {
  const out: CatalogMap = { default: new Map(), named: new Map() };
  const lines = yaml.split('\n');
  const indentOf = (l: string) => (l.match(/^( *)/) || ['', ''])[1].length;
  // Captures both `key:` and `'key': value` / `"key": value` shapes; the
  // value (if any) is captured ungrouped so we can pull it raw.
  const entryRe = /^\s+(?:'([^']+)'|"([^"]+)"|([^\s:'"]+))\s*:\s*(.*)$/;

  let mode: 'default' | 'catalogs' | null = null;
  let currentNamed: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
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
      const m = line.match(entryRe);
      if (m) out.default.set(m[1] || m[2] || m[3], stripQuotes(m[4]));
    } else if (mode === 'catalogs') {
      if (ind === 2) {
        currentNamed = trimmed.replace(/:$/, '');
        if (!out.named.has(currentNamed))
          out.named.set(currentNamed, new Map());
      } else if (ind >= 4 && currentNamed) {
        const m = line.match(entryRe);
        if (m)
          out.named
            .get(currentNamed)!
            .set(m[1] || m[2] || m[3], stripQuotes(m[4]));
      }
    }
  }
  return out;
}

// YAML scalars may be quoted to escape characters like `>=` or `*` — strip
// the surrounding quotes so the resolved spec is a plain version string.
function stripQuotes(value: string): string {
  const v = value.trim();
  if (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

// Resolves a single specifier. Returns the resolved spec, or the original
// spec if no resolution applies. Unknown catalog refs throw — silently
// passing them through would scaffold a broken app.
function resolveSpec(
  depName: string,
  spec: string,
  releaseVersion: string,
  catalogs: CatalogMap
): string {
  if (spec === 'workspace:*') return releaseVersion;
  if (spec === 'workspace:^') return `^${releaseVersion}`;
  if (spec === 'workspace:~') return `~${releaseVersion}`;
  if (spec === 'catalog:' || spec === 'catalog:default') {
    const resolved = catalogs.default.get(depName);
    if (!resolved) {
      throw new Error(
        `Unable to resolve catalog reference "${spec}" for "${depName}": dep is not declared under the default catalog in the template's pnpm-workspace.yaml.`
      );
    }
    return resolved;
  }
  if (spec.startsWith('catalog:')) {
    const name = spec.slice('catalog:'.length);
    const named = catalogs.named.get(name);
    if (!named) {
      throw new Error(
        `Unable to resolve catalog reference "${spec}" for "${depName}": catalog "${name}" is not declared in the template's pnpm-workspace.yaml.`
      );
    }
    const resolved = named.get(depName);
    if (!resolved) {
      throw new Error(
        `Unable to resolve catalog reference "${spec}" for "${depName}": dep is not declared under catalogs.${name} in the template's pnpm-workspace.yaml.`
      );
    }
    return resolved;
  }
  return spec;
}

function resolveDependencies(
  dependencies: Record<string, string> = {},
  releaseVersion: string,
  catalogs: CatalogMap
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, spec] of Object.entries(dependencies)) {
    out[name] = resolveSpec(name, spec, releaseVersion, catalogs);
  }
  return out;
}

function updatePackageJson(
  options: TCliTaskOptions,
  releaseVersion: string
): ListrTask {
  return {
    title: 'Updating package.json',
    task: () => {
      const packageJsonPath = path.join(
        options.projectDirectoryPath,
        'package.json'
      );
      const appPackageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, { encoding: 'utf8' })
      );
      const packageManager = getPreferredPackageManager(options);

      // Read catalogs from the cloned template repo so `catalog:` /
      // `catalog:<name>` references in the template's package.json can be
      // flattened to concrete versions. Older template tags predate catalog
      // adoption — fall back to empty maps so the workspace-only rewrite
      // path still works.
      const workspaceYamlPath = path.join(
        options.clonedRepositoryPath,
        'pnpm-workspace.yaml'
      );
      const catalogs: CatalogMap = fs.existsSync(workspaceYamlPath)
        ? parseCatalogs(
            fs.readFileSync(workspaceYamlPath, { encoding: 'utf8' })
          )
        : { default: new Map(), named: new Map() };

      const updatedAppPackageJson = Object.assign({}, appPackageJson, {
        version: '1.0.0',
        // Given the package name is derived from the `projectDirectoryName`
        // the latter needs to be sanitised to have a ensure a valid package name.
        // The `projectDirectoryName` should not have restrictions (e.g. no `_`)
        // as a result the package name potentially needs to be altered when derived.
        name: slugify(options.projectDirectoryName),
        description: '',
        // Flatten workspace: and catalog: specifiers into concrete versions
        // — the scaffolded app is not part of any pnpm workspace and would
        // otherwise fail to install.
        dependencies: resolveDependencies(
          appPackageJson.dependencies,
          releaseVersion,
          catalogs
        ),
        devDependencies: resolveDependencies(
          appPackageJson.devDependencies,
          releaseVersion,
          catalogs
        ),
        scripts: {
          ...appPackageJson.scripts,
          'start:prod:local': appPackageJson.scripts[
            'start:prod:local'
          ].replace('yarn', packageManager),
        },
      });

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
        { encoding: 'utf8' }
      );
    },
  };
}

export default updatePackageJson;
