// import { inspect } from 'node:util';
import type {
  API,
  // ASTPath,
  // CallExpression,
  // ASTPath,
  // CallExpression,
  FileInfo,
  // JSXAttribute,
  // JSXExpressionContainer,
  // StringLiteral,
  VariableDeclarator,
  // JSXAttribute,
  // JSXOpeningElement,
  // VariableDeclaration,
  // VariableDeclarator
} from 'jscodeshift';
// import type { TRunnerOptions } from '../types';

// const isThemedValueDeclaration = (node) =>
// function isLodashImport(node) {
//   return (
//     node.source.value.startsWith('lodash') && !node.source.value.includes('/')
//   );
// }

function removeDeprecatedModalLevelProps(
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

  // 1. Update props which use `themedValue` helper usages to always use new theme value
  //  Remove the prop in case the new theme value is undefined
  const themedValueUsages = root.find(j.JSXAttribute, {
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
  });
  themedValueUsages.replaceWith((attribute) => {
    const { node } = attribute;
    // console.log({node});

    // <Spacings.Stack scale={themedValue('m', 'l')}>
    // <Spacings.Stack scale={themedValue(designTokens.A, designTokensB)}>
    // <div
    //   css={css`
    //     color: ${customProperties.colorSurface};
    //     text-align: ${themedValue('left', 'center')};
    //   `}
    // >

    if (
      node.value?.type === 'JSXExpressionContainer' &&
      node.value?.expression.type === 'TaggedTemplateExpression'
    ) {
      console.log({ expression: node.value.expression.quasi.expressions });

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
      console.log('Expression:', node.value.expression.arguments[1].type);
      const secondArgument = node.value.expression.arguments[1];

      const secondArgumentValue =
        'value' in secondArgument
          ? secondArgument.value
          : 'name' in secondArgument
          ? secondArgument.name
          : undefined;

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

          // const nodeValue = secondArgument.value;
          // If new theme value is undefined, then we early return null
          // to actually remove the property altogether from the component
          // if (secondArgument.value === 'undefined') {
          //   return null;
          // }

          // Replace the prop value with the value from the new theme
          // (second one passed to the `themedValue` helper)
          // node.value = j.stringLiteral(
          //   node.value.expression.arguments[1].value
          // );
          node.value = j.jsxExpressionContainer({
            type: secondArgument.type,
            // @ts-ignore
            value:
              secondArgument.type === 'RegExpLiteral'
                ? new RegExp(secondArgument.value || '')
                : secondArgument.value || '',
          });
          // console.log('Expression updated with String literal!');
          break;
        case 'Identifier':
          // If new theme value is undefined, then we early return null
          // to actually remove the property altogether from the component
          // if (node.value.expression.arguments[1].name === 'undefined') {
          //   return null;
          // }
          if (secondArgument.name === 'undefined') {
            return null;
          }

          // Replace the prop value with the value from the new theme
          // (second one passed to the `themedValue` helper)
          node.value = j.jsxExpressionContainer(
            j.identifier(secondArgument.name)
          );
          // node.value = node.value.expression.arguments[1];
          break;
      }
    }

    return attribute.node;
  });

  // 2. If useHook was used to only consume themedValue,
  // remove it (maybe we're also using "theme" property from the hook)
  // Make sure there are no more "themedValue" usages in the file
  // TODO: If we were also importing another useTheme hook helper, remove
  // themedValue from the destructured object
  const useThemeHookUsages = root.find(j.VariableDeclaration, {
    declarations(values) {
      const [declaration] = values;

      // console.log({ declarationType: declaration.type});

      return (
        declaration.type === 'VariableDeclarator' &&
        declaration.init?.type === 'CallExpression' &&
        declaration.init.callee.type === 'Identifier' &&
        declaration.init.callee.name === 'useTheme' &&
        declaration.id.type === 'ObjectPattern'
        // declaration.id.properties.length >= 1 &&
        // declaration.id.properties[0].type === 'ObjectProperty' &&
        // declaration.id.properties[0].value.type === 'Identifier' &&
        // declaration.id.properties[0].value.name === 'themedValue'
      );
    },
  });
  // console.log({ useThemeHookUsages });
  // useThemeHookUsages.remove();
  useThemeHookUsages.replaceWith((value) => {
    const declaration = value.node.declarations[0] as VariableDeclarator;

    if (declaration.id.type === 'ObjectPattern') {
      // Remove the declaration altogether if we were only getting the `themedValue`
      // helper from the `useTheme` hook
      //  Ex: const { themedValue } = useTheme();
      if (declaration.id.properties.length === 1) {
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

  // 3. TODO: If we removed the useHook call, also remove the import
  // 4. TODO: Remove cleanup TODO comment?
  if (useThemeHookUsages.size() > 0) {
  }

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

export default removeDeprecatedModalLevelProps;
