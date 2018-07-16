/* eslint-disable */

/* This file generates the .mod.css file for the MC's base Colors
   Any decisions regarding colors should be made here */


const fs = require('fs');
const path = require('path');
const css = require('css');
const lodash = require('lodash');

const file = fs.readFileSync(
  path.join(
    __dirname,
    '../../../',
    'packages-shared/ui-kit/materials/colors/decisions/colors.json'
  ),
  'utf-8'
);

const colors = [JSON.parse(file)];

const declarationsBody = colors.reduce((acc, curr) => {
  //   Transforms the colors object into basic colors
  Object.entries(curr.baseColors).forEach(([colorName, variations]) => {
    Object.entries(variations).forEach(
      ([variationNumber, lightnessPercentage]) => {
        const cssVariableBaseName = '--color-' + colorName;

        if (variationNumber === 'default') {
          // First define the base colors
          acc.push({
            type: 'declaration',
            property: cssVariableBaseName,
            value: variations.default,
          });

          // Adds a comment to categorize base colors in groups
          acc.push({
            type: 'comment',
            comment: ' ' + lodash.startCase(colorName + 's') + ' ',
          });
        } else {
          // Writes the variations of color section below
          acc.push({
            type: 'declaration',
            property: cssVariableBaseName + '-' + variationNumber,
            value:
              'color(var(' +
              cssVariableBaseName +
              ') lightness(' +
              lightnessPercentage +
              '))',
          });
        }
      }
    );
  });
  // Reverse to have comments before properties declarations
  return acc.reverse();
}, []);

const commentDoNotModify = {
  type: 'comment',
  comment:
    ' Note: Do not modify this file. This is an automatic generated file' +
    ' from `merchant-center-frontend/mc-scripts/token/generate-color-variables` which creates ' +
    'our colors based on a JSON file.' +
    'Also, This file is transformed to JSON version in order to list the colors in' +
    'the UIKit. It is thus essential that no all colors are listed under the `:root`' +
    'selector. Color groups are indicated by a comment preceeding the group of' +
    ' colors. ',
};

const commentDisableEsLint = {
  type: 'comment',
  comment: ' stylelint-disable ',
};

const commentTitle = {
  type: 'comment',
  comment: ' Colors ',
  position: {
    start: {
      line: 10,
    },
  },
};
const AST = {
  type: 'stylesheet',
  stylesheet: {
    rules: [
      commentDisableEsLint,
      commentDoNotModify,
      {
        type: 'rule',
        selectors: [':root'],
        declarations: [commentTitle, ...declarationsBody],
      },
    ],
    parsingErrors: [],
  },
};

fs.writeFileSync(
  path.join(
    __dirname,
    '../../../',
    'packages-shared/ui-kit/materials/colors/colors.mod.css'
  ),
  css.stringify(AST),
  'utf-8'
);
