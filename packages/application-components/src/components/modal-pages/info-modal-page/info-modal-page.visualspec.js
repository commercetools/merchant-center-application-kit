import { percySnapshot } from '@percy/puppeteer';

describe(`InfoModalPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('InfoModalPage');
    await percySnapshot(page, `InfoModalPage`);
  });
});
