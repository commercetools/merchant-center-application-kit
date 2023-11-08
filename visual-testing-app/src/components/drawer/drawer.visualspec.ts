import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'drawer-xlarge'}
  ${'drawer-large'}
  ${'drawer-small'}
  ${'drawer-small-without-controls'}
`('Drawer $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/drawer/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/This is the drawer content');
    await percySnapshot(page, `Drawer/${path}`);
  });
});
