import type { Plugin } from 'vite';

// Structural subset of Rollup's OutputChunk / OutputBundle. We avoid
// importing the real types because Rollup is a transitive dep via Vite and
// is not declared in mc-scripts' own `dependencies`. We only touch three
// fields, so a local type is cheaper than adding a dep.
type MinimalChunk = {
  type: 'chunk';
  fileName: string;
  imports: string[];
};
type MinimalBundleEntry = MinimalChunk | { type: 'asset' };
type MinimalBundle = Record<string, MinimalBundleEntry>;

type Options = {
  /**
   * What to do when a chunk cycle is detected.
   * - `'error'` (default) — fail the build. Safe default for CI because
   *   chunk-level cycles produce TDZ runtime errors (e.g. "aM is undefined").
   * - `'warn'` — log to stderr and continue. Use this in exploratory configs
   *   where you need to ship a build that you know has cycles.
   */
  onCycle?: 'error' | 'warn';
};

/**
 * Health check: after Rollup produces the output bundle, verify that the
 * graph of cross-chunk imports is a DAG. Chunk-level cycles are a class of
 * bug that doesn't fail at build time but crashes at runtime the moment one
 * chunk reads a variable from its partner before that partner finishes
 * initializing (TDZ). The historical failure mode was `@commercetools-uikit/icons`
 * ↔ `app-shell` under `manualChunks`.
 */
function pluginChunkCycleCheck(options: Options = {}): Plugin {
  const onCycle = options.onCycle ?? 'error';

  return {
    name: 'vite-plugin-chunk-cycle-check',
    apply: 'build',
    // `generateBundle` runs once the chunk graph is final but before files
    // hit disk — the cheapest place to inspect it.
    generateBundle(_, bundle) {
      const cycles = findChunkCycles(bundle as MinimalBundle);
      if (cycles.length === 0) return;

      const formatted = cycles
        .map((cycle) => `  ${cycle.join(' → ')}`)
        .join('\n');
      const message =
        `Detected circular imports between output chunks:\n${formatted}\n` +
        `\nChunk cycles produce TDZ runtime errors (e.g. "X is undefined") ` +
        `because Rollup emits real ESM and one chunk can observe another ` +
        `chunk's not-yet-initialized top-level vars mid-evaluation. ` +
        `Review \`output.manualChunks\` or any plugin assigning chunks.`;

      if (onCycle === 'error') {
        this.error(message);
      } else {
        this.warn(message);
      }
    },
  };
}

export default pluginChunkCycleCheck;

/**
 * Pure graph algorithm extracted for direct unit testing. Builds the
 * chunk-to-chunk import graph and returns every elementary cycle found.
 */
export function findChunkCycles(bundle: MinimalBundle): string[][] {
  const chunks = Object.values(bundle).filter(
    (entry): entry is MinimalChunk => entry.type === 'chunk'
  );
  const graph = new Map<string, string[]>();
  for (const chunk of chunks) {
    // `imports` covers static imports between chunks. `dynamicImports` are
    // deliberately ignored — those create legitimate lazy boundaries that
    // can back-reference the parent without a runtime cycle.
    graph.set(chunk.fileName, chunk.imports);
  }

  const WHITE = 0;
  const GRAY = 1;
  const BLACK = 2;
  const color = new Map<string, number>();
  for (const name of graph.keys()) color.set(name, WHITE);

  const cycles: string[][] = [];
  const seenCycleKeys = new Set<string>();
  const pathStack: string[] = [];

  const visit = (node: string): void => {
    color.set(node, GRAY);
    pathStack.push(node);
    for (const next of graph.get(node) ?? []) {
      // Imports may reference assets or chunks outside our map (e.g. CSS).
      if (!graph.has(next)) continue;
      const nextColor = color.get(next);
      if (nextColor === GRAY) {
        const startIdx = pathStack.indexOf(next);
        const cycle = pathStack.slice(startIdx).concat(next);
        // Normalize so we report each elementary cycle only once regardless
        // of which node in the cycle DFS entered from.
        const key = [...cycle].slice(0, -1).sort().join('|');
        if (!seenCycleKeys.has(key)) {
          seenCycleKeys.add(key);
          cycles.push(cycle);
        }
      } else if (nextColor === WHITE) {
        visit(next);
      }
    }
    pathStack.pop();
    color.set(node, BLACK);
  };

  for (const node of graph.keys()) {
    if (color.get(node) === WHITE) visit(node);
  }
  return cycles;
}
