import { percySnapshot } from '@percy/puppeteer';

describe(`FormModalPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormModalPage');
    await percySnapshot(page, `FormModalPage`);
  });
});
