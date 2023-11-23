import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'drawer-small-without-controls'}
  ${'drawer-small-with-long-title'}
  ${'drawer-small'}
  ${'drawer-large'}
  ${'drawer-large-with-info-dialog'}
  ${'drawer-xlarge'}
`('Drawer $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/drawer/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/This is the drawer content');
    await percySnapshot(page, `Drawer/${path}`);
  });
});
