import { percySnapshot } from '@percy/puppeteer';
import { HOST } from '../../constants';

describe(`CustomFormModalPage`, () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-form-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('CustomFormModalPage');
    await percySnapshot(page, `CustomFormModalPage`);
  });
});
