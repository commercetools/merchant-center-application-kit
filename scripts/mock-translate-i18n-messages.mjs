import fs from 'node:fs';
import path from 'node:path';
import { getPackagesSync } from '@manypkg/get-packages';

const templateName = process.env.TEMPLATE_NAME;
if (!templateName) {
  throw new Error('Missing required environment variable "TEMPLATE_NAME"');
}
const applicationType = process.env.APPLICATION_TYPE;
if (!applicationType) {
  throw new Error(
    'Missing required environment variable "APPLICATION_TYPE" (either "custom-application" or "custom-view")'
  );
}

const isCustomApplicationStarterTemplate =
  applicationType === 'custom-application' && templateName === 'starter';
const isCustomViewStarterTypescriptTemplate =
  applicationType === 'custom-view' && templateName === 'starter-typescript';
if (
  !(isCustomApplicationStarterTemplate || isCustomViewStarterTypescriptTemplate)
) {
  process.exit(0);
}

const { packages } = getPackagesSync();
const templateFolderByApplicationType =
  applicationType === 'custom-application'
    ? 'application-templates'
    : 'custom-views-templates';
const targetPackage = packages.find((pack) =>
  pack.dir.includes(`${templateFolderByApplicationType}/${templateName}`)
);
if (!targetPackage) {
  throw new Error(
    `Mock translation error: Can not find specified ${applicationType} template "${templateName}".`
  );
}

// convert and override core.json in STRUCTURED_JSON format
// performed on custom-view/starter-typescript template
if (templateName === 'starter-typescript') {
  const coreJsonRaw = fs.readFileSync(
    path.join(targetPackage.dir, './src/i18n/data/core.json'),
    { encoding: 'utf-8' }
  );
  const coreJson = JSON.parse(coreJsonRaw);

  const coreJsonInStructuredJsonFormat = Object.keys(coreJson).reduce(
    (allMessages, messageId) => ({
      ...allMessages,
      // return a simple STRUCTURED_JSON object
      [messageId]: { string: coreJson[messageId] },
    }),
    {}
  );

  const newCoreJsonString = JSON.stringify(coreJsonInStructuredJsonFormat);
  fs.writeFileSync(
    path.join(targetPackage.dir, './src/i18n/data/core.json'),
    newCoreJsonString
  );
  console.log(
    `Mock translations ==> Converted i18n/data/core.json to STRUCTURED_JSON format.`
  );
}

// copy core.json to en.json
// performed on custom-application/starter and custom-view/starter-typescript templates
fs.copyFileSync(
  path.join(targetPackage.dir, './src/i18n/data/core.json'),
  path.join(targetPackage.dir, './src/i18n/data/en.json')
);

console.log(
  `Mock translations ==> Copied i18n/data/core.json to i18n/data/en.json.`
);
