import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PublicPageFormWide', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/public-page-form-wide`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/PublicPageFormWide');
    await percySnapshot(page, 'PublicPageFormWide');
  });
});
