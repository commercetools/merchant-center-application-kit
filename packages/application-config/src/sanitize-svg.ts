import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('');
const DOMPurify = createDOMPurify(jsdom.window);

export default function sanitizeSvg(data: string) {
  return DOMPurify.sanitize(data, {
    USE_PROFILES: { svg: true },
    FORBID_ATTR: [
      // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
      'style',
    ],
  });
}
