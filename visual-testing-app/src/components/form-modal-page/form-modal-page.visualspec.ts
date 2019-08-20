import { percySnapshot } from '@percy/puppeteer';
import { HOST } from '../../constants';

describe(`FormModalPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormModalPage');
    await percySnapshot(page, `FormModalPage`);
  });
});
