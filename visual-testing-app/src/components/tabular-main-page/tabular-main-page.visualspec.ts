import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('TabularMainPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-main-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularMainPage');
    await percySnapshot(page, 'TabularMainPage');
  });
});
