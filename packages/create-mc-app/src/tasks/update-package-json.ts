import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { ListrTask } from 'listr2';
import { parse as parseYaml } from 'yaml';
import type { TCliTaskOptions } from '../types';
import { getPreferredPackageManager, slugify } from '../utils';

// Catalog references in workspace package.json files point at entries in
// pnpm-workspace.yaml. They have to be flattened to concrete version
// specifiers in the scaffolded app because the scaffolded app is not part
// of any workspace.
//
// Shape: catalogName -> depName -> resolved spec. The default `catalog:`
// block is keyed as 'default' so `catalog:` and `catalog:<name>` lookups
// share one code path.
type Catalogs = Map<string, Map<string, string>>;

type WorkspaceYaml = {
  catalog?: Record<string, string>;
  catalogs?: Record<string, Record<string, string>>;
};

function parseCatalogs(yamlText: string): Catalogs {
  const doc = (parseYaml(yamlText) ?? {}) as WorkspaceYaml;
  const out: Catalogs = new Map();
  if (doc.catalog) {
    out.set('default', new Map(Object.entries(doc.catalog)));
  }
  for (const [name, entries] of Object.entries(doc.catalogs ?? {})) {
    out.set(name, new Map(Object.entries(entries)));
  }
  return out;
}

// `workspace:` specifier → rewriter that takes the release version and
// returns the concrete spec. The supported set is data, not branching
// logic — extend the table to handle new protocol additions.
const WORKSPACE_REWRITERS: Record<string, (releaseVersion: string) => string> =
  {
    'workspace:*': (v) => v,
    'workspace:^': (v) => `^${v}`,
    'workspace:~': (v) => `~${v}`,
  };

/**
 * Resolve a `catalog:` / `catalog:<name>` specifier to a concrete version
 * string by looking it up in the parsed `pnpm-workspace.yaml`.
 *
 * @throws {Error} when the named catalog does not exist in the template's
 *   `pnpm-workspace.yaml`, or when the catalog exists but does not declare
 *   an entry for `depName`. Both cases mean the scaffold cannot produce a
 *   valid `package.json` and is unrecoverable — let it propagate.
 */
function resolveCatalogRef(
  spec: string,
  depName: string,
  catalogs: Catalogs
): string {
  // `catalog:` and `catalog:default` both target the default block.
  const name =
    spec === 'catalog:' || spec === 'catalog:default'
      ? 'default'
      : spec.slice('catalog:'.length);
  const block = catalogs.get(name);
  if (!block) {
    throw new Error(
      `Unable to resolve catalog reference "${spec}" for "${depName}": catalog "${name}" is not declared in the template's pnpm-workspace.yaml.`
    );
  }
  const resolved = block.get(depName);
  if (!resolved) {
    const where =
      name === 'default' ? 'the default catalog' : `catalogs.${name}`;
    throw new Error(
      `Unable to resolve catalog reference "${spec}" for "${depName}": dep is not declared under ${where} in the template's pnpm-workspace.yaml.`
    );
  }
  return resolved;
}

function resolveSpec(
  depName: string,
  spec: string,
  releaseVersion: string,
  catalogs: Catalogs
): string {
  const workspaceRewriter = WORKSPACE_REWRITERS[spec];
  if (workspaceRewriter) return workspaceRewriter(releaseVersion);
  if (spec.startsWith('catalog:'))
    return resolveCatalogRef(spec, depName, catalogs);
  return spec;
}

function resolveDependencies(
  dependencies: Record<string, string> = {},
  releaseVersion: string,
  catalogs: Catalogs
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, spec] of Object.entries(dependencies)) {
    out[name] = resolveSpec(name, spec, releaseVersion, catalogs);
  }
  return out;
}

// Read catalogs from the cloned template repo. Older template tags predate
// catalog adoption — fall back to an empty map so the workspace-only
// rewrite path still works.
function loadCatalogsFromClone(clonedRepositoryPath: string): Catalogs {
  const workspaceYamlPath = path.join(
    clonedRepositoryPath,
    'pnpm-workspace.yaml'
  );
  if (!fs.existsSync(workspaceYamlPath)) return new Map();
  return parseCatalogs(
    fs.readFileSync(workspaceYamlPath, { encoding: 'utf8' })
  );
}

type TAppPackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts: Record<string, string> & { 'start:prod:local': string };
  [key: string]: unknown;
};

function buildUpdatedPackageJson(
  appPackageJson: TAppPackageJson,
  options: TCliTaskOptions,
  releaseVersion: string,
  catalogs: Catalogs
): TAppPackageJson {
  const packageManager = getPreferredPackageManager(options);
  return {
    ...appPackageJson,
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
      'start:prod:local': appPackageJson.scripts['start:prod:local'].replace(
        'yarn',
        packageManager
      ),
    },
  };
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
      const catalogs = loadCatalogsFromClone(options.clonedRepositoryPath);
      const updatedAppPackageJson = buildUpdatedPackageJson(
        appPackageJson,
        options,
        releaseVersion,
        catalogs
      );
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(updatedAppPackageJson, null, 2) + os.EOL,
        { encoding: 'utf8' }
      );
    },
  };
}

export default updatePackageJson;
