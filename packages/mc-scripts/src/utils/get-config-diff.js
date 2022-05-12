const chalk = require('chalk');

// Since not all terminal supports colors, to make things more consistent for testing purposes,
// during tests the color used is appended before the string instead of coloring it.
const isTest = process.env.NODE_ENV === 'test';
const red = (str) => {
  if (isTest) return `<color-red>${str}</color-red>`;
  return chalk.red(str);
};
const green = (str) => {
  if (isTest) return `<color-green>${str}</color-green>`;
  return chalk.green(str);
};

// Two spaces are used for indentation.
const indent = (indentLevel) => '  '.repeat(indentLevel);

const getStringDiff = ({
  previousValue,
  nextValue,
  label,
  indentLevel = 0,
}) => {
  if (!previousValue && nextValue) {
    return `${indent(indentLevel)}${label} added: ${green(nextValue)}`;
  }
  if (previousValue && !nextValue) {
    return `${indent(indentLevel)}${label} removed: ${red(previousValue)}`;
  }
  if (previousValue && nextValue && previousValue !== nextValue) {
    return `${indent(indentLevel)}${label} changed: ${red(
      previousValue
    )} => ${green(nextValue)}`;
  }
  return null;
};

// NOTE: this assumes that the array values are scalar values (not objects).
const getArrayDiff = ({ previousValue, nextValue, label, indentLevel = 0 }) => {
  const oldArraySet = new Set(previousValue);
  const arrayDiff = [];

  nextValue?.forEach((item) => {
    if (oldArraySet.has(item)) {
      oldArraySet.delete(item);
    } else {
      arrayDiff.push(getStringDiff({ nextValue: item, label, indentLevel }));
    }
  });
  oldArraySet.forEach((item) => {
    arrayDiff.push(getStringDiff({ previousValue: item, label, indentLevel }));
  });

  return arrayDiff.join('\n');
};

const getPermissionsDiff = ({ previousValue, nextValue }) => {
  const permissionDiff = ['permissions changed'];

  const mappedOldPermissions = previousValue.reduce(
    (previousPermission, { name, oAuthScopes }) => ({
      ...previousPermission,
      [name]: oAuthScopes,
    }),
    {}
  );

  const indentLevel = 1;

  nextValue.forEach((newPermission) => {
    const currentDiff = [
      `${indent(indentLevel)}"${newPermission.name}" changed`,
    ];
    // if the permission name is not in the old config, it means it is a new addition.
    if (!mappedOldPermissions[newPermission.name]) {
      permissionDiff.push(
        `${indent(indentLevel)}"${green(newPermission.name)}" was added`
      );
    }

    // if permission name is in the old config, now we check if there was a change
    else {
      currentDiff.push(
        getArrayDiff({
          previousValue: mappedOldPermissions[newPermission.name],
          nextValue: newPermission.oAuthScopes,
          label: 'oauth scope',
          indentLevel: 2,
        })
      );
      delete mappedOldPermissions[newPermission.name];
    }

    currentDiff.filter(Boolean).length > 1 &&
      permissionDiff.push(currentDiff.join('\n'));
  });

  // if there are old permissions left, it means they were deleted in the new Permissions.
  Object.keys(mappedOldPermissions).forEach((oldPermissionName) => {
    permissionDiff.push(
      `${indent(indentLevel)}"${red(oldPermissionName)}" was removed`
    );
  });

  if (permissionDiff.length > 1) return permissionDiff.join('\n');
};

const getLabelAllLocalesDiff = ({
  previousValue,
  nextValue,
  indentLevel = 0,
}) => {
  const labelAllLocalesDiff = [
    `${indent(indentLevel - 1)}labelAllLocales changed`,
  ];

  const mappedOldLabelAllLocales =
    previousValue?.reduce(
      (previousLabelAllLocale, { locale, value }) => ({
        ...previousLabelAllLocale,
        [locale]: value,
      }),
      {}
    ) ?? {};

  nextValue?.forEach((newLabelAllLocale) => {
    if (newLabelAllLocale.locale in mappedOldLabelAllLocales) {
      const oldLocaleValue = mappedOldLabelAllLocales[newLabelAllLocale.locale];
      if (oldLocaleValue !== newLabelAllLocale.value) {
        labelAllLocalesDiff.push(
          `${indent(indentLevel)}locale "${
            newLabelAllLocale.locale
          }" changed: ${red(oldLocaleValue)} => ${green(
            newLabelAllLocale.value
          )}`
        );
      }
      delete mappedOldLabelAllLocales[newLabelAllLocale.locale];
    } else {
      labelAllLocalesDiff.push(
        getStringDiff({
          nextValue: newLabelAllLocale.locale,
          label: 'locale',
          indentLevel,
        })
      );
    }
  });

  Object.keys(mappedOldLabelAllLocales).forEach((key) => {
    labelAllLocalesDiff.push(
      getStringDiff({
        previousValue: key,
        label: 'locale',
        indentLevel,
      })
    );
  });

  if (labelAllLocalesDiff.length > 1) return labelAllLocalesDiff.join('\n');
};

