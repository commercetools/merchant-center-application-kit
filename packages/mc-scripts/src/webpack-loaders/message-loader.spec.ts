import path from 'path';
import { createFsFromVolume, Volume } from 'memfs';
import webpack, { type Stats } from 'webpack';

const compiler = (fixture: string): Promise<Stats> => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: {
            loader: path.resolve(__dirname, './message-loader.ts'),
          },
        },
      ],
    },
  });

  // @ts-expect-error: IFs returned by createFsFromVolume does not exactly match OutputFileSystem
  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem!.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats === undefined)
        return reject('Unexpected missing stats from webpack compiler');
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};

describe('message loader', () => {
  const expectedOutput = {
    keyOne: [{ type: 0, value: expect.any(String) }],
    keyTwo: [
      { type: 0, value: expect.any(String) },
      { type: 1, value: expect.any(String) },
      { type: 0, value: expect.any(String) },
    ],
  };

  describe('when messages are in KEYVALUEJSON format', () => {
    it('returns compiled messages', async () => {
      const stats = await compiler('example-keyvalue.json');
      const output = stats.toJson({ source: true }).modules?.[0].source;

      expect(JSON.parse(output!.toString())).toEqual(expectedOutput);
    });
  });

  describe('when messages are in STRUCTURED_JSON format', () => {
    it('returns compiled messages', async () => {
      const stats = await compiler('example-structured.json');
      const output = stats.toJson({ source: true }).modules?.[0].source;

      expect(JSON.parse(output!.toString())).toEqual(expectedOutput);
    });
  });
});
