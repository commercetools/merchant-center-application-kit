import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('FormMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-main-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('FormMainPage');
    await percySnapshot(page, 'FormMainPage');
  });
});
