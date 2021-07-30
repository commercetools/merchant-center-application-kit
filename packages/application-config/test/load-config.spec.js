import path from 'path';
import loadConfig from '../src/load-config';

describe.each`
  extension | fixtureApp
  ${'.js'}  | ${'app-js'}
  ${'.cjs'} | ${'app-cjs'}
  ${'.mjs'} | ${'app-mjs'}
  ${'.ts'}  | ${'app-ts'}
`('loading config for file extension "$extension"', ({ fixtureApp }) => {
  it('should load and parse the config', () => {
    const applicationPath = path.join(__dirname, 'fixtures', fixtureApp);
    const config = loadConfig(applicationPath);
    expect(config.name).toBeDefined();
  });
});