const getMainMenuLinkDiff = ({ previousValue, nextValue }) => {
  const mainMenuLinkDiff = ['mainMenuLink changed'];

  mainMenuLinkDiff.push(
    getStringDiff({
      previousValue: previousValue.defaultLabel,
      nextValue: nextValue.defaultLabel,
      label: 'defaultLabel',
      indentLevel: 1,
    })
  );
  const mainMenuLinkPermissionsDiff = getArrayDiff({
    previousValue: previousValue.permissions,
    nextValue: nextValue.permissions,
    label: 'applied permission',
    indentLevel: 2,
  });
  if (mainMenuLinkPermissionsDiff.length > 0) {
    mainMenuLinkDiff.push(`${indent(1)}permissions changed`);
    mainMenuLinkDiff.push(mainMenuLinkPermissionsDiff);
  }

  mainMenuLinkDiff.push(
    getLabelAllLocalesDiff({
      previousValue: previousValue.labelAllLocales,
      nextValue: nextValue.labelAllLocales,
      indentLevel: 2,
    })
  );

  const filteredMainMenuLinkDiff = mainMenuLinkDiff.filter(Boolean);
  if (filteredMainMenuLinkDiff.length > 1)
    return filteredMainMenuLinkDiff.join('\n');
};

const getSubmenuLinksDiff = ({ previousValue, nextValue }) => {
  const submenuLinksDiff = ['submenuLink changed'];

  const mappedSubmenuLinks = previousValue.reduce(
    (previousSubmenuLink, currentSubmenuLink) => ({
      ...previousSubmenuLink,
      [currentSubmenuLink.uriPath]: currentSubmenuLink,
    }),
    {}
  );

  nextValue.forEach((newSubmenuLink) => {
    const oldSubMenuLink = mappedSubmenuLinks[newSubmenuLink.uriPath];
    if (newSubmenuLink.uriPath in mappedSubmenuLinks) {
      const submenuLinkDiff = [
        `${indent(1)}menu link "${newSubmenuLink.uriPath}" changed`,
      ];
      Object.keys(mappedSubmenuLinks[newSubmenuLink.uriPath]).forEach((key) => {
        switch (key) {
          case 'defaultLabel': {
            submenuLinkDiff.push(
              getStringDiff({
                previousValue: oldSubMenuLink.defaultLabel,
                nextValue: newSubmenuLink.defaultLabel,
                label: 'defaultLabel',
                indentLevel: 2,
              })
            );
            break;
          }
          case 'permissions': {
            const submenuLinkPermissionsDiff = getArrayDiff({
              previousValue: oldSubMenuLink.permissions,
              nextValue: newSubmenuLink.permissions,
              label: 'applied permission',
              indentLevel: 3,
            });
            if (submenuLinkPermissionsDiff.length > 0) {
              submenuLinkDiff.push(`${indent(2)}permissions changed`);
              submenuLinkDiff.push(submenuLinkPermissionsDiff);
            }
            break;
          }
          case 'labelAllLocales': {
            submenuLinkDiff.push(
              getLabelAllLocalesDiff({
                previousValue: oldSubMenuLink.labelAllLocales,
                nextValue: newSubmenuLink.labelAllLocales,
                indentLevel: 3,
              })
            );
            break;
          }
          default:
            break;
        }
      });
      delete mappedSubmenuLinks[newSubmenuLink.uriPath];
      const filteredSubmenuLinksDiff = submenuLinkDiff.filter(Boolean);
      if (filteredSubmenuLinksDiff.length > 1) {
        submenuLinksDiff.push(filteredSubmenuLinksDiff.join('\n'));
      }
    } else {
      submenuLinksDiff.push(
        getStringDiff({
          nextValue: newSubmenuLink.uriPath,
          label: 'menu link',
          indentLevel: 1,
        })
      );
    }
  });

  Object.keys(mappedSubmenuLinks).forEach((key) => {
    submenuLinksDiff.push(
      getStringDiff({
        previousValue: key,
        label: 'menu link',
        indentLevel: 1,
      })
    );
  });
  if (submenuLinksDiff.length > 1) return submenuLinksDiff.join('\n');
};

// Compute diff changes of the Custom Application config.
// NOTE: Only known keys are evaluated.
const getConfigDiff = (oldConfig, newConfig) => {
  const diff = [];

  // Name
  diff.push(
    getStringDiff({
      previousValue: oldConfig.name,
      nextValue: newConfig.name,
      label: 'name',
    })
  );

  // Description
  diff.push(
    getStringDiff({
      previousValue: oldConfig.description,
      nextValue: newConfig.description,
      label: 'description',
    })
  );

  // URL
  diff.push(
    getStringDiff({
      previousValue: oldConfig.url,
      nextValue: newConfig.url,
      label: 'url',
    })
  );

  // Icon
  diff.push(
    getStringDiff({
      previousValue: oldConfig.icon,
      nextValue: newConfig.icon,
      label: 'icon',
    })
  );

  // Permissions
  diff.push(
    getPermissionsDiff({
      previousValue: oldConfig.permissions,
      nextValue: newConfig.permissions,
    })
  );

  // Main menu link
  diff.push(
    getMainMenuLinkDiff({
      previousValue: oldConfig.mainMenuLink,
      nextValue: newConfig.mainMenuLink,
    })
  );

  // Submenu links
  diff.push(
    getSubmenuLinksDiff({
      previousValue: oldConfig.submenuLinks,
      nextValue: newConfig.submenuLinks,
    })
  );

  return diff.filter(Boolean).join('\n');
};

module.exports = getConfigDiff;
