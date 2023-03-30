import type {
  API,
  Collection,
  FileInfo,
  JSCodeshift,
  VariableDeclarator,
} from 'jscodeshift';
// import type { TRunnerOptions } from '../types';

// Update props in components which use `themedValue` helper to always use new theme value
// Remove the prop in case the new theme value is undefined
// Some examples to process:
// <Spacings.Stack scale={themedValue('m', 'l')}>
//
// <Spacings.Stack scale={themedValue(designTokens.A, designTokensB)}>
//
// <div
//   css={css`
//     color: ${customProperties.colorSurface};
//     text-align: ${themedValue('left', 'center')};
//   `}
// >
function updateThemedValueUsages(tree: Collection, j: JSCodeshift) {
  tree
    .find(j.JSXAttribute, {
      value(attributeValue) {
        return (
          attributeValue?.type === 'JSXExpressionContainer' &&
          // Props using themedValue helper
          ((attributeValue?.expression.type === 'CallExpression' &&
            attributeValue?.expression.callee.type === 'Identifier' &&
            attributeValue?.expression.callee.name === 'themedValue') ||
            // Styles props using styles component css string template including usages of themedValue helper
            (attributeValue?.expression.type === 'TaggedTemplateExpression' &&
              attributeValue?.expression.quasi.expressions.some(
                (expression) =>
                  expression.type === 'CallExpression' &&
                  expression.callee.type === 'Identifier' &&
                  expression.callee.name === 'themedValue'
              )))
        );
      },
    })
    .replaceWith((attribute) => {
      const { node } = attribute;

      if (
        node.value?.type === 'JSXExpressionContainer' &&
        node.value?.expression.type === 'TaggedTemplateExpression'
      ) {
        // @ts-ignore
        node.value.expression.quasi.expressions =
          node.value.expression.quasi.expressions.map((expression) => {
            if (expression.type === 'CallExpression') {
              return expression.arguments[1];
            }

            return expression;
          });
      }

      if (
        node.value?.type === 'JSXExpressionContainer' &&
        node.value?.expression.type === 'CallExpression'
      ) {
        const secondArgument = node.value.expression.arguments[1];

        const secondArgumentValue =
          'value' in secondArgument
            ? secondArgument.value
            : 'name' in secondArgument
            ? secondArgument.name
            : undefined;

        // console.log({
        //   // @ts-ignore
        //   value: secondArgument.value,
        //   // @ts-ignore
        //   name: secondArgument.name,
        //   secondArgument
        // });

        // If new theme value is undefined, then we early return null
        // to actually remove the property altogether from the component
        if (!secondArgumentValue) {
          return null;
        }

        switch (secondArgument.type) {
          case 'StringLiteral':
            node.value = j.stringLiteral(secondArgument.value);
            break;
          case 'NumericLiteral':
          case 'BigIntLiteral':
          case 'NullLiteral':
          case 'BooleanLiteral':
          case 'RegExpLiteral':
            // namedTypes.Identifier |
            // namedTypes.FunctionExpression |
            // namedTypes.ArrayExpression |
            // namedTypes.ObjectExpression |
            // namedTypes.Literal |
            // namedTypes.MemberExpression |
            // namedTypes.CallExpression |
            // namedTypes.TaggedTemplateExpression |
            // namedTypes.TemplateLiteral |
            // namedTypes.JSXIdentifier |
            // namedTypes.JSXExpressionContainer |
            // namedTypes.JSXElement |
            // namedTypes.JSXFragment |
            // namedTypes.JSXMemberExpression |
            // namedTypes.JSXText |
            // namedTypes.ParenthesizedExpression |

            node.value = j.jsxExpressionContainer({
              type: secondArgument.type,
              // @ts-ignore
              value:
                secondArgument.type === 'RegExpLiteral'
                  ? new RegExp(secondArgument.value || '')
                  : secondArgument.value || '',
            });
            break;
          case 'Identifier':
            // Replace the prop value with the value from the new theme
            // (second one passed to the `themedValue` helper)
            node.value = j.jsxExpressionContainer(
              j.identifier(secondArgument.name)
            );
            break;
        }
      }

      return attribute.node;
    });
}

