import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PublicPageForm', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/public-page-form`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PublicPageForm');
    await percySnapshot(page, 'PublicPageForm');
  });
});
