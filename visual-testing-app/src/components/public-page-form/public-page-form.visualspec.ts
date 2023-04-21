import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PublicPageForm', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/public-page-form`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/PublicPageForm');
    await percySnapshot(page, 'PublicPageForm');
  });
});
