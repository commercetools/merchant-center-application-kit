const prompts = require('prompts');

const SELECT_OPTIONS = {
  TRANSLATE: 'TRANSLATE',
  EXCLUDE: 'EXCLUDE',
  IGNORE: 'IGNORE',
};

const NAMES = {
  SELECT_OPTION: 'SELECT_OPTION',
  TRANSLATION: 'TRANSLATION',
  CORRELATED_TIMEZONE: 'CORRELATED_TIMEZONE',
};

const MESSAGES = {
  SELECT_OPTION: (timeZone) => `Choose option for ${timeZone}:`,
  TRANSLATION: (timeZone) => `Enter UX approved translation for ${timeZone}:`,
  CORRELATED_TIMEZONE: (timeZone) =>
    `Enter currently translated time zone whose translation can be displayed for ${timeZone}:`,
};

const DESCRIPTIONS = {
  SELECT_TRANSLATE: (timeZone) =>
    `Add ${timeZone} to core.json for translation - you must enter a translation string approved by UX`,
  SELECT_EXCLUDE: (timeZone) =>
    `Add ${timeZone} to excluded-time-zones.js so it will not be translated`,
  SELECT_IGNORE: (timeZone) => `Do nothing for ${timeZone}`,
};

function generatePromptsForTimeZone(timeZone, translationsMap) {
  return [
    {
      type: 'select',
      name: NAMES.SELECT_OPTION,
      message: MESSAGES.SELECT_OPTION(timeZone),
      choices: [
        {
          title: 'Translate',
          description: DESCRIPTIONS.SELECT_TRANSLATE(timeZone),
          value: SELECT_OPTIONS.TRANSLATE,
        },
        {
          title: 'Exclude',
          description: DESCRIPTIONS.SELECT_EXCLUDE(timeZone),
          value: SELECT_OPTIONS.EXCLUDE,
        },
        {
          title: 'Ignore',
          description: DESCRIPTIONS.SELECT_IGNORE(timeZone),
          value: SELECT_OPTIONS.IGNORE,
        },
      ],
    },
    {
      type: (prev) => (prev === SELECT_OPTIONS.TRANSLATE ? 'text' : null),
      name: NAMES.TRANSLATION,
      message: MESSAGES.TRANSLATION(timeZone),
      validate: (input) =>
        input && input.length
          ? true
          : `You must enter a translation for ${timeZone}`,
    },
    {
      type: (prev) => (prev === SELECT_OPTIONS.EXCLUDE ? 'text' : null),
      name: NAMES.CORRELATED_TIMEZONE,
      message: MESSAGES.CORRELATED_TIMEZONE(timeZone),
      validate: (input) => {
        if (input && input.length) {
          if (!translationsMap[input]) {
            return `You must enter a valid IANA identifier for a currently translated time zone`;
          } else if (translationsMap[input]) {
            return true;
          }
        } else {
          return `You must correlate ${timeZone} to a translated time zone to exclude it`;
        }
      },
    },
  ];
}

const sortAnswersForTimeZone = (answers, timeZone, translationsMap) => {
  switch (answers[NAMES.SELECT_OPTION]) {
    case SELECT_OPTIONS.TRANSLATE:
      // add tz to translations map so tz's excluded in subsequent prompts can be mapped to this tz
      translationsMap[timeZone] = [];
      return {
        [timeZone]: {
          [NAMES.SELECT_OPTION]: SELECT_OPTIONS.TRANSLATE,
          [NAMES.TRANSLATION]: answers[NAMES.TRANSLATION],
        },
      };

    case SELECT_OPTIONS.EXCLUDE:
      // add tz to correlated tz's array in translation map
      translationsMap[answers[NAMES.CORRELATED_TIMEZONE]].push(timeZone);
      return {
        [timeZone]: {
          [NAMES.SELECT_OPTION]: SELECT_OPTIONS.EXCLUDE,
          [NAMES.CORRELATED_TIMEZONE]: answers[NAMES.CORRELATED_TIMEZONE],
        },
      };
    case SELECT_OPTIONS.IGNORE:
      return {
        [timeZone]: {
          [NAMES.SELECT_OPTION]: SELECT_OPTIONS.IGNORE,
        },
      };
    default:
      return;
  }
};

async function getAnswersForTimeZone(timeZone, translationsMap) {
  const answers = await prompts(
    generatePromptsForTimeZone(timeZone, translationsMap)
  );
  return sortAnswersForTimeZone(answers, timeZone, translationsMap);
}

const sortAllTimeZoneAnswers = (answers) =>
  Object.entries(answers).reduce(
    (sortedAnswers, [timeZone, answer]) => {
      switch (answer[NAMES.SELECT_OPTION]) {
        case SELECT_OPTIONS.TRANSLATE:
          return {
            ...sortedAnswers,
            [SELECT_OPTIONS.TRANSLATE]: {
              ...sortedAnswers[SELECT_OPTIONS.TRANSLATE],
              [timeZone]: answer[NAMES.TRANSLATION],
            },
          };
        case SELECT_OPTIONS.EXCLUDE:
          return {
            ...sortedAnswers,
            [SELECT_OPTIONS.EXCLUDE]: [
              ...sortedAnswers[SELECT_OPTIONS.EXCLUDE],
              timeZone,
            ],
          };

        case SELECT_OPTIONS.IGNORE:
          return {
            ...sortedAnswers,
            [SELECT_OPTIONS.IGNORE]: [
              ...sortedAnswers[SELECT_OPTIONS.IGNORE],
              timeZone,
            ],
          };
        default:
          return sortedAnswers;
      }
    },
    {
      [SELECT_OPTIONS.TRANSLATE]: {},
      [SELECT_OPTIONS.EXCLUDE]: [],
      [SELECT_OPTIONS.IGNORE]: [],
    }
  );

/** If there are IANA timezone identifiers returned by moment-timezone
 *  that are not in the translations or exclusions list,
 *  we must get user input as to whether those time zones should be:
 *  a) translated,
 *  b) excluded from being displayed/translated, or
 *  c) ignored until the next time this script is run.
 */
module.exports = async function parseUnhandledTimeZones(
  unhandledTimeZones,
  translationsMap
) {
  let answers = {};
  for (let i = 0; i < unhandledTimeZones.length; i++) {
    let answer = await getAnswersForTimeZone(
      unhandledTimeZones[i],
      translationsMap
    );
    answers = { ...answers, ...answer };
  }
  return sortAllTimeZoneAnswers(answers);
};
