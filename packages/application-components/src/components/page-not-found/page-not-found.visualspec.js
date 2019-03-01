import { percySnapshot } from '@percy/puppeteer';

describe('PageNotFound', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/page-not-found`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PageNotFound');
    await percySnapshot(page, 'PageNotFound');
  });
});
