import { percySnapshot } from '@percy/puppeteer';

describe(`ModalPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('ModalPage');
    await percySnapshot(page, `ModalPage`);
  });
});
