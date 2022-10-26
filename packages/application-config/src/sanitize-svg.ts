import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('');
// @ts-expect-error: jsdom returns DOMWindow, which doesn't match Window dompurify expects
const DOMPurify = createDOMPurify(jsdom.window);

export default function sanitizeSvg(data: string) {
  return DOMPurify.sanitize(data, {
    USE_PROFILES: { svg: true },
    RETURN_DOM: true,
    FORBID_ATTR: [
      // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
      'style',
    ],
  }).innerHTML;
}
