/**
 * This script will extract the internationalization messages from all components
   and package them in the translation json files.
 */
require('shelljs/global');
const fs = require('fs');
const path = require('path');
const nodeGlob = require('glob');
const transform = require('babel-core').transform;

const babelrc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const presets = babelrc.env.development.presets;
const plugins = babelrc.env.development.plugins || [];

const DEFAULT_LOCALE = 'en';
const ROOT_PROJECT_PATH = path.join(path.dirname(__filename), '../../../');
const TRANSLATION_DIR = path.join(path.dirname(__filename), '../');

// Glob to match all js files except test files
const FILES_TO_PARSE = '{packages-application,packages-shared}/**/!(*.spec).js';
const locales = ['en', 'de'];

const newLine = () => process.stdout.write('\n');

const task = message => {
  process.stdout.write(message);

  return error => {
    if (error) {
      process.stderr.write(error);
    }
    return newLine();
  };
};

// Wrap async functions below into a promise
const glob = pattern =>
  new Promise((resolve, reject) => {
    nodeGlob(
      pattern,
      (error, value) => (error ? reject(error) : resolve(value))
    );
  });

const readFile = fileName =>
  new Promise((resolve, reject) => {
    fs.readFile(
      fileName,
      (error, value) => (error ? reject(error) : resolve(value))
    );
  });

const writeFile = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      fileName,
      data,
      (error, value) => (error ? reject(error) : resolve(value))
    );
  });

// Store existing translations into memory
const coreMessages = {};
const oldLocaleMappings = [];
const localeMappings = [];
// Loop to run once per locale
locales.forEach(locale => {
  oldLocaleMappings[locale] = {};
  localeMappings[locale] = {};
  // File to store translation messages into
  const translationFileName = `${TRANSLATION_DIR}/${locale}.json`;
  try {
    // Parse the old translation message JSON files
    const messages = JSON.parse(fs.readFileSync(translationFileName));
    const messageKeys = Object.keys(messages);
    messageKeys.forEach(messageKey => {
      oldLocaleMappings[locale][messageKey] = messages[messageKey];
    });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(
        `There was an error loading this translation file: ${translationFileName}
        \n${error}`
      );
    }
  }
});

/* push `react-intl` plugin to the existing plugins that are already configured in `package.json`
   Example:
   ```
  "babel": {
    "plugins": [
      ["transform-object-rest-spread", { "useBuiltIns": true }]
    ],
    "presets": [
      "latest",
      "react"
    ]
  }
  ```
*/
plugins.push(['react-intl']);

const sortMessages = localeMessages => {
  // Sort the translation JSON file so that git diffing is easier
  // Otherwise the translation messages will jump around every time we extract
  const sortedMessages = {};
  Object.keys(localeMessages)
    // transform strings to lowercase to imitate phraseapp sorting
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach(key => {
      sortedMessages[key] = localeMessages[key];
    });
  return sortedMessages;
};

const extractFromFile = async fileName => {
  try {
    const code = await readFile(path.join(ROOT_PROJECT_PATH, fileName));
    // Use babel plugin to extract instances where react-intl is used
    const { metadata: result } = await transform(code, { presets, plugins });
    result['react-intl'].messages.forEach(message => {
      // Extract core messages
      coreMessages[message.id] = message.defaultMessage;
      // Extract and map messages for each locale
      locales.forEach(locale => {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        const newMsg = locale === DEFAULT_LOCALE ? message.defaultMessage : '';
        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      });
    });
  } catch (error) {
    process.stderr.write(`Error transforming file: ${fileName}\n${error}`);
  }
};

(async function main() {
  // Make the directory if it doesn't exist, especially for first run
  // eslint-disable-next-line no-undef
  mkdir('-p', TRANSLATION_DIR);

  const memoryTaskDone = task('Storing language files in memory');
  const files = (await glob(FILES_TO_PARSE)).filter(
    file => !file.match(/node_modules/) && !file.match(/dist/) // exclude node_modules on non-root-level (due to monorepo-setup)
  );
  memoryTaskDone();

  const extractTaskDone = task('Run extraction on all files');
  // Run extraction on all files that match the glob
  await Promise.all(files.map(fileName => extractFromFile(fileName)));
  extractTaskDone();

  const coreTranslationFileName = `${TRANSLATION_DIR}/core.json`;
  let localeTaskDone = task(
    `Writing core translation messages to: ${coreTranslationFileName}`
  );
  try {
    const messages = sortMessages(coreMessages);

    // Write to file the JSON representation of the translation messages
    const prettified = `${JSON.stringify(messages, null, 2)}`;

    await writeFile(coreTranslationFileName, prettified);

    localeTaskDone();
  } catch (error) {
    localeTaskDone(
      `There was an error saving this translation file: ${coreTranslationFileName}
      \n${error}`
    );
  }

  // We usually do not build the translation-files because they are handled by transifex
  // and only pulled in when running `yarn run i18n:pull`
  // if for some reason you need to build the translation-files by hand run
  // 'yarn run i18n:pull --build-translations'
  const args = process.argv.slice(2);
  if (args.includes('--build-translations')) {
    locales.forEach(async locale => {
      const translationFileName = `${TRANSLATION_DIR}/${locale}.json`;

      localeTaskDone = task(
        `Writing translation messages for ${locale} to: ${translationFileName}`
      );
      try {
        const messages = sortMessages(localeMappings[locale]);

        // Write to file the JSON representation of the translation messages
        const prettified = `${JSON.stringify(messages, null, 2)}`;

        await writeFile(translationFileName, prettified);

        localeTaskDone();
      } catch (error) {
        localeTaskDone(
          `There was an error saving this translation file: ${translationFileName}
        \n${error}`
        );
      }
    });
  }

  process.exit();
})();
