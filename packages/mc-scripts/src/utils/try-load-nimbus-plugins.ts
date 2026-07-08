import type { Plugin } from 'vite';

type NimbusPluginOptions = {
  cwd?: string;
  UNSAFE_forceStub?: boolean;
};

// Source of truth: `@commercetools/nimbus` `src/plugins/nimbus-runtime-re.ts`.
// Matches `@commercetools/nimbus` and any subpath EXCEPT `/plugins` and
// `/plugins/*`. Duplicated here (rather than imported) on purpose: these
// fallbacks only run when `@commercetools/nimbus` is NOT installed, so none of
// its modules — including the regex — can be `require`d at that point.
const NIMBUS_RUNTIME_RE = /^@commercetools\/nimbus(?:$|\/(?!plugins(?:\/|$)))/;

// Empty CJS stub shipped by mc-scripts (see `packages/mc-scripts/nimbus-stub.js`).
// Bare specifier so webpack resolves it from the consumer app's build context —
// mc-scripts is always installed there, even when `@commercetools/nimbus` is not.
const NIMBUS_STUB_MODULE = '@commercetools-frontend/mc-scripts/nimbus-stub';

function isModuleNotFound(error: unknown): boolean {
  return (
    error instanceof Error &&
    'code' in error &&
    (error as NodeJS.ErrnoException).code === 'MODULE_NOT_FOUND'
  );
}

/**
 * webpack fallback used when `@commercetools/nimbus` — and therefore its own
 * `@commercetools/nimbus/plugins/webpack` — is not installed. Redirects every
 * Nimbus runtime import to the empty stub so the build resolves. Mirrors
 * nimbus's `UNSAFE_NimbusOptionalDependencyPlugin`, but ships from mc-scripts so
 * it works precisely in the case Nimbus is absent.
 */
class NimbusStubWebpackPlugin {
  apply(compiler: {
    webpack?: {
      NormalModuleReplacementPlugin: new (
        regex: RegExp,
        replacement: string
      ) => { apply: (compiler: unknown) => void };
    };
  }): void {
    if (!compiler.webpack) {
      throw new Error(
        'NimbusStubWebpackPlugin requires webpack 5+. ' +
          'compiler.webpack is undefined — are you using webpack 4 or older?'
      );
    }
    const { NormalModuleReplacementPlugin } = compiler.webpack;
    new NormalModuleReplacementPlugin(
      NIMBUS_RUNTIME_RE,
      NIMBUS_STUB_MODULE
    ).apply(compiler);
  }
}

/**
 * Vite fallback, mirroring nimbus's `UNSAFE_nimbusOptionalDependency` stub path:
 * resolve every Nimbus runtime import to a virtual empty CJS module so the build
 * resolves when `@commercetools/nimbus` is not installed.
 */
function createNimbusStubVitePlugin(): Plugin {
  // The `.cjs` extension makes named imports interop to `undefined` rather than
  // failing with a missing-export error (same trick nimbus uses).
  const STUB_ID = '\0mc-scripts-nimbus-stub.cjs';
  return {
    name: 'mc-scripts-nimbus-optional-dependency-fallback',
    // Run before Vite's default resolver, which would otherwise follow
    // workspace symlinks and resolve Nimbus even when the app has not installed it.
    enforce: 'pre',
    resolveId(source: string) {
      if (NIMBUS_RUNTIME_RE.test(source)) return STUB_ID;
      return undefined;
    },
    load(id: string) {
      if (id === STUB_ID) return 'module.exports = {};';
      return undefined;
    },
  };
}

export function loadNimbusWebpackPlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_NimbusOptionalDependencyPlugin,
    } = require('@commercetools/nimbus/plugins/webpack');
    return new UNSAFE_NimbusOptionalDependencyPlugin(options);
  } catch (error) {
    // Nimbus is not installed: its own plugin can't be loaded (it lives inside
    // Nimbus), so mc-scripts stubs the imports itself. Any other error (e.g. a
    // present-but-broken Nimbus) still surfaces.
    if (isModuleNotFound(error)) return new NimbusStubWebpackPlugin();
    throw error;
  }
}

export function loadNimbusVitePlugin(options?: NimbusPluginOptions) {
  try {
    const {
      UNSAFE_nimbusOptionalDependency,
    } = require('@commercetools/nimbus/plugins/vite');
    return UNSAFE_nimbusOptionalDependency(options);
  } catch (error) {
    if (isModuleNotFound(error)) return createNimbusStubVitePlugin();
    throw error;
  }
}
