import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import type { Plugin } from 'vite';

type Options = {
  outputDir: string;
  patterns: string[];
  verbose?: boolean;
};

/**
 * A simple Vite plugin to clean up files matching glob patterns after build.
 * Replaces `vite-plugin-clean-build` to avoid the `inflight` vulnerability
 * in its transitive dependencies.
 */
function pluginCleanBuild(options: Options): Plugin {
  return {
    name: 'vite-plugin-clean-build',
    apply: 'build',
    closeBundle() {
      const { outputDir, patterns, verbose } = options;

      for (const pattern of patterns) {
        const files = globSync(pattern, { cwd: outputDir });

        for (const file of files) {
          const filePath = path.join(outputDir, file);
          try {
            fs.unlinkSync(filePath);
            if (verbose) {
              console.log(`[clean-build] Deleted: ${file}`);
            }
          } catch (error) {
            console.warn(`[clean-build] Failed to delete ${file}:`, error);
          }
        }
      }

      if (verbose && patterns.length > 0) {
        const totalFiles = patterns.reduce((sum, pattern) => {
          return sum + globSync(pattern, { cwd: outputDir }).length;
        }, 0);
        if (totalFiles === 0) {
          console.log('[clean-build] No files matched the patterns');
        }
      }
    },
  };
}

export default pluginCleanBuild;
