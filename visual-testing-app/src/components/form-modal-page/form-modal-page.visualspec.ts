import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'form-modal-one'}
  ${'form-modal-primary-disabled'}
  ${'form-modal-secondary-disabled'}
  ${'form-modal-long'}
  ${'form-modal-hidden-controls'}
  ${'form-modal-custom-views-selector'}
`('FormModalPage $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-modal-page/${path}`);
  });

  it('renders page', async () => {
    await page.waitForSelector('text/Lorem ipsum');
    await percySnapshot(page, `FormModalPage/${path}`);
  });
});
