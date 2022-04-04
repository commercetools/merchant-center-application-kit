const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('');
const DOMPurify = createDOMPurify(jsdom.window);

const sanitizeSvg = (data) =>
  DOMPurify.sanitize(data, {
    USE_PROFILES: { svg: true },
    FORBID_ATTR: [
      // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
      'style',
    ],
  });

module.exports = sanitizeSvg;
