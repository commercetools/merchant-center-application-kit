import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'info-modal-one'}
  ${'info-modal-long'}
  ${'info-modal-two'}
  ${'info-modal-nested'}
`('InfoModalPage $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/info-modal-page/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/Lorem ipsum');
    await percySnapshot(page, `InfoModalPage/${path}`);
  });
});
