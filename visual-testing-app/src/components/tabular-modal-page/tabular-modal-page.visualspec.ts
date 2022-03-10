import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('TabularModalPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-modal-page`);
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularModalPage');
    await new Promise((resolve) => setTimeout(resolve, 200));
    await percySnapshot(page, 'TabularModalPage');
  });
});
