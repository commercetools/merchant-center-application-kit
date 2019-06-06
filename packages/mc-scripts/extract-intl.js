/* eslint-disable no-console */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

require('shelljs/global');
const fs = require('fs');
const path = require('path');
const mri = require('mri');
const nodeGlob = require('glob');
const { transformAsync } = require('@babel/core');
const getBabelPresetForMcApp = require('@commercetools-frontend/babel-preset-mc-app');

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN'];
const flags = mri(process.argv.slice(2), {
  alias: { help: ['h'] },
  default: {
    locale: 'en',
    locales: supportedLocales,
    'build-translations': false,
  },
});
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
  Usage: mc-scripts extract-inl [options] <glob-pattern>..

  Options:
  --output-path                       The location where to put the extracted messages
  --locale=<locale>                   (optional) The default locale to use [default "en"]
  --locales=<locale1,locale2,...>     (optional) The supported locales to map to [default ${supportedLocales.toString()}]
  --build-translations                (optional) In case you want to manually build the locale files with the translations [default "false"]
  --overwrite-core                    (optional) By default, if a core.json file exists, existing keys won't be overwritten. This is to ensure that messages in core.json can be updated from external sources. In case you want to avoid this check, you can force writing the extracted messages to core.json [default "false"]
  `);
  process.exit(0);
}

if (!flags['output-path']) {
  throw new Error('Missing required option "--output-path"');
}

const babelConfig = getBabelPresetForMcApp();
const { presets, plugins } = babelConfig;

// Resolve the absolute path of the caller location. This is necessary
// to point to files within that folder.
const rootPath = process.cwd();
const defaultLocale = flags.locale;
const locales = flags.locales;
const outputPath = flags['output-path'];
const shouldBuildTranslations = flags['build-translations'];
const shouldOverwriteWritingToCore = flags['overwrite-core'];
const globFilesToParse = commands[0];

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
    nodeGlob(pattern, (error, value) =>
      error ? reject(error) : resolve(value)
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
  const translationFileName = `${outputPath}/${locale}.json`;
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

// eslint-disable-next-line global-require
plugins.push([require('babel-plugin-react-intl').default]);

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
    const src = fs.readFileSync(path.join(rootPath, fileName), {
      encoding: 'utf8',
    });
    // Use babel plugin to extract instances where react-intl is used
    const { metadata: result } = await transformAsync(src, {
      babelrc: false,
      presets,
      plugins,
      filename: fileName,
    });
    result['react-intl'].messages.forEach(message => {
      // Extract core messages
      coreMessages[message.id] = message.defaultMessage;
      // Extract and map messages for each locale
      locales.forEach(locale => {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id];
        // Merge old translations into the babel extracted instances where react-intl is used
        const newMsg = locale === defaultLocale ? message.defaultMessage : '';
        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      });
    });
  } catch (error) {
    process.stderr.write(
      `Error transforming file: ${fileName}\n${error.stack}\n\n`
    );
  }
};

(async function main() {
  // Make the directory if it doesn't exist, especially for first run
  // eslint-disable-next-line no-undef
  mkdir('-p', outputPath);

  const memoryTaskDone = task('Storing language files in memory');
  const files = (await glob(globFilesToParse)).filter(
    // exclude node_modules on non-root-level (due to monorepo-setup)
    file => !file.match(/node_modules/) && !file.match(/dist/)
  );
  memoryTaskDone();

  const extractTaskDone = task('Run extraction on all files');
  // Run extraction on all files that match the glob
  await Promise.all(files.map(fileName => extractFromFile(fileName)));
  extractTaskDone();

  const coreTranslationFileName = `${outputPath}/core.json`;
  let localeTaskDone = task(
    `Writing core translation messages to: ${coreTranslationFileName}`
  );
  try {
    const sortedCoreMessages = sortMessages(coreMessages);

    // If a message already exists in the core.json file, we do not overwrite it.
    // This is to ensure that core.json messages can be updated from external sources.
    let safelyMergedMessages;
    if (
      !shouldOverwriteWritingToCore &&
      fs.existsSync(coreTranslationFileName)
    ) {
      const existingCoreMessages = JSON.parse(
        fs.readFileSync(coreTranslationFileName, { encoding: 'utf8' })
      );
      safelyMergedMessages = Object.keys(sortedCoreMessages).reduce(
        (updatedMessages, messageKey) =>
          // eslint-disable-next-line prefer-object-spread/prefer-object-spread
          Object.assign({}, updatedMessages, {
            [messageKey]:
            // If the message key already exists in the core.json file, we won't update it
              existingCoreMessages[messageKey] ||
              sortedCoreMessages[messageKey],
          }),
        {}
      );
    }

    // Write to file the JSON representation of the translation messages
    const prettified = `${JSON.stringify(
      safelyMergedMessages || sortedCoreMessages,
      null,
      2
    )}\n`;

    fs.writeFileSync(coreTranslationFileName, prettified, { encoding: 'utf8' });

    localeTaskDone();
  } catch (error) {
    localeTaskDone(
      `There was an error saving this translation file: ${coreTranslationFileName}
      \n${error}`
    );
  }

  // We usually do not build the translation-files because they are
  // handled by transifex and sync by the transifex CLI.
  if (shouldBuildTranslations) {
    await Promise.all(
      locales.map(async locale => {
        const translationFileName = `${outputPath}/${locale}.json`;

        localeTaskDone = task(
          `Writing translation messages for ${locale} to: ${translationFileName}\n`
        );
        try {
          const messages = sortMessages(localeMappings[locale]);

          // Write to file the JSON representation of the translation messages
          const prettified = `${JSON.stringify(messages, null, 2)}`;

          fs.writeFileSync(translationFileName, prettified, {
            encoding: 'utf8',
          });

          localeTaskDone();
        } catch (error) {
          localeTaskDone(
            `There was an error saving this translation file: ${translationFileName}
        \n${error}`
          );
        }
      })
    );
  }

  process.exit();
})();
