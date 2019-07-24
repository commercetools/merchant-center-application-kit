import { percySnapshot } from '@percy/puppeteer';

describe(`Notifications`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/notifications`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Notification');
    await percySnapshot(page, `Notifications`);
  });
});
