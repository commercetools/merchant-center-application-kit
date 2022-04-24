const { red, green } = require('chalk');

const notNestedKeySet = new Set(['name', 'description', 'url', 'icon']);

const t = (indentLevel) => '  '.repeat(indentLevel);

const getStringDiff = (oldStr, newStr, label, indentLevel = 0) => {
  if (!oldStr && newStr) {
    return `${t(indentLevel)}${label} added: ${green(newStr)}`;
  } else if (oldStr && !newStr) {
    return `${t(indentLevel)}${label} removed: ${red(oldStr)}`;
  } else if (oldStr && newStr && oldStr !== newStr) {
    return `${t(indentLevel)}${label} changed: ${red(oldStr)} => ${green(
      newStr
    )}`;
  }
};

const getArrayDiff = (oldArray, newArray, indentLevel = 0) => {
  const oldArraySet = new Set(oldArray);
  const arrayDiff = [];

  newArray?.forEach((item) => {
    if (oldArraySet.has(item)) {
      oldArraySet.delete(item);
    } else {
      arrayDiff.push(`${t(indentLevel)}Item with "${green(item)}" added`);
    }
  });
  oldArraySet.forEach((item) => {
    arrayDiff.push(`${t(indentLevel)}Item with "${red(item)}" removed`);
  });

  return arrayDiff.join('\n');
};

const getPermissionsDiff = (oldPermissions, newPermissions) => {
  const permissionDiff = ['permissions changed'];
  const mappedOldPermission = {};

  oldPermissions.forEach(({ name, oAuthScopes }) => {
    mappedOldPermission[name] = oAuthScopes;
  });

  newPermissions.forEach((newPermission) => {
    const currDiff = [`${t(1)}${newPermission.name} changed`];
    // if the permission name is not in the old config, it means it is a new addition.
    if (!mappedOldPermission[newPermission.name]) {
      permissionDiff.push(`${t(1)}"${green(newPermission.name)}" was added`);
    }

    // if permission name is in the old config, now we check if there was a change
    else {
      currDiff.push(
        getArrayDiff(
          mappedOldPermission[newPermission.name],
          newPermission.oAuthScopes,
          2
        )
      );
      delete mappedOldPermission[newPermission.name];
    }

    currDiff.filter(Boolean).length > 1 &&
      permissionDiff.push(currDiff.join('\n'));
  });

  // if there are old permissions left, it means they were deleted in the new Permissions.
  Object.keys(mappedOldPermission).forEach((oldPermissionName) => {
    permissionDiff.push(`${t(1)}"${red(oldPermissionName)}" was removed`);
  });

  if (permissionDiff.length > 1) return permissionDiff.join('\n');
};

const getLabelAllLocalesDiff = (
  oldLabelAllLocales,
  newLabelAllLocales,
  indentLevel = 0
) => {
  const mappedOldLabelAllLocales = {};
  const labelAllLocalesDiff = [`${t(indentLevel - 1)}labelAllLocales changed`];

  oldLabelAllLocales?.forEach(({ locale, value }) => {
    mappedOldLabelAllLocales[locale] = value;
  });

  newLabelAllLocales?.forEach((newLabelAllLocale) => {
    if (newLabelAllLocale.locale in mappedOldLabelAllLocales) {
      const oldLocaleValue = mappedOldLabelAllLocales[newLabelAllLocale.locale];
      if (oldLocaleValue !== newLabelAllLocale.value) {
        labelAllLocalesDiff.push(
          `${t(indentLevel)}locale with "${
            newLabelAllLocale.locale
          }" was changed: ${red(oldLocaleValue)} => ${green(
            newLabelAllLocale.value
          )}`
        );
      }
      delete mappedOldLabelAllLocales[newLabelAllLocale.locale];
    } else {
      labelAllLocalesDiff.push(
        `${t(indentLevel)}locale with "${green(
          newLabelAllLocale.locale
        )}" was added`
      );
    }
  });

  Object.keys(mappedOldLabelAllLocales).forEach((key) => {
    labelAllLocalesDiff.push(
      `${t(indentLevel)}locale with "${red(key)}" was removed`
    );
  });

  if (labelAllLocalesDiff.length > 1) return labelAllLocalesDiff.join('\n');
};

