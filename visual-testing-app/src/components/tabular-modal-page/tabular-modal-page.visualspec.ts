import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

jest.setTimeout(1000);

describe('TabularModalPage', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/tabular-modal-page`);
    await new Promise((resolve) => setTimeout(resolve, 300));
  });

  it('Default', async () => {
    await expect(page).toMatch('TabularModalPage');
    await percySnapshot(page, 'TabularModalPage');
  });
});
