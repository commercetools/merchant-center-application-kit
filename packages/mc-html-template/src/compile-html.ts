import fs from 'fs';
import {
  processConfig,
  type ApplicationRuntimeConfig,
} from '@commercetools-frontend/application-config';
import processHeaders from './process-headers';
import replaceHtmlPlaceholders from './replace-html-placeholders';

type TCompileHtmlResult = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
  indexHtmlContent: string;
};

async function compileHtml(
  indexHtmlTemplatePath: string
): Promise<TCompileHtmlResult> {
  const applicationConfig = await processConfig();
  const compiledHeaders = processHeaders(applicationConfig);

  const indexHtmlTemplateContent = fs.readFileSync(
    indexHtmlTemplatePath,
    'utf8'
  );
  const indexHtmlContent = replaceHtmlPlaceholders(indexHtmlTemplateContent, {
    env: applicationConfig.env,
    headers: compiledHeaders,
  });
  return {
    env: applicationConfig.env,
    headers: compiledHeaders,
    indexHtmlContent,
  };
}

export default compileHtml;
