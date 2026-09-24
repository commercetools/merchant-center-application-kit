import fs from 'fs';
import {
  processConfig,
  type ApplicationRuntimeConfig,
} from '@commercetools-frontend/application-config';
import processHeaders from './process-headers';
import replaceHtmlPlaceholders from './replace-html-placeholders';
import createFingerprint from './utils/create-fingerprint';

type TCompileHtmlResult = {
  env: ApplicationRuntimeConfig['env'];
  headers: Record<string, string | undefined>;
  indexHtmlContent: string;
};

async function compileHtml(
  indexHtmlTemplatePath: string
): Promise<TCompileHtmlResult> {
  // Read before computing headers: the fingerprint is derived from this
  // content and has to be on `env` by the time `processHeaders` hashes the
  // inline script, or the hash would not cover the script that gets injected.
  const indexHtmlTemplateContent = fs.readFileSync(
    indexHtmlTemplatePath,
    'utf8'
  );

  const applicationConfig = await processConfig();

  // A copy, not a mutation: `processConfig` memoises its result, so writing to
  // it would leak the fingerprint to any later caller in the same process.
  const applicationConfigWithFingerprint: ApplicationRuntimeConfig = {
    ...applicationConfig,
    env: {
      ...applicationConfig.env,
      buildFingerprint: createFingerprint({
        revision: applicationConfig.env.revision,
        indexHtmlTemplate: indexHtmlTemplateContent,
      }),
    },
  };

  const compiledHeaders = processHeaders(applicationConfigWithFingerprint);
  const indexHtmlContent = replaceHtmlPlaceholders(indexHtmlTemplateContent, {
    env: applicationConfigWithFingerprint.env,
    headers: compiledHeaders,
  });

  return {
    env: applicationConfigWithFingerprint.env,
    headers: compiledHeaders,
    indexHtmlContent,
  };
}

export default compileHtml;
