import type { Plugin } from 'vite';
import pluginModulePreloadShellChunks, {
  resolveShellChunks,
} from './vite-plugin-modulepreload-shell-chunks';

type FakeBundle = Parameters<typeof resolveShellChunks>[0];

type ChunkSpec = { name: string; imports?: string[] };

/** Bundle whose chunks carry the `name` / `fileName` split Rollup produces. */
const makeBundle = (chunks: Record<string, ChunkSpec>): FakeBundle => {
  const bundle: Record<string, unknown> = {};
  for (const [fileName, spec] of Object.entries(chunks)) {
    bundle[fileName] = {
      type: 'chunk',
      name: spec.name,
      fileName,
      imports: spec.imports ?? [],
    };
  }
  return bundle as FakeBundle;
};

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
  (hook as unknown as (this: unknown, o: unknown, b: unknown) => void).call(
    ctx,
    {},
    bundle
  );
  return ctx;
};

const getResolveDependencies = (plugin: Plugin) => {
  const configHook = plugin.config;
  if (typeof configHook !== 'function') {
    throw new Error('plugin.config must be a function for this test');
  }
  const partial = (
    configHook as unknown as (this: unknown) => {
      build: {
        modulePreload: {
          resolveDependencies: (
            url: string,
            deps: string[],
            ctx: { hostId: string; hostType: 'html' | 'js' }
          ) => string[];
        };
      };
    }
  ).call({});
  return partial.build.modulePreload.resolveDependencies;
};

describe('resolveShellChunks', () => {
  it('matches a root by chunk name prefix, ignoring the Rollup content hash', () => {
    const bundle = makeBundle({
      'navbar-9eb6c972.esm-Dt6Nt-wa.js': { name: 'navbar-9eb6c972.esm' },
    });

    expect(resolveShellChunks(bundle, ['navbar'])).toEqual({
      fileNames: ['navbar-9eb6c972.esm-Dt6Nt-wa.js'],
      matchedRoots: ['navbar'],
      missingRoots: [],
    });
  });

  it('still resolves after the dependency content hash changes', () => {
    const bundle = makeBundle({
      'navbar-DIFFERENT.esm-XyZ.js': { name: 'navbar-DIFFERENT.esm' },
    });

    expect(resolveShellChunks(bundle, ['navbar']).fileNames).toEqual([
      'navbar-DIFFERENT.esm-XyZ.js',
    ]);
  });

  it('follows static imports transitively', () => {
    const bundle = makeBundle({
      'navbar-a.js': { name: 'navbar-a.esm', imports: ['avatar-b.js'] },
      'avatar-b.js': { name: 'avatar-b.esm', imports: ['icons-c.js'] },
      'icons-c.js': { name: 'icons-c.esm' },
    });

    expect(resolveShellChunks(bundle, ['navbar']).fileNames).toEqual([
      'avatar-b.js',
      'icons-c.js',
      'navbar-a.js',
    ]);
  });

  it('does not include chunks unreachable from any root', () => {
    const bundle = makeBundle({
      'navbar-a.js': { name: 'navbar-a.esm' },
      'de-locale.js': { name: 'de' },
      'product-page.js': { name: 'product-page' },
    });

    expect(resolveShellChunks(bundle, ['navbar']).fileNames).toEqual([
      'navbar-a.js',
    ]);
  });

  it('terminates on a cyclic import graph', () => {
    const bundle = makeBundle({
      'navbar-a.js': { name: 'navbar-a.esm', imports: ['b.js'] },
      'b.js': { name: 'b', imports: ['navbar-a.js'] },
    });

    expect(resolveShellChunks(bundle, ['navbar']).fileNames).toEqual([
      'b.js',
      'navbar-a.js',
    ]);
  });

  it('reports unresolved roots without throwing', () => {
    const bundle = makeBundle({
      'navbar-a.js': { name: 'navbar-a.esm' },
    });

    const result = resolveShellChunks(bundle, ['navbar', 'project-container']);
    expect(result.matchedRoots).toEqual(['navbar']);
    expect(result.missingRoots).toEqual(['project-container']);
  });

  it('ignores non-chunk bundle entries', () => {
    const bundle = {
      'styles.css': { type: 'asset' },
      'navbar-a.js': {
        type: 'chunk',
        name: 'navbar-a.esm',
        fileName: 'navbar-a.js',
        imports: [],
      },
    } as unknown as FakeBundle;

    expect(resolveShellChunks(bundle, ['navbar']).fileNames).toEqual([
      'navbar-a.js',
    ]);
  });
});

