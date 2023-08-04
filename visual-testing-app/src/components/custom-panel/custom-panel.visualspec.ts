import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'custom-panel-large'}
  ${'custom-panel-small'}
`('CustomPanel $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-views/custom-panel/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/This is the panel content');
    await percySnapshot(page, `CustomPanel/${path}`);
  });
});