// 2. Process the useTheme hook to remove it or updated it
// remove it (maybe we're also using "theme" property from the hook)
// Make sure there are no more "themedValue" usages in the file
/**
 * Process the useTheme hook to remove it or updated it
 * (maybe we're also using "theme" property from the hook)
 * @param tree
 * @param j
 * @returns boolean indicating whether the hook was removed
 */
function processUseThemeHook(tree: Collection, j: JSCodeshift) {
  let wasHookRemoved = false;

  tree
    .find(j.VariableDeclaration, {
      declarations(values) {
        const [declaration] = values;

        return (
          declaration.type === 'VariableDeclarator' &&
          declaration.init?.type === 'CallExpression' &&
          declaration.init.callee.type === 'Identifier' &&
          declaration.init.callee.name === 'useTheme' &&
          declaration.id.type === 'ObjectPattern'
        );
      },
    })
    .replaceWith((value) => {
      const declaration = value.node.declarations[0] as VariableDeclarator;

      if (declaration.id.type === 'ObjectPattern') {
        // Remove the declaration altogether if we were only getting the `themedValue`
        // helper from the `useTheme` hook
        //  Ex: const { themedValue } = useTheme();
        if (
          declaration.id.properties.length === 1 &&
          declaration.id.properties[0].type === 'ObjectProperty' &&
          declaration.id.properties[0].value.type === 'Identifier' &&
          declaration.id.properties[0].value.name === 'themedValue'
        ) {
          wasHookRemoved = true;
          return null;
        }

        // Update the destructuring of the `useTheme` hook to remove the `themedValue`
        // const when there were more helpers in the destructuring
        //  Ex: const { theme, themedValue } = useTheme();
        const index = declaration.id.properties.findIndex(
          (prop) =>
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'themedValue'
        );
        if (index !== -1) {
          declaration.id.properties.splice(index, 1);
        }
      }

      return value.node;
    });

  return wasHookRemoved;
}

