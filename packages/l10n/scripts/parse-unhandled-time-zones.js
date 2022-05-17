const prompts = require('prompts');

const ANSWER_TYPES = {
  ADD: 'ADD',
  EXCLUDE: 'EXCLUDE',
  IGNORE: 'IGNORE',
};

const sortAnswers = (answers) =>
  Object.entries(answers).reduce(
    (sortedAnswers, [id, answer]) => {
      switch (answer) {
        case ANSWER_TYPES.ADD:
          sortedAnswers.timeZonesToTranslate.push(id);
          break;
        case ANSWER_TYPES.EXCLUDE:
          sortedAnswers.timeZonesToExclude.push(id);
          break;
        default:
        case ANSWER_TYPES.IGNORE:
          sortedAnswers.timeZonesToIgnore.push(id);
          break;
      }
      return sortedAnswers;
    },
    {
      timeZonesToTranslate: [],
      timeZonesToIgnore: [],
      timeZonesToExclude: [],
    }
  );
/** If there are IANA timezone identifiers returned by moment-timezone
 *  that are not in the translations or exclusions list,
 *  we must get user input as to whether those time zones should be:
 *  a) translated,
 *  b) excluded from being displayed/translated, or
 *  c) ignored until the next time this script is run.
 */
module.exports = async function parseUnhandledTimeZones(unhandledTimeZones) {
  const questions = unhandledTimeZones.map((timeZone) => ({
    type: 'select',
    name: timeZone,
    message: `Choose option for ${timeZone}: `,
    choices: [
      {
        title: 'Translate',
        description: `Add ${timeZone} to core.json for translation`,
        value: ANSWER_TYPES.ADD,
      },
      {
        title: 'Exclude',
        description: `Add ${timeZone} to excluded-time-zones.js so it will not be translated`,
        value: ANSWER_TYPES.EXCLUDE,
      },
      {
        title: 'Ignore',
        description: `Do nothing for ${timeZone}`,
        value: ANSWER_TYPES.IGNORE,
      },
    ],
  }));

  const answers = await prompts(questions);
  return sortAnswers(answers);
};
