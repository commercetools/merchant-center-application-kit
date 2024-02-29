import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe('ProjectStamp', () => {
  beforeAll(async () => {
    await page.goto(`${HOST}/project-stamp`);
  });

  it('Default', async () => {
    await page.waitForSelector('text/Production project stamp');
    await percySnapshot(page, 'ProjectStamp');
  });
});
