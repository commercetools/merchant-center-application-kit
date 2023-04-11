// import { inspect } from 'util';
import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  Identifier,
  JSCodeshift,
  TSHasOptionalTypeParameterInstantiation,
  TaggedTemplateExpression,
  VariableDeclarator,
} from 'jscodeshift';
import prettier from 'prettier';
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
  // Props using themedValue helper
  // Example:
  //   <CheckboxIconWrapper
  //     width={themedValue('auto', '26px')}
  //     height={themedValue('auto', '26px')}
  //     isHovered={canForcedHoverEffect}
  //   >
  tree
    .find(j.JSXAttribute, {
      value(attributeValue) {
        return (
          attributeValue?.type === 'JSXExpressionContainer' &&
          attributeValue?.expression.type === 'CallExpression' &&
          attributeValue?.expression.callee.type === 'Identifier' &&
          attributeValue?.expression.callee.name === 'themedValue'
        );
      },
    })
    .replaceWith((attribute) => {
      const { node } = attribute;

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

        // If new theme value is undefined, then we early return null
        // to actually remove the property altogether from the component
        if (!secondArgumentValue || secondArgumentValue === 'undefined') {
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

  // Template literals using themedValue helper
  // Example:
  //   <div
  //     css={[
  //       css`
  //         width: ${themedValue('16px', '18px')};
  //         height: ${themedValue('16px', '18px')};
  tree
    .find(j.TaggedTemplateExpression)
    .forEach((expression: ASTPath<TaggedTemplateExpression>) => {
      const { node } = expression;

      // @ts-ignore
      node.quasi.expressions = node.quasi.expressions.map((expression) => {
        if (
          j.CallExpression.check(expression) &&
          j.Identifier.check(expression.callee) &&
          expression.callee.name === 'themedValue'
        ) {
          return expression.arguments[1];
        } else {
          return expression;
        }
      });
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

  const themedValueCalls = tree.find(j.CallExpression, {
    callee: {
      name: 'themedValue',
    },
  });
  if (themedValueCalls.length > 0) {
    return wasHookRemoved;
  }

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

  // Find types annotations
  tree
    .find(j.CallExpression)
    .filter((callExpression) => {
      return j.TSTypeParameterInstantiation.check(
        (callExpression.node as TSHasOptionalTypeParameterInstantiation)
          .typeParameters
      );
    })
    .forEach((callExpression) => {
      // @ts-ignore
      // console.log({ callExpression: callExpression.node.callee.name, source: callExpression.node.typeParameters });
      // @ts-ignore
      callExpression.node.typeParameters.params.forEach((param) => {
        // console.log('////', param);
        if (
          j.TSTypeReference.check(param) &&
          j.Identifier.check(param.typeName)
        ) {
          const previousCount =
            usedIdentifiersMap.get(param.typeName.name) || 0;
          usedIdentifiersMap.set(param.typeName.name, previousCount + 1);
        }

        if (
          j.TSArrayType.check(param) &&
          j.TSTypeReference.check(param.elementType) &&
          j.Identifier.check(param.elementType.typeName)
        ) {
          const name = param.elementType.typeName.name;
          const previousCount = usedIdentifiersMap.get(name) || 0;
          usedIdentifiersMap.set(name, previousCount + 1);
        }

        // Declaration of a custom type for a function parameter
        if (j.TSTypeLiteral.check(param)) {
          param.members.forEach((propSignature) => {
            // console.log({propSignature});
            // TODO: This is to satisfy TS. Can we do it simpler?
            if (
              j.TSPropertySignature.check(propSignature) &&
              j.TSTypeAnnotation.check(propSignature.typeAnnotation) &&
              j.TSTypeReference.check(
                propSignature.typeAnnotation.typeAnnotation
              ) &&
              j.Identifier.check(
                propSignature.typeAnnotation.typeAnnotation.typeName
              )
            ) {
              const previousCount =
                usedIdentifiersMap.get(
                  propSignature.typeAnnotation.typeAnnotation.typeName.name
                ) || 0;
              usedIdentifiersMap.set(
                propSignature.typeAnnotation.typeAnnotation.typeName.name,
                previousCount + 1
              );
            }
          });
        }

        // Return types in function types
        if (
          j.TSFunctionType.check(param) &&
          j.TSTypeReference.check(param.typeAnnotation?.typeAnnotation)
        ) {
          // console.log({ typeAnnotation: param.typeAnnotation?.typeAnnotation.typeName });
          const typeName = (
            param.typeAnnotation?.typeAnnotation.typeName as Identifier
          ).name;
          const previousCount = usedIdentifiersMap.get(typeName) || 0;
          usedIdentifiersMap.set(typeName, previousCount + 1);

          param.typeAnnotation?.typeAnnotation.typeParameters?.params.forEach(
            (annotationParam) => {
              const annotationParamName =
                j.TSTypeReference.check(annotationParam) &&
                (annotationParam.typeName as Identifier).name;
              if (annotationParamName) {
                const previousCount =
                  usedIdentifiersMap.get(annotationParamName) || 0;
                usedIdentifiersMap.set(annotationParamName, previousCount + 1);
              }
            }
          );
        }

        // Find TS types in function types parameters signatures
        if (j.TSFunctionType.check(param)) {
          param.parameters.forEach((fnParam) => {
            let typeName: string | undefined = undefined;
            // @ts-ignore
            // console.log({ fnParam, annotation: fnParam.typeAnnotation.typeAnnotation });

            if (
              j.Identifier.check(fnParam) &&
              j.TSTypeReference.check(fnParam.typeAnnotation?.typeAnnotation) &&
              j.Identifier.check(
                fnParam.typeAnnotation?.typeAnnotation.typeName
              )
            ) {
              typeName = fnParam.typeAnnotation?.typeAnnotation.typeName.name;
            }

            if (
              j.Identifier.check(fnParam) &&
              j.TSArrayType.check(fnParam.typeAnnotation?.typeAnnotation) &&
              j.TSTypeReference.check(
                fnParam.typeAnnotation?.typeAnnotation.elementType
              ) &&
              j.Identifier.check(
                fnParam.typeAnnotation?.typeAnnotation.elementType.typeName
              )
            ) {
              typeName =
                fnParam.typeAnnotation?.typeAnnotation.elementType.typeName
                  .name;
            }

            if (typeName) {
              const previousCount = usedIdentifiersMap.get(typeName) || 0;
              usedIdentifiersMap.set(typeName, previousCount + 1);
            }
          });
        }
      });
    });

  // console.log({
  //   usedIdentifiers: usedIdentifiersMap.keys()
  // });

  // Remove unused imports
  tree.find(j.ImportDeclaration).forEach((importDeclaration) => {
    const importSpecifiers = importDeclaration.node.specifiers;
    if (!importSpecifiers || importSpecifiers.length < 1) {
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

async function themeMigrationCleanup(
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

  // TODO: Do not return anything if no changes were applied

  // Format output code with prettier
  const prettierConfig = await prettier.resolveConfig(file.path);
  return prettier.format(root.toSource(), prettierConfig!);
}

export default themeMigrationCleanup;
