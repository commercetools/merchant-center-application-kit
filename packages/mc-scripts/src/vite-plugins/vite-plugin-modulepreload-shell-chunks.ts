import type { Plugin } from 'vite';

type MinimalChunk = {
  type: 'chunk';
  name: string;
  fileName: string;
  imports: string[];
};
type MinimalBundleEntry = MinimalChunk | { type: 'asset' };
type MinimalBundle = Record<string, MinimalBundleEntry>;

type Options = {
  /**
   * Chunk-name prefixes for the always-needed shell modules. Matched against
   * Rollup's `OutputChunk.name`, not `fileName` or the module id: `name`
   * carries the dependency's own preconstruct hash (`navbar-9eb6c972.esm`)
   * but not Rollup's content hash, so a prefix survives an app-shell release.
   * Matching module ids instead would resolve a statically-imported module to
   * the entry chunk and emit a tag duplicating the entry `<script>`.
   */
  roots?: string[];
  /**
   * What to do when only *some* roots resolve.
   * - `'error'` (default) — fail the build. A partial match means the shell
   *   exists but a chunk moved, which silently disables the optimisation.
   * - `'warn'` — log to stderr and continue.
   */
  onMissing?: 'error' | 'warn';
};

const DEFAULT_ROOTS = [
  'navbar',
  'project-container',
  'application-shell-splitter',
  'user-settings-menu',
  'use-applications-menu',
  'requests-in-flight-loader',
];

export type ResolvedShellChunks = {
  fileNames: string[];
  matchedRoots: string[];
  missingRoots: string[];
};

/**
 * Resolves each root to its emitted chunk, then follows static `imports`
 * transitively. The transitive walk is load-bearing rather than an
 * optimisation: a browser is only guaranteed to preload dependencies that are
 * listed individually, so preloading a root without its imports leaves them
 * one round trip behind.
 */
export function resolveShellChunks(
  bundle: MinimalBundle,
  roots: string[]
): ResolvedShellChunks {
  const chunks = Object.values(bundle).filter(
    (entry): entry is MinimalChunk => entry.type === 'chunk'
  );
  const byFileName = new Map(chunks.map((chunk) => [chunk.fileName, chunk]));

  const fileNames = new Set<string>();
  const matchedRoots: string[] = [];
  const missingRoots: string[] = [];

  const visit = (chunk: MinimalChunk) => {
    if (fileNames.has(chunk.fileName)) return;
    fileNames.add(chunk.fileName);
    chunk.imports.forEach((imported) => {
      const next = byFileName.get(imported);
      if (next) visit(next);
    });
  };

  roots.forEach((root) => {
    const hits = chunks.filter((chunk) => chunk.name.startsWith(root));
    if (hits.length === 0) {
      missingRoots.push(root);
      return;
    }
    matchedRoots.push(root);
    hits.forEach(visit);
  });

  return {
    fileNames: [...fileNames].sort(),
    matchedRoots,
    missingRoots,
  };
}

/**
 * Emits `<link rel="modulepreload">` for the authenticated shell chunk graph,
 * so those chunks are fetched alongside the entry instead of waiting for it to
 * execute and discover them.
 *
 * Works through `build.modulePreload.resolveDependencies` rather than by
 * injecting tags directly. That hook renders its return value through
 * `renderBuiltUrl`, which is what applies the `__CDN_URL__` prefix; tags a
 * `transformIndexHtml` hook creates are emitted verbatim and would ship
 * without it.
 */
function pluginModulePreloadShellChunks(options: Options = {}): Plugin {
  const roots = options.roots ?? DEFAULT_ROOTS;
  const onMissing = options.onMissing ?? 'error';

  let resolved: ResolvedShellChunks | null = null;

  return {
    name: 'vite-plugin-modulepreload-shell-chunks',
    apply: 'build',
    config() {
      return {
        build: {
          modulePreload: {
            resolveDependencies: (
              url: string,
              deps: string[],
              { hostType }: { hostId: string; hostType: 'html' | 'js' }
            ) => {
              // Vite calls this once for the entry HTML and once per dynamic
              // import. Appending for `js` too would bake the shell graph into
              // every `__vitePreload` dependency array in the bundle.
              if (hostType !== 'html' || !resolved) return deps;

              const merged = new Set([...deps, ...resolved.fileNames]);
              // Every shell chunk statically imports the entry, because
              // Rollup co-locates all shared static code there. Preloading it
              // would duplicate the entry's own `<script type="module">`.
              merged.delete(url);
              return [...merged];
            },
          },
        },
      };
    },
    // Runs before `vite:build-html`'s own `generateBundle`, which is where
    // `resolveDependencies` is invoked, so `resolved` is always populated by
    // the time the hook above reads it.
    generateBundle(_options, bundle) {
      resolved = resolveShellChunks(bundle as MinimalBundle, roots);

      // No roots at all means this is not an ApplicationShell app (a Custom
      // View mounts `CustomViewShell` and never reaches these modules), and
      // `mc-scripts` is a published package shared by those builds. Only a
      // partial match indicates a chunk actually moved.
      if (
        resolved.missingRoots.length === 0 ||
        resolved.matchedRoots.length === 0
      ) {
        return;
      }

      const message =
        `Expected shell chunks were not emitted: ${resolved.missingRoots.join(
          ', '
        )}.\n` +
        `Other shell chunks resolved (${resolved.matchedRoots.join(
          ', '
        )}), so these were likely renamed or re-split ` +
        `rather than legitimately absent. Update the \`roots\` option of ` +
        `\`vite-plugin-modulepreload-shell-chunks\`.`;

      if (onMissing === 'error') {
        this.error(message);
      } else {
        this.warn(message);
      }
    },
  };
}

export default pluginModulePreloadShellChunks;
