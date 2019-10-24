// This code is from https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs
import Prism from 'prismjs';
import escape from 'lodash.escape';
import loadPrismLanguage from './code-block-load-prism-language';
import handleDirectives from './code-block-directives';

const unsupportedLanguages = new Set();

export default (
  language,
  code,
  lineNumbersHighlight = [],
  noInlineHighlight = false
) => {
  // (Try to) load languages on demand.
  if (!Prism.languages[language]) {
    try {
      loadPrismLanguage(language);
    } catch (e) {
      // Language wasn't loaded so let's bail.
      let message = null;
      switch (language) {
        case `none`:
          return code; // Don't escape if set to none.
        case `text`:
          message = noInlineHighlight
            ? `code block language not specified in markdown.`
            : `code block or inline code language not specified in markdown.`;
          break;
        default:
          message = `unable to find prism language '${language}' for highlighting.`;
      }

      const lang = language.toLowerCase();
      if (!unsupportedLanguages.has(lang)) {
        console.warn(message, `applying generic code block`);
        unsupportedLanguages.add(lang);
      }
      return escape(code);
    }
  }

  const grammar = Prism.languages[language];
  const highlighted = Prism.highlight(code, grammar, language);
  const codeSplits = handleDirectives(highlighted, lineNumbersHighlight);

  let finalCode = ``;
  const lastIdx = codeSplits.length - 1; // Don't add back the new line character after highlighted lines
  // as they need to be display: block and full-width.

  codeSplits.forEach((split, idx) => {
    /* Original version */
    // finalCode += split.highlight
    //   ? split.code
    //   : `${split.code}${idx == lastIdx ? `` : `\n`}`;
    /* Patched version for line highlighting */
    finalCode += `${split.code}${idx == lastIdx ? `` : `\n`}`;
  });
  return finalCode;
};
