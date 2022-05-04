/* eslint-disable import/first */
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('');
// @ts-expect-error: jsdom returns DOMWindow, which doesn't match Window dompurify expects
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