const getMainMenuLinkDiff = (oldMainMenuLink, newMainMenuLink) => {
  const mainMenuLinkDiff = ['mainMenuLink changed'];

  mainMenuLinkDiff.push(
    getStringDiff(
      oldMainMenuLink['defaultLabel'],
      newMainMenuLink['defaultLabel'],
      'defaultLabel',
      1
    )
  );
  const mainMenuLinkPermissionsDiff = getArrayDiff(
    oldMainMenuLink['permissions'],
    newMainMenuLink['permissions'],
    2
  );
  if (mainMenuLinkPermissionsDiff.length > 0) {
    mainMenuLinkDiff.push(`${t(1)}permission changed`);
    mainMenuLinkDiff.push(mainMenuLinkPermissionsDiff);
  }

  mainMenuLinkDiff.push(
    getLabelAllLocalesDiff(
      oldMainMenuLink['labelAllLocales'],
      newMainMenuLink['labelAllLocales'],
      2
    )
  );

  const filteredMainMenuLinkDiff = mainMenuLinkDiff.filter(Boolean);
  if (filteredMainMenuLinkDiff.length > 1)
    return filteredMainMenuLinkDiff.join('\n');
};

const getSubmenuLinksDiff = (oldSubmenuLinks, newSubmenuLinks) => {
  const submenuLinksDiff = ['submenuLink changed'];
  const mappedSubmenuLinks = {};
  oldSubmenuLinks.forEach((oldSubmenuLink) => {
    mappedSubmenuLinks[oldSubmenuLink.uriPath] = oldSubmenuLink;
  });

  newSubmenuLinks.forEach((newSubmenuLink) => {
    const oldSubMenuLink = mappedSubmenuLinks[newSubmenuLink.uriPath];
    if (newSubmenuLink.uriPath in mappedSubmenuLinks) {
      const submenuLinkDiff = [
        `${t(1)}Item with "${newSubmenuLink.uriPath}" was changed`,
      ];
      Object.keys(mappedSubmenuLinks[newSubmenuLink.uriPath]).forEach((key) => {
        if (key === 'defaultLabel') {
          submenuLinkDiff.push(
            getStringDiff(
              oldSubMenuLink.defaultLabel,
              newSubmenuLink.defaultLabel,
              'defaultLabel',
              2
            )
          );
        } else if (key === 'permissions') {
          const submenuLinkPermissionsDiff = getArrayDiff(
            oldSubMenuLink.permissions,
            newSubmenuLink.permissions,
            3
          );
          if (submenuLinkPermissionsDiff.length > 0) {
            submenuLinkDiff.push(`${t(2)}permission changed`);
            submenuLinkDiff.push(submenuLinkPermissionsDiff);
          }
        } else if (key === 'labelAllLocales') {
          submenuLinkDiff.push(
            getLabelAllLocalesDiff(
              oldSubMenuLink['labelAllLocales'],
              newSubmenuLink['labelAllLocales'],
              3
            )
          );
        }
      });
      delete mappedSubmenuLinks[newSubmenuLink.uriPath];
      if (submenuLinkDiff.filter(Boolean).length > 1) {
        submenuLinksDiff.push(submenuLinkDiff.join('\n'));
      }
    } else {
      submenuLinksDiff.push(
        `${t(1)}Item with "${green(newSubmenuLink.uriPath)}" was added`
      );
    }
  });

  Object.keys(mappedSubmenuLinks).forEach((key) => {
    submenuLinksDiff.push(`${t(1)}Item with "${red(key)}" was removed`);
  });

  if (submenuLinksDiff.length > 1) return submenuLinksDiff.join('\n');
};

const getConfigDiff = (oldConfig, newConfig) => {
  const diff = [];

  Object.keys(oldConfig).forEach((key) => {
    if (notNestedKeySet.has(key)) {
      diff.push(getStringDiff(oldConfig[key], newConfig[key], key));
    }

    switch (key) {
      case 'permissions':
        diff.push(
          getPermissionsDiff(oldConfig['permissions'], newConfig['permissions'])
        );
        break;
      case 'mainMenuLink':
        diff.push(
          getMainMenuLinkDiff(
            oldConfig['mainMenuLink'],
            newConfig['mainMenuLink']
          )
        );
        break;
      case 'submenuLinks':
        diff.push(
          getSubmenuLinksDiff(
            oldConfig['submenuLinks'],
            newConfig['submenuLinks']
          )
        );
        break;
      default:
        break;
    }
  });

  return diff.filter(Boolean).join('\n');
};

module.exports = getConfigDiff;
