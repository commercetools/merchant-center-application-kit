import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'custom-form-modal-page-default'}
  ${'custom-form-modal-page-default-controls'}
  ${'custom-form-modal-page-custom-controls'}
  ${'custom-form-modal-page-hidden-controls'}
`('CustomFormModalPage $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/custom-form-modal-page/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/Lorem ipsum');
    await percySnapshot(page, `CustomFormModalPage/${path}`);
  });
});