function removeUnusedImports(tree: Collection, j: JSCodeshift) {
  // console.log(tree.toSource());
  // Find all the imported identifiers in the file
  const importedIdentifiers = new Set<string>();
  tree.find(j.ImportDeclaration).forEach((importDeclaration) => {
    importDeclaration.node.specifiers?.forEach((specifier) => {
      if (j.Identifier.check(specifier.local)) {
        importedIdentifiers.add(specifier.local.name);
      }
    });
  });

  console.log({ importedIdentifiers });

  // Find all the used identifiers in the file
  // const usedIdentifiers = new Set<string>();
  // tree
  //   .find(j.Identifier)
  //   .filter((identifier) => {
  //     console.log('This is an identifier with an import parent:', identifier.parent);
  //     if (j.ImportDeclaration.check(identifier.parent)) {
  //       console.log('This is an identifier with an import parent:', identifier.value.name);
  //     }
  //     return !j.ImportDeclaration.check(identifier.parent);
  //   })
  //   .forEach((identifier) => {
  //     if (j.Identifier.check(identifier.node)) {
  //       usedIdentifiers.add(identifier.node.name);
  //     }
  //   });

  // const usedIdentifiers = new Set<string>();
  // tree.find(j.Identifier)
  //   .filter((identifier) => {
  //     console.log({
  //       identifierScope: identifier.scope,
  //       parentType: identifier.parent().type,
  //       parentPathType: identifier.parentPath.type
  //     });
  //     return !j.ImportDeclaration.check(identifier.parent);
  //   })
  //   .forEach((identifier) => {
  //     if (j.Identifier.check(identifier.node)) {
  //       usedIdentifiers.add(identifier.node.name);
  //     }
  //   });
  // console.log({ usedIdentifiers });

  // // Remove unused imports
  // tree.find(j.ImportDeclaration).forEach((importDeclaration) => {
  //   const importSpecifiers = importDeclaration.node.specifiers;
  //   if (!importSpecifiers) return;

  //   const foo: unknown[] = [];
  //   const usedSpecifiers = importSpecifiers.filter(
  //     (specifier) => {
  //       console.log('Filtering specifiers:', specifier.local?.name);
  //       const result = usedIdentifiers.has(specifier.local?.name || '');
  //       result && foo.push(specifier.local?.name);
  //       return result;
  //     }
  //   );

  //   console.log({
  //     usedSpecifiersCount: usedSpecifiers.length,
  //     importSpecifiersCount: importSpecifiers.length,
  //     foo
  //   });

  //   if (usedSpecifiers.length === 0) {
  //     // remove the entire import declaration
  //     // @ts-ignore
  //     // console.log('Removing import:', importDeclaration.source.value);

  //     j(importDeclaration).remove();
  //   } else if (usedSpecifiers.length < importSpecifiers.length) {
  //     // remove unused specifiers from the import declaration
  //     // @ts-ignore
  //     // console.log('Updating import:', importDeclaration.source.value);
  //     importDeclaration.node.specifiers = usedSpecifiers;
  //   }
  // });

  // Find all the used identifiers in the file
  const usedIdentifiersMap = new Map<string, number>();
  tree.find(j.Identifier).forEach((identifier) => {
    if (
      // (j.Identifier.check(identifier.node)) ||
      // j.JSXIdentifier.check(identifier.node)
      (j.Identifier.check(identifier.node) &&
        !j.ImportSpecifier.check(identifier.parent.node) &&
        !j.ImportDefaultSpecifier.check(identifier.parent.node)) ||
      j.JSXIdentifier.check(identifier.node)
    ) {
      // if (identifier.node.name === 'CommercetoolsLogoSvg') {
      //   console.log('HERE I AM!!!', {
      //     identifier: identifier.value.name,
      //     name: identifier.name,
      //     parent: identifier.parent,
      //     parentPath: identifier.parentPath,
      //     // areEqual: identifier.parent.imported === identifier.parent.local,
      //     // loc: identifier.node.loc?.start.line + '-' + identifier.node.loc?.start.column
      //   });
      // }
      const previousCount = usedIdentifiersMap.get(identifier.node.name) || 0;

      // if (j.ImportSpecifier.check(identifier.parent.node)) {
      //   console.log('PARENT is an ImportSpecifier!');

      //   const importedName = identifier.parent.node.imported.name;
      //   const localName = identifier.parent.node.local.name;
      //   const foo = tree.find(j.ImportSpecifier, { local: { name: localName } })
      //   console.log('Import specifiers with this name: ', localName, foo.length);

      //   if (
      //     tree
      //       .find(j.ImportSpecifier, { local: { name: localName } })
      //       .filter((specifier) => specifier.parent.node.source === identifier.parent.node.source)
      //       .length > 1
      //   ) {
      //     // Skip this identifier if it has the same local identifier as another specifier in the same import
      //     console.log('SKIPPING!!!');
      //     return;
      //   }

      //   // Add the imported name to the map instead of the local name
      //   usedIdentifiersMap.set(importedName, previousCount + 1);
      // } else {
      //    // Add the local name to the map for non-imported identifiers
      //    usedIdentifiersMap.set(identifier.node.name, previousCount + 1);
      // }

      usedIdentifiersMap.set(identifier.node.name, previousCount + 1);
    }
  });

  console.log({ usedIdentifiersMap });

  // Remove unused imports
  tree.find(j.ImportDeclaration).forEach((importDeclaration) => {
    const importSpecifiers = importDeclaration.node.specifiers;
    if (!importSpecifiers) {
      return;
    }
    const usedSpecifiers = importSpecifiers.filter(
      (specifier) =>
        (usedIdentifiersMap.get(specifier.local?.name || '') || 0) > 0
    );

    console.log({
      importDeclaration: importSpecifiers
        .map((specifier) => specifier.local?.name)
        .join(', '),
      usedSpecifiersCount: usedSpecifiers.length,
    });

    if (usedSpecifiers.length === 0) {
      // remove the entire import declaration
      j(importDeclaration).remove();
    } else if (usedSpecifiers.length < importSpecifiers.length) {
      // remove unused specifiers from the import declaration
      importDeclaration.node.specifiers = usedSpecifiers;
    }
  });
}

