import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('Application icons', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/application-icons`);
  });

  it('Default', async () => {
    await expect(page).toMatch('Application icons');
    await percySnapshot(page, 'Application icons');
  });
});
