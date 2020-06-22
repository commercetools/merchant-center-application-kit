import { percySnapshot } from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('PageUnauthorized', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/page-unauthorized`);
  });

  it('Default', async () => {
    await expect(page).toMatch('PageUnauthorized');
    await percySnapshot(page, 'PageUnauthorized');
  });
});
