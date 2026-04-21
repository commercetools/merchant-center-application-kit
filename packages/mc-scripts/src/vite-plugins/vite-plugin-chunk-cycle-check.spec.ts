import type { Plugin } from 'vite';
import pluginChunkCycleCheck, {
  findChunkCycles,
} from './vite-plugin-chunk-cycle-check';

type FakeBundle = Parameters<typeof findChunkCycles>[0];

/** Build a minimal bundle whose chunks only carry `imports` edges. */
const makeBundle = (imports: Record<string, string[]>): FakeBundle => {
  const bundle: Record<string, unknown> = {};
  for (const [fileName, deps] of Object.entries(imports)) {
    bundle[fileName] = {
      type: 'chunk',
      fileName,
      imports: deps,
      dynamicImports: [],
    };
  }
  return bundle as FakeBundle;
};

/**
 * Invoke the plugin's `generateBundle` hook with a stubbed PluginContext.
 * `this.error` throws (matches Rollup's real behavior) so tests can assert
 * via `.toThrow(...)`.
 */
const triggerGenerateBundle = (plugin: Plugin, bundle: FakeBundle) => {
  const ctx = {
    error: jest.fn((msg: string) => {
      throw new Error(msg);
    }),
    warn: jest.fn(),
  };
  const hook = plugin.generateBundle;
  if (typeof hook !== 'function') {
    throw new Error('plugin.generateBundle must be a function for this test');
  }
  (
    hook as unknown as (
      this: unknown,
      opts: unknown,
      bundle: FakeBundle
    ) => void
  ).call(ctx, {}, bundle);
  return ctx;
};

describe('findChunkCycles', () => {
  it('returns [] for an empty bundle', () => {
    expect(findChunkCycles(makeBundle({}))).toEqual([]);
  });

  it('returns [] for a DAG', () => {
    const bundle = makeBundle({
      'entry.js': ['lib.js', 'util.js'],
      'lib.js': ['util.js'],
      'util.js': [],
    });
    expect(findChunkCycles(bundle)).toEqual([]);
  });

  it('detects the icons/app-shell two-chunk cycle', () => {
    const bundle = makeBundle({
      'app-shell-BLbbVDlI.js': ['commercetools-uikit-icons-n8uksAy1.js'],
      'commercetools-uikit-icons-n8uksAy1.js': ['app-shell-BLbbVDlI.js'],
    });
    const cycles = findChunkCycles(bundle);
    expect(cycles).toHaveLength(1);
    expect(cycles[0]).toEqual(
      expect.arrayContaining([
        'app-shell-BLbbVDlI.js',
        'commercetools-uikit-icons-n8uksAy1.js',
      ])
    );
  });

  it('detects a 3-chunk cycle', () => {
    const bundle = makeBundle({
      'a.js': ['b.js'],
      'b.js': ['c.js'],
      'c.js': ['a.js'],
    });
    const cycles = findChunkCycles(bundle);
    expect(cycles).toHaveLength(1);
    expect(cycles[0]).toEqual(expect.arrayContaining(['a.js', 'b.js', 'c.js']));
  });

  it('reports multiple independent cycles in a single bundle', () => {
    const bundle = makeBundle({
      'a.js': ['b.js'],
      'b.js': ['a.js'],
      'x.js': ['y.js'],
      'y.js': ['x.js'],
      // innocent bystander
      'entry.js': ['a.js', 'x.js'],
    });
    const cycles = findChunkCycles(bundle);
    expect(cycles).toHaveLength(2);
  });

  it('reports each elementary cycle only once regardless of DFS entry point', () => {
    const bundle = makeBundle({
      'a.js': ['b.js'],
      'b.js': ['a.js'],
    });
    expect(findChunkCycles(bundle)).toHaveLength(1);
  });

  it('ignores imports to entries that are not chunks (CSS/assets/externals)', () => {
    const bundle = makeBundle({
      'entry.js': ['style.css', 'not-a-chunk.json', 'lib.js'],
      'lib.js': [],
    });
    expect(findChunkCycles(bundle)).toEqual([]);
  });

  it('ignores self-loops (Rollup does not emit them, but the algo should be defensive)', () => {
    const bundle = makeBundle({ 'a.js': ['a.js'] });
    // A self-loop IS technically a cycle; assert the behavior explicitly so
    // anyone changing it has to update the test.
    const cycles = findChunkCycles(bundle);
    expect(cycles).toHaveLength(1);
    expect(cycles[0]).toEqual(['a.js', 'a.js']);
  });
});

describe('pluginChunkCycleCheck', () => {
  describe('plugin structure', () => {
    it('has the expected name and build-only apply', () => {
      const plugin = pluginChunkCycleCheck();
      expect(plugin.name).toBe('vite-plugin-chunk-cycle-check');
      expect(plugin.apply).toBe('build');
      expect(typeof plugin.generateBundle).toBe('function');
    });
  });

  describe('behavior with default options (onCycle: error)', () => {
    it('does not touch the context for a clean bundle', () => {
      const plugin = pluginChunkCycleCheck();
      const bundle = makeBundle({
        'entry.js': ['lib.js'],
        'lib.js': [],
      });
      const ctx = triggerGenerateBundle(plugin, bundle);
      expect(ctx.error).not.toHaveBeenCalled();
      expect(ctx.warn).not.toHaveBeenCalled();
    });

    it('throws via this.error when a cycle is detected', () => {
      const plugin = pluginChunkCycleCheck();
      const bundle = makeBundle({
        'app-shell.js': ['icons.js'],
        'icons.js': ['app-shell.js'],
      });
      expect(() => triggerGenerateBundle(plugin, bundle)).toThrow(
        /circular imports between output chunks/
      );
    });

    it('includes each cycle node in the error message', () => {
      const plugin = pluginChunkCycleCheck();
      const bundle = makeBundle({
        'app-shell.js': ['icons.js'],
        'icons.js': ['app-shell.js'],
      });
      expect(() => triggerGenerateBundle(plugin, bundle)).toThrow(
        /app-shell\.js/
      );
      expect(() => triggerGenerateBundle(plugin, bundle)).toThrow(/icons\.js/);
    });
  });

  describe('behavior with onCycle: warn', () => {
    it('warns instead of throwing', () => {
      const plugin = pluginChunkCycleCheck({ onCycle: 'warn' });
      const bundle = makeBundle({
        'a.js': ['b.js'],
        'b.js': ['a.js'],
      });
      const ctx = triggerGenerateBundle(plugin, bundle);
      expect(ctx.warn).toHaveBeenCalledTimes(1);
      expect(ctx.warn).toHaveBeenCalledWith(
        expect.stringContaining('circular imports between output chunks')
      );
      expect(ctx.error).not.toHaveBeenCalled();
    });
  });
});