describe('pluginModulePreloadShellChunks', () => {
  const shellBundle = makeBundle({
    'navbar-a.js': { name: 'navbar-a.esm', imports: ['avatar-b.js'] },
    'avatar-b.js': { name: 'avatar-b.esm' },
    'project-container-c.js': { name: 'project-container-c.esm' },
  });

  it('appends the resolved graph to the entry HTML preload list', () => {
    const plugin = pluginModulePreloadShellChunks({
      roots: ['navbar', 'project-container'],
    });
    triggerGenerateBundle(plugin, shellBundle);

    expect(
      getResolveDependencies(plugin)('index.js', [], {
        hostId: 'index.html',
        hostType: 'html',
      })
    ).toEqual(['avatar-b.js', 'navbar-a.js', 'project-container-c.js']);
  });

  it('preserves dependencies Vite already resolved', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: ['navbar'] });
    triggerGenerateBundle(plugin, shellBundle);

    expect(
      getResolveDependencies(plugin)('index.js', ['vendor.js'], {
        hostId: 'index.html',
        hostType: 'html',
      })
    ).toEqual(['vendor.js', 'avatar-b.js', 'navbar-a.js']);
  });

  it('passes through untouched for dynamic imports', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: ['navbar'] });
    triggerGenerateBundle(plugin, shellBundle);

    expect(
      getResolveDependencies(plugin)('route.js', ['route-dep.js'], {
        hostId: 'route.js',
        hostType: 'js',
      })
    ).toEqual(['route-dep.js']);
  });

  it('does not duplicate a dependency Vite already listed', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: ['navbar'] });
    triggerGenerateBundle(plugin, shellBundle);

    expect(
      getResolveDependencies(plugin)('index.js', ['navbar-a.js'], {
        hostId: 'index.html',
        hostType: 'html',
      })
    ).toEqual(['navbar-a.js', 'avatar-b.js']);
  });

  it('never preloads the host entry chunk itself', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: ['navbar'] });
    // Mirrors the real build: shell chunks statically import the entry.
    const bundle = makeBundle({
      'navbar-a.js': { name: 'navbar-a.esm', imports: ['index-entry.js'] },
      'index-entry.js': { name: 'index' },
    });
    triggerGenerateBundle(plugin, bundle);

    expect(
      getResolveDependencies(plugin)('index-entry.js', [], {
        hostId: 'index.html',
        hostType: 'html',
      })
    ).toEqual(['navbar-a.js']);
  });

  it('returns the original list when the bundle was never seen', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: ['navbar'] });

    expect(
      getResolveDependencies(plugin)('index.js', ['vendor.js'], {
        hostId: 'index.html',
        hostType: 'html',
      })
    ).toEqual(['vendor.js']);
  });

  it('fails the build when only some roots resolve', () => {
    const plugin = pluginModulePreloadShellChunks({
      roots: ['navbar', 'missing-thing'],
    });

    expect(() => triggerGenerateBundle(plugin, shellBundle)).toThrow(
      /missing-thing/
    );
  });

  it('names the roots that did resolve, so the diagnosis is actionable', () => {
    const plugin = pluginModulePreloadShellChunks({
      roots: ['navbar', 'missing-thing'],
    });

    expect(() => triggerGenerateBundle(plugin, shellBundle)).toThrow(/navbar/);
  });

  it('is a silent no-op when no root resolves, so Custom Views still build', () => {
    const plugin = pluginModulePreloadShellChunks({
      roots: ['navbar', 'project-container'],
    });
    const customViewBundle = makeBundle({
      'custom-view-shell.js': { name: 'custom-view-shell' },
    });

    const ctx = triggerGenerateBundle(plugin, customViewBundle);
    expect(ctx.error).not.toHaveBeenCalled();
    expect(ctx.warn).not.toHaveBeenCalled();
  });

  it('downgrades a partial miss to a warning when asked', () => {
    const plugin = pluginModulePreloadShellChunks({
      roots: ['navbar', 'missing-thing'],
      onMissing: 'warn',
    });

    const ctx = triggerGenerateBundle(plugin, shellBundle);
    expect(ctx.warn).toHaveBeenCalledWith(
      expect.stringContaining('missing-thing')
    );
    expect(ctx.error).not.toHaveBeenCalled();
  });

  it('treats an empty root set as a no-op', () => {
    const plugin = pluginModulePreloadShellChunks({ roots: [] });

    const ctx = triggerGenerateBundle(plugin, shellBundle);
    expect(ctx.error).not.toHaveBeenCalled();
  });
});
