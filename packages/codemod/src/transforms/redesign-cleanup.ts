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
  let isUseThemeHookRemoved = false;

  // Find all the used identifiers in the file
  const usedIdentifiersMap = new Map<string, number>();
  tree.find(j.Identifier).forEach((identifier) => {
    if (
      (j.Identifier.check(identifier.node) &&
        !j.ImportSpecifier.check(identifier.parent.node) &&
        !j.ImportDefaultSpecifier.check(identifier.parent.node)) ||
      j.JSXIdentifier.check(identifier.node)
    ) {
      const previousCount = usedIdentifiersMap.get(identifier.node.name) || 0;
      usedIdentifiersMap.set(identifier.node.name, previousCount + 1);
    }
  });

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

    if (usedSpecifiers.length === 0) {
      // remove the entire import declaration
      j(importDeclaration).remove();
      isUseThemeHookRemoved = importSpecifiers.some(
        (specifier) => specifier.local?.name === 'useTheme'
      );
    } else if (usedSpecifiers.length < importSpecifiers.length) {
      // remove unused specifiers from the import declaration
      importDeclaration.node.specifiers = usedSpecifiers;
      isUseThemeHookRemoved = importSpecifiers.some(
        (specifier) => specifier.local?.name === 'useTheme'
      );
    }
  });

  return isUseThemeHookRemoved;
}

function removeMigrationCleanupComment(tree: Collection, j: JSCodeshift) {
  tree
    // @ts-ignore
    .find(j.Comment)
    .filter(
      (path) =>
        j.CommentLine.check(path.value) &&
        path.value.value.indexOf('@redesign cleanup') !== -1
    )
    .remove();
}

function themeMigrationCleanup(
  file: FileInfo,
  api: API
  // options: TRunnerOptions
) {
  const j = api.jscodeshift;
  const root = j(file.source, { comment: true });

  // 1. Update props which use `themedValue` helper to always use new theme value
  updateThemedValueUsages(root, j);

  // 2. Process the useTheme hook to remove it or updated it
  processUseThemeHook(root, j);

  // 3. After updating the useTheme usages, let's potentially remove unnecessary imports
  const hasUseThemeHookBeenRemoved = removeUnusedImports(root, j);

  // 4. Remove migration comment -> TODO: @redesign cleanup
  if (hasUseThemeHookBeenRemoved) {
    removeMigrationCleanupComment(root, j);
  }

  return root.toSource();
}

export default themeMigrationCleanup;
