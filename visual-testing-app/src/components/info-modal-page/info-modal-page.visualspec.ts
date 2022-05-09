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
    await expect(page).toMatch('Lorem ipsum');
    await percySnapshot(page, `InfoModalPage/${path}`);
  });
});
