import path from 'path';
import { createFsFromVolume, Volume } from 'memfs';
import webpack, { type Stats } from 'webpack';

const compiler = (fixture: string): Promise<Stats> => {
  const compiler = webpack({
    context: __dirname,
    entry: `./fixtures/${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: {
            loader: path.resolve(
              __dirname,
              './i18n-message-compilation-loader.ts'
            ),
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
  describe('when messages are in KEYVALUEJSON format', () => {
    it('should return compiled messages', async () => {
      const stats = await compiler('example-keyvalue.json');
      const output = stats.toJson({ source: true }).modules?.[0].source;

      expect(JSON.parse(output!.toString())).toMatchInlineSnapshot(`
        {
          "keyOne": [
            {
              "type": 0,
              "value": "Lorem ipsum dolor sit amet",
            },
          ],
          "keyTwo": [
            {
              "type": 0,
              "value": "consectetur adipiscing elit, ",
            },
            {
              "type": 1,
              "value": "sed",
            },
            {
              "type": 0,
              "value": " do eiusmod",
            },
          ],
        }
      `);
    });
  });

  describe('when messages are in STRUCTURED_JSON format', () => {
    it('should return compiled messages', async () => {
      const stats = await compiler('example-structured.json');
      const output = stats.toJson({ source: true }).modules?.[0].source;

      expect(JSON.parse(output!.toString())).toMatchInlineSnapshot(`
        {
          "keyOne": [
            {
              "type": 0,
              "value": "Lorem ipsum dolor sit amet",
            },
          ],
          "keyTwo": [
            {
              "type": 0,
              "value": "consectetur adipiscing elit, ",
            },
            {
              "type": 1,
              "value": "sed",
            },
            {
              "type": 0,
              "value": " do eiusmod",
            },
          ],
        }
      `);
    });
  });

  describe('when messages are empty', () => {
    it('should return an empty object', async () => {
      const stats = await compiler('example-empty.json');
      const output = stats.toJson({ source: true }).modules?.[0].source;

      expect(JSON.parse(output!.toString())).toMatchInlineSnapshot(`{}`);
    });
  });
});