function themeMigrationCleanup(
  file: FileInfo,
  api: API
  // options: TRunnerOptions
) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // const useThemeCalls = root.find(j.CallExpression, {
  //   callee: {
  //     type: 'Identifier',
  //     name: 'useTheme'
  //   }
  // });

  // 1. Update props which use `themedValue` helper to always use new theme value
  updateThemedValueUsages(root, j);

  // 2. Process the useTheme hook to remove it or updated it
  processUseThemeHook(root, j);

  // 3. TODO: If we removed the useHook call, also remove the import
  // 4. TODO: Remove cleanup TODO comment?
  // if (useThemeHookUsages.size() > 0) {
  // }

  removeUnusedImports(root, j);

  // 5. Clean potentially useless imports
  // <img
  //   width={themedValue('100%', undefined)}
  //   src={themedValue(
  //     CommercetoolsLogoSvg, <------------------------
  //     CommercetoolsLogoOnWhiteSvg
  //   )}
  //   alt="commercetools logo"
  // />

  return root.toSource();

  // const declarators = root
  //   .findVariableDeclarators()
  //   // @ts-ignore
  //   .filter((path: ASTPath<j.VariableDeclarator>) => {
  //     // console.log('Filtering path:', path.node.init);
  //     const node = path.node;
  //     // console.log({
  //     //   init: node.init,
  //     // });
  //     // if (node.init.type === 'CallExpression') {
  //     //   console.log({
  //     //     calleeName: node.init.callee.name,
  //     //     calleeObj: node.init.callee.object,
  //     //     calleeProp: node.init.callee.property
  //     //   })
  //     // }

  //     return node.init.type === 'CallExpression' && node.init.callee.name === 'useTheme';
  //   })
  //   .forEach((path) => {
  //     console.log('Iterating over path:', path);
  //     const declarations = path.get('id', 'properties');
  //     // const declarations = path.get('id', 'properties').filter(
  //     //   // @ts-ignore
  //     //   (property) =>
  //     //     // @ts-ignore
  //     //     property.get('key').value.name === 'themedValue' && j(property.get('value')).isIdentifier()
  //     // );
  //     console.log('Declarations:', declarations);
  //   });

  // root.find(j.JSXOpeningElement).forEach((path: ASTPath<JSXOpeningElement>) => {
  //   const node = path.node;
  //   if (node.name.type === 'JSXIdentifier') {
  //     node.attributes?.forEach(attribute => {
  //       // if ((attribute as JSXAttribute).name?.name === 'scale') {
  //         console.log({
  //           attribute: attribute
  //         });
  //       // }
  //     });
  //   }
  // });

  // root
  //   .findVariableDeclarators()
  //   .filter((path) =>
  //     // @ts-ignore
  //     j(path.node.init)
  //       .find(j.CallExpression, {
  //         callee: {
  //           name: 'useTheme',
  //         },
  //       })
  //       .filter((path) => {
  //         console.log('Filtering by path:', path);
  //         return path.get('arguments', 0).value && path.get('arguments', 0).value.type === 'ObjectExpression'
  //       }).size()
  //   )
  //   .forEach((path) => {
  //     console.log('Iterating over path:', path);
  //     const declarations = path.get('id', 'properties').filter(
  //       // @ts-ignore
  //       (property) =>
  //         // @ts-ignore
  //         property.get('key').value.name === 'themedValue' && j(property.get('value')).isIdentifier()
  //     );
  //     console.log('Declarations:', declarations);

  //     if (declarations.length > 0) {
  //       const declaration = declarations[0];

  //       // Find usages of `themedValue` in props
  //       root.find(j.JSXExpressionContainer, {
  //         expression: {
  //           type: 'CallExpression',
  //           callee: {
  //             name: declaration.get('value').value,
  //           },
  //         },
  //       }).forEach((path) => {
  //         const argument = path.get('expression.arguments', 1).value;
  //         const propPath = path.parentPath.parentPath;

  //         // Replace the prop value with the second parameter passed to the `themedValue` function
  //         propPath.node.value = j.literal(argument);
  //       });

  //       // Remove the `themedValue` declaration
  //       declaration.parentPath.prune();
  //     }
  //   });

  // console.log(root.toSource());
}

export default themeMigrationCleanup;
