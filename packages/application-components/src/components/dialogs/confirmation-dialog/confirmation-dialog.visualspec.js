import { percySnapshot } from '@percy/puppeteer';

describe(`ConfirmationDialog`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/confirmation-dialog`);
  });

  it('Default', async () => {
    await expect(page).toMatch('ConfirmationDialog');
    await percySnapshot(page, `ConfirmationDialog`);
  });
});
