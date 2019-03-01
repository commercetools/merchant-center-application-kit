import { percySnapshot } from '@percy/puppeteer';

describe('PageNotFound', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/dummy`);
  });

  it('Default', async () => {
    await percySnapshot(page, 'Dummy');
  });
});
