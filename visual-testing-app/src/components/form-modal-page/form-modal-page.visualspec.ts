import percySnapshot from '@percy/puppeteer';
import { HOST } from '../../constants';

describe.each`
  path
  ${'form-modal-one'}
  ${'form-modal-primary-disabled'}
  ${'form-modal-secondary-disabled'}
  ${'form-modal-long'}
  ${'form-modal-hidden-controls'}
`('FormModalPage $path', ({ path }) => {
  beforeAll(async () => {
    await page.goto(`${HOST}/form-modal-page/${path}`);
  });

  it('renders page', async () => {
    await expect(page).toMatch('Lorem ipsum');
    await percySnapshot(page, `FormModalPage/${path}`);
  });
});
