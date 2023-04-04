import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('Notifications', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/notifications`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Notification');
    await percySnapshot(page, 'Notifications');
  });
});
