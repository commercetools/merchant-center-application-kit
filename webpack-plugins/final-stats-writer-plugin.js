const fs = require('fs');

class FinalStatsWriterPlugin {
  // Expected options:
  // - `outputPath`
  // - `includeFields`
  constructor(config) {
    if (!config) throw new Error('Missing config options');
    this.config = config;
  }

  apply(compiler) {
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
      compiler.plugin('done', this.writeStats.bind(this));
    }
  }

  writeStats(stats) {
    let finalStats = stats.toJson();

    // Filter only included fields
    if (this.config.includeFields) {
      finalStats = this.config.includeFields.reduce(
        (aggregatedStats, key) =>
          // eslint-disable-next-line prefer-object-spread/prefer-object-spread
          Object.assign({}, aggregatedStats, {
            [key]: finalStats[key],
          }),
        {}
      );
    }

    fs.writeFileSync(
      this.config.outputPath,
      JSON.stringify(finalStats, null, 2)
    );
  }
}

module.exports = FinalStatsWriterPlugin;
