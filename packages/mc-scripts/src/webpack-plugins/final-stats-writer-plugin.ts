import fs from 'fs';
import path from 'path';
import type { Compiler, Stats } from 'webpack';

type TFinalStatsWriterPluginOptions = {
  outputPath: string;
  includeFields: string[];
};

class FinalStatsWriterPlugin {
  config: TFinalStatsWriterPluginOptions;

  // Expected options:
  // - `outputPath`
  // - `includeFields`
  constructor(config: TFinalStatsWriterPluginOptions) {
    if (!config) throw new Error('Missing config options');
    this.config = config;
  }

  apply(compiler: Compiler) {
    // This is the only hook that return the `stats` plugin
    // with the `time` info. It also contains all the stats that
    // we would get from the original `emit` hook.
    // https://webpack.js.org/api/compiler-hooks/#done
    // https://webpack.js.org/api/plugins/#plugin-types
    if (compiler.hooks) {
      compiler.hooks.done.tap(
        'custom-stats-writer-plugin',
        this.writeStats.bind(this)
      );
    } else {
      // @ts-ignore
      compiler.plugin('done', this.writeStats.bind(this));
    }
  }

  writeStats(stats: Stats) {
    let finalStats = stats.toJson();

    // Filter only included fields
    if (this.config.includeFields) {
      finalStats = this.config.includeFields.reduce(
        (aggregatedStats, key) =>
          // eslint-disable-next-line
          Object.assign({}, aggregatedStats, {
            [key]: finalStats[key],
          }),
        {}
      );
    }

    try {
      fs.accessSync(this.config.outputPath, fs.constants.F_OK);
      fs.writeFileSync(
        path.join(this.config.outputPath, 'stats.json'),
        JSON.stringify(finalStats, null, 2)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        `[FinalStatsWriterPlugin] The dist folder could not be found at ${this.config.outputPath}. Check the console for errors during the webpack compilation.`
      );
    }
  }
}

export default FinalStatsWriterPlugin;
