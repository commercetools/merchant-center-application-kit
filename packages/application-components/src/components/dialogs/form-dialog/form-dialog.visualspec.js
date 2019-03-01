import { percySnapshot } from '@percy/puppeteer';

describe(`FormDialog`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-dialog`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormDialog');
    await percySnapshot(page, `FormDialog`);
  });
});
