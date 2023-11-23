import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'tabular-modal-page-default'}
  ${'tabular-modal-page-default-controls'}
  ${'tabular-modal-page-custom-controls'}
  ${'tabular-modal-page-custom-title-row-no-controls'}
  ${'tabular-modal-page-custom-title-row-default-controls'}
  ${'tabular-modal-page-hidden-controls'}
  ${'tabular-modal-page-custom-title-row-long-content'}
  ${'tabular-modal-page-default-with-custom-views-selector'}
`('TabularModalPage $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-modal-page/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/Lorem ipsum');
    await percySnapshot(page, `TabularModalPage/${path}`);
  });
});
