import chalk from 'chalk';
import type { CustomApplicationData } from '@commercetools-frontend/application-config';

// Since not all terminal supports colors, to make things more consistent for testing purposes,
// during tests the color used is appended before the string instead of coloring it.
const isTest = process.env.NODE_ENV === 'test';
const red = (str: string) => {
  if (isTest) return `<color-red>${str}</color-red>`;
  return chalk.red(str);
};
const green = (str: string) => {
  if (isTest) return `<color-green>${str}</color-green>`;
  return chalk.green(str);
};

// Two spaces are used for indentation.
const indent = (indentLevel: number) => '  '.repeat(indentLevel);

type TGetStringDiffParams = {
  previousValue?: string;
  nextValue?: string;
  label: string;
  indentLevel?: number;
};

const getStringDiff = ({
  previousValue,
  nextValue,
  label,
  indentLevel = 0,
}: TGetStringDiffParams) => {
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

type TGetArrayDiffParams = {
  previousValue: string[];
  nextValue: string[];
  label: string;
  indentLevel?: number;
};
// NOTE: this assumes that the array values are scalar values (not objects).
const getArrayDiff = ({
  previousValue,
  nextValue,
  label,
  indentLevel = 0,
}: TGetArrayDiffParams) => {
  const oldArraySet = new Set(previousValue);
  const arrayDiff: (string | null)[] = [];

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

type TPermissions = CustomApplicationData['permissions'];
type TGetPermissionsDiffParams = {
  previousValue: TPermissions;
  nextValue: TPermissions;
};
const getPermissionsDiff = ({
  previousValue,
  nextValue,
}: TGetPermissionsDiffParams) => {
  const permissionDiff = ['permissions changed'];

  const mappedOldPermissions = previousValue.reduce<Record<string, string[]>>(
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
  return null;
};

type TLabelAllLocales =
  CustomApplicationData['mainMenuLink']['labelAllLocales'];

type TGetLabelAllLocalesDiffParams = {
  previousValue: TLabelAllLocales;
  nextValue: TLabelAllLocales;
  indentLevel: number;
};

const getLabelAllLocalesDiff = ({
  previousValue = [],
  nextValue = [],
  indentLevel = 0,
}: TGetLabelAllLocalesDiffParams) => {
  const labelAllLocalesDiff: string[] = [
    `${indent(indentLevel - 1)}labelAllLocales changed`,
  ];

  const mappedOldLabelAllLocales = previousValue.reduce<Record<string, string>>(
    (previousLabelAllLocale, { locale, value }) => ({
      ...previousLabelAllLocale,
      [locale]: value,
    }),
    {}
  );

  nextValue.forEach((newLabelAllLocale) => {
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
      const localeDiff = getStringDiff({
        nextValue: newLabelAllLocale.locale,
        label: 'locale',
        indentLevel,
      });
      if (localeDiff) {
        labelAllLocalesDiff.push(localeDiff);
      }
    }
  });

  Object.keys(mappedOldLabelAllLocales).forEach((key) => {
    const localeDiff = getStringDiff({
      previousValue: key,
      label: 'locale',
      indentLevel,
    });
    if (localeDiff) {
      labelAllLocalesDiff.push(localeDiff);
    }
  });

  if (labelAllLocalesDiff.length > 1) return labelAllLocalesDiff.join('\n');
  return null;
};

type TMainMenuLink = CustomApplicationData['mainMenuLink'];
type TGetMainMenuLinkDiffParams = {
  previousValue: TMainMenuLink;
  nextValue: TMainMenuLink;
};

const getMainMenuLinkDiff = ({
  previousValue,
  nextValue,
}: TGetMainMenuLinkDiffParams) => {
  const mainMenuLinkDiff: string[] = ['mainMenuLink changed'];

  const menuDiff = getStringDiff({
    previousValue: previousValue.defaultLabel,
    nextValue: nextValue.defaultLabel,
    label: 'defaultLabel',
    indentLevel: 1,
  });
  if (menuDiff) {
    mainMenuLinkDiff.push(menuDiff);
  }

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

  const menuLabelsDiff = getLabelAllLocalesDiff({
    previousValue: previousValue.labelAllLocales,
    nextValue: nextValue.labelAllLocales,
    indentLevel: 2,
  });
  if (menuLabelsDiff) {
    mainMenuLinkDiff.push(menuLabelsDiff);
  }

  const filteredMainMenuLinkDiff = mainMenuLinkDiff.filter(Boolean);
  if (filteredMainMenuLinkDiff.length > 1)
    return filteredMainMenuLinkDiff.join('\n');
  return null;
};

type TSubmenuLinks = {
  uriPath: string;
  defaultLabel: string;
  labelAllLocales: TLabelAllLocales;
  permissions: string[];
};

type TGetSubmenuLinksDiffParams = {
  previousValue: TSubmenuLinks[];
  nextValue: TSubmenuLinks[];
};
const getSubmenuLinksDiff = ({
  previousValue,
  nextValue,
}: TGetSubmenuLinksDiffParams) => {
  const submenuLinksDiff: string[] = ['submenuLink changed'];

  const mappedSubmenuLinks = previousValue.reduce<
    Record<string, TSubmenuLinks>
  >(
    (previousSubmenuLink, currentSubmenuLink) => ({
      ...previousSubmenuLink,
      [currentSubmenuLink.uriPath]: currentSubmenuLink,
    }),
    {}
  );

  nextValue.forEach((newSubmenuLink) => {
    const oldSubMenuLink = mappedSubmenuLinks[newSubmenuLink.uriPath];
    if (newSubmenuLink.uriPath in mappedSubmenuLinks) {
      const submenuLinkDiff: string[] = [
        `${indent(1)}menu link "${newSubmenuLink.uriPath}" changed`,
      ];
      Object.keys(mappedSubmenuLinks[newSubmenuLink.uriPath]).forEach((key) => {
        switch (key) {
          case 'defaultLabel': {
            const labelDiff = getStringDiff({
              previousValue: oldSubMenuLink.defaultLabel,
              nextValue: newSubmenuLink.defaultLabel,
              label: 'defaultLabel',
              indentLevel: 2,
            });
            if (labelDiff) {
              submenuLinkDiff.push(labelDiff);
            }
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
            const labelsDiff = getLabelAllLocalesDiff({
              previousValue: oldSubMenuLink.labelAllLocales,
              nextValue: newSubmenuLink.labelAllLocales,
              indentLevel: 3,
            });
            if (labelsDiff) {
              submenuLinkDiff.push(labelsDiff);
            }
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
      const linksDiff = getStringDiff({
        nextValue: newSubmenuLink.uriPath,
        label: 'menu link',
        indentLevel: 1,
      });
      if (linksDiff) {
        submenuLinksDiff.push(linksDiff);
      }
    }
  });

  Object.keys(mappedSubmenuLinks).forEach((key) => {
    const linksDiff = getStringDiff({
      previousValue: key,
      label: 'menu link',
      indentLevel: 1,
    });
    if (linksDiff) submenuLinksDiff.push(linksDiff);
  });
  if (submenuLinksDiff.length > 1) return submenuLinksDiff.join('\n');
  return null;
};

// Compute diff changes of the Custom Application config.
// NOTE: Only known keys are evaluated.
const getConfigDiff = (
  oldConfig: CustomApplicationData,
  newConfig: CustomApplicationData
) => {
  const diff: string[] = [];

  // Name
  const nameDiff = getStringDiff({
    previousValue: oldConfig.name,
    nextValue: newConfig.name,
    label: 'name',
  });
  if (nameDiff) {
    diff.push(nameDiff);
  }

  // Description
  const descriptionDiff = getStringDiff({
    previousValue: oldConfig.description,
    nextValue: newConfig.description,
    label: 'description',
  });
  if (descriptionDiff) {
    diff.push(descriptionDiff);
  }

  // URL
  const urlDiff = getStringDiff({
    previousValue: oldConfig.url,
    nextValue: newConfig.url,
    label: 'url',
  });
  if (urlDiff) {
    diff.push(urlDiff);
  }

  // Icon
  const iconDiff = getStringDiff({
    previousValue: oldConfig.icon,
    nextValue: newConfig.icon,
    label: 'icon',
  });
  if (iconDiff) {
    diff.push(iconDiff);
  }

  // Permissions
  const permissionsDiff = getPermissionsDiff({
    previousValue: oldConfig.permissions,
    nextValue: newConfig.permissions,
  });
  if (permissionsDiff) {
    diff.push(permissionsDiff);
  }

  // Main menu link
  const mainMenuDiff = getMainMenuLinkDiff({
    previousValue: oldConfig.mainMenuLink,
    nextValue: newConfig.mainMenuLink,
  });
  if (mainMenuDiff) {
    diff.push(mainMenuDiff);
  }

  // Submenu links
  const submenuDiff = getSubmenuLinksDiff({
    previousValue: oldConfig.submenuLinks,
    nextValue: newConfig.submenuLinks,
  });
  if (submenuDiff) {
    diff.push(submenuDiff);
  }

  return diff.join('\n');
};

export default getConfigDiff;
