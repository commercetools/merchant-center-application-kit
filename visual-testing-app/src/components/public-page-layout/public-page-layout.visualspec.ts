import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PublicPageLayout', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/public-page-layout`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PublicPageLayout');
    await percySnapshot(page, 'PublicPageLayout');
  });
});
