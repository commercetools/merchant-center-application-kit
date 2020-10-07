const fs = require('fs');
const { processConfig } = require('@commercetools-frontend/application-config');
const processHeaders = require('./process-headers');
const replaceHtmlPlaceholders = require('./utils/replace-html-placeholders');

module.exports = async function compileHtml(indexHtmlTemplatePath) {
  const applicationConfig = processConfig();
  const compiledHeaders = processHeaders(applicationConfig);

  const indexHtmlTemplateContent = fs.readFileSync(
    indexHtmlTemplatePath,
    'utf8'
  );
  const indexHtmlContent = replaceHtmlPlaceholders(
    indexHtmlTemplateContent,
    applicationConfig.env
  );
  return {
    env: applicationConfig.env,
    headers: compiledHeaders,
    indexHtmlContent,
  };
};
