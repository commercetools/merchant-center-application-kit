// https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros
import htmlDocs from /* preval */ './load-html-docs';

type TGenerateTemplateOptions = {
  cssImports?: string[];
  scriptImports?: string[];
};

function generateTemplate({
  cssImports = [],
  scriptImports = [],
}: TGenerateTemplateOptions) {
  return htmlDocs.application
    .replace(
      new RegExp('__APPLICATION_CSS_IMPORTS__', 'g'),
      cssImports.join('\n')
    )
    .replace(
      new RegExp('__APPLICATION_SCRIPT_IMPORTS__', 'g'),
      scriptImports.join('\n')
    );
}

export default generateTemplate;
