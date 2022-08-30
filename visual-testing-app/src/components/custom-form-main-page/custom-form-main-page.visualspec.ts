import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('CustomFormMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-form-main-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('CustomFormMainPage');
    await percySnapshot(page, 'CustomFormMainPage');
  });
});
