import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PublicPageFormWide', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/public-page-form-wide`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PublicPageFormWide');
    await percySnapshot(page, 'PublicPageFormWide');
  });
});
