import { percySnapshot } from '@percy/puppeteer';

const waitForMs = (ms = 1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

describe(`FormDialog`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-dialog`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormDialog');
    await page.click('#select-input');
    await waitForMs();
    await percySnapshot(page, `FormDialog`);
  });
});
