const readline = require('readline');
const chalk = require('chalk');

const AskQuestion = (rl, query) => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer));
  });
};

module.exports = async function parseNewTimeZones(timeZones) {
  return new Promise(async (resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let addToTranslations = [];
    let addToExclusions = [];
    let ignore = [];
    for (let i = 0; i < timeZones.length; i++) {
      const tz = timeZones[i];
      console.log(
        `[${chalk.cyan(tz)}]: ${chalk.underline('ADD')}, ${chalk.underline(
          'EXCLUDE'
        )}, or ${chalk.underline('IGNORE')} time zone ${chalk.cyan(tz)}`
      );
      const result = await AskQuestion(
        rl,
        `To ADD type [${chalk.underline(
          'A'
        )}],\nto EXCLUDE type [${chalk.underline(
          'E'
        )}],\nor press any other key to ignore > `
      );
      if (result.toUpperCase() === 'A') {
        addToTranslations.push(tz);
        console.log(
          `[${chalk.cyan(tz)}]: ${chalk.green('ADDED')} to core.json\n`
        );
      } else if (result.toUpperCase() === 'E') {
        addToExclusions.push(tz);
        console.log(
          `[${chalk.cyan(tz)}]: ${chalk.red(
            'EXCLUDED'
          )} in excluded-time-zones.js\n`
        );
      } else {
        console.log(
          `[${chalk.cyan(tz)}]: ${chalk.yellow(
            'IGNORED'
          )} - this time zone will be handled next time this script is run\n`
        );
        ignore.push(tz);
      }
    }
    rl.close();
    resolve({ addToTranslations, addToExclusions, ignore });
  });
};
