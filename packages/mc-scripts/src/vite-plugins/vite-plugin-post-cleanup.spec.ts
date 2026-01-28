import fs from 'node:fs';
import { globSync } from 'glob';
import type { Plugin } from 'vite';
import pluginPostCleanup from './vite-plugin-post-cleanup';

jest.mock('node:fs');
jest.mock('glob', () => ({
  globSync: jest.fn(),
}));

const mockedFs = jest.mocked(fs);
const mockedGlobSync = jest.mocked(globSync);

/**
 * Triggers the closeBundle hook on a Vite plugin.
 * Cast is needed because Vite's closeBundle expects `this` to be PluginContext,
 * but our implementation doesn't use `this`.
 */
const triggerCloseBundle = (plugin: Plugin) => {
  if (typeof plugin.closeBundle === 'function') {
    (plugin.closeBundle as () => void)();
  }
};

describe('vite-plugin-post-cleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('plugin structure', () => {
    it('should return a plugin with correct name', () => {
      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      expect(plugin.name).toBe('vite-plugin-post-cleanup');
    });

    it('should have apply set to "build"', () => {
      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      expect(plugin.apply).toBe('build');
    });

    it('should have a closeBundle hook', () => {
      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      expect(typeof plugin.closeBundle).toBe('function');
    });
  });

  describe('file deletion', () => {
    it('should delete files matching a single pattern', () => {
      mockedGlobSync.mockReturnValue(['icon.svg', 'logo.svg']);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      // Trigger the closeBundle hook
      triggerCloseBundle(plugin);

      expect(mockedFs.unlinkSync).toHaveBeenCalledTimes(2);
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/icon.svg');
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/logo.svg');
    });

    it('should delete files matching multiple patterns', () => {
      mockedGlobSync
        .mockReturnValueOnce(['icon.svg'])
        .mockReturnValueOnce(['temp.tmp']);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg', '*.tmp'],
      });

      triggerCloseBundle(plugin);

      expect(mockedFs.unlinkSync).toHaveBeenCalledTimes(2);
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/icon.svg');
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/temp.tmp');
    });

    it('should not call unlinkSync when no files match', () => {
      mockedGlobSync.mockReturnValue([]);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.nonexistent'],
      });

      triggerCloseBundle(plugin);

      expect(mockedFs.unlinkSync).not.toHaveBeenCalled();
    });

    it('should use the correct output directory for glob', () => {
      mockedGlobSync.mockReturnValue([]);

      const plugin = pluginPostCleanup({
        outputDir: '/custom/output/path',
        patterns: ['*.svg'],
      });

      triggerCloseBundle(plugin);

      expect(mockedGlobSync).toHaveBeenCalledWith('*.svg', {
        cwd: '/custom/output/path',
      });
    });
  });

  describe('verbose logging', () => {
    it('should log deleted files when verbose is true', () => {
      mockedGlobSync.mockReturnValue(['icon.svg']);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
        verbose: true,
      });

      triggerCloseBundle(plugin);

      expect(console.log).toHaveBeenCalledWith(
        '[post-cleanup] Deleted: icon.svg'
      );
    });

    it('should not log deleted files when verbose is false', () => {
      mockedGlobSync.mockReturnValue(['icon.svg']);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
        verbose: false,
      });

      triggerCloseBundle(plugin);

      expect(console.log).not.toHaveBeenCalled();
    });

    it('should log "no files matched" when verbose is true and no files match', () => {
      mockedGlobSync.mockReturnValue([]);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
        verbose: true,
      });

      triggerCloseBundle(plugin);

      expect(console.log).toHaveBeenCalledWith(
        '[post-cleanup] No files matched the patterns'
      );
    });

    it('should not log "no files matched" when files were deleted with verbose true', () => {
      mockedGlobSync.mockReturnValue(['icon.svg']);

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
        verbose: true,
      });

      triggerCloseBundle(plugin);

      expect(console.log).toHaveBeenCalledWith(
        '[post-cleanup] Deleted: icon.svg'
      );
      expect(console.log).not.toHaveBeenCalledWith(
        '[post-cleanup] No files matched the patterns'
      );
    });
  });

  describe('error handling', () => {
    it('should warn when file deletion fails', () => {
      const error = new Error('Permission denied');
      mockedGlobSync.mockReturnValue(['protected.svg']);
      mockedFs.unlinkSync.mockImplementation(() => {
        throw error;
      });

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      triggerCloseBundle(plugin);

      expect(console.warn).toHaveBeenCalledWith(
        '[post-cleanup] Failed to delete protected.svg:',
        error
      );
    });

    it('should continue deleting other files after one fails', () => {
      mockedGlobSync.mockReturnValue(['fail.svg', 'success.svg']);
      mockedFs.unlinkSync
        .mockImplementationOnce(() => {
          throw new Error('Permission denied');
        })
        .mockImplementationOnce(() => {});

      const plugin = pluginPostCleanup({
        outputDir: '/build',
        patterns: ['*.svg'],
      });

      triggerCloseBundle(plugin);

      expect(mockedFs.unlinkSync).toHaveBeenCalledTimes(2);
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/fail.svg');
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith('/build/success.svg');
    });
  });
});
