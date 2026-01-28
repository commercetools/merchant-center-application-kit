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
 * Replaces `vite-plugin-post-cleanup` to avoid the `inflight` vulnerability
 * in its transitive dependencies.
 */
function pluginPostCleanup(options: Options): Plugin {
  return {
    name: 'vite-plugin-post-cleanup',
    apply: 'build',
    closeBundle() {
      const { outputDir, patterns, verbose } = options;
      let totalFilesDeleted = 0;

      for (const pattern of patterns) {
        const files = globSync(pattern, { cwd: outputDir });

        for (const file of files) {
          const filePath = path.join(outputDir, file);
          try {
            fs.unlinkSync(filePath);
            totalFilesDeleted++;
            if (verbose) {
              console.log(`[post-cleanup] Deleted: ${file}`);
            }
          } catch (error) {
            console.warn(`[post-cleanup] Failed to delete ${file}:`, error);
          }
        }
      }

      if (verbose && patterns.length > 0 && totalFilesDeleted === 0) {
        console.log('[post-cleanup] No files matched the patterns');
      }
    },
  };
}

export default pluginPostCleanup;
