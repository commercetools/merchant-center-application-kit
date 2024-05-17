import { getPackagesSync } from '@manypkg/get-packages';
import shelljs from 'shelljs';

const templateName = process.env.TEMPLATE_NAME;
if (!templateName) {
  throw new Error('Missing required environment variable "TEMPLATE_NAME"');
}

const { packages } = getPackagesSync();
const targetPackage = packages.find((pack) =>
  pack.dir.includes(`application-templates/${templateName}`)
);
if (!targetPackage) {
  throw new Error(
    `Mock translation error: Can not find specified application template "${templateName}".`
  );
}

const copyCoreJsonResult = shelljs.exec(
  ['cp', './src/i18n/data/core.json', './src/i18n/data/en.json'].join(' '),
  { cwd: targetPackage.dir }
);
if (copyCoreJsonResult.code > 0) {
  console.error(copyCoreJsonResult.stderr || copyCoreJsonResult.stdout);
  throw new Error(
    'Mock translation error: Copying core.json to en.json has failed.'
  );
}
console.log(
  `Mock translations ==> Copied i18n/data/core.json to i18n/data/en.json for the template "${templateName}".`
);
