// import { inspect } from 'node:util';
import type {
  API,
  // ASTPath,
  // CallExpression,
  FileInfo,
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

  // 1. Update themedValue usages to always use new theme value
  const themedValueUsages = root.find(j.JSXAttribute, {
    value(attributeValue) {
      return (
        attributeValue?.type === 'JSXExpressionContainer' &&
        attributeValue?.expression.type === 'CallExpression' &&
        attributeValue?.expression.callee.type === 'Identifier' &&
        attributeValue?.expression.callee.name === 'themedValue'
      );

      // return false;
    },
  });
  console.log({ themedValueUsages: themedValueUsages.size() });
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
      node.value?.expression.type === 'CallExpression'
    ) {
      console.log('Expression:', node.value.expression.arguments[1].type);

      switch (node.value.expression.arguments[1].type) {
        case 'StringLiteral':
          node.value = j.stringLiteral(
            node.value.expression.arguments[1].value
          );
          console.log('Expression updated with String literal!');
          break;
        case 'Identifier':
          node.value = j.jsxExpressionContainer(
            j.identifier(node.value.expression.arguments[1].name)
          );
          break;
      }

      // if (node.value.expression.arguments[1].type === 'StringLiteral') {
      //   console.log('1.', inspect(node.value));
      //   node.value = j.stringLiteral(node.value.expression.arguments[1].value);
      //   console.log('2.', inspect(node.value));
      //   console.log('Changed themeValue attribute signature!');
      // }
    }

    return attribute.node;
  });

  // 2. If useHook was used to only consume themedValue,
  // remove it (maybe we're also using "theme" property from the hook)
  // Make sure there are no more "themedValue" usages in the file
  const useThemeHookUsages = root.find(j.VariableDeclaration, {
    declarations(values) {
      const [declaration] = values;

      // console.log({ declarationType: declaration.type});

      return (
        declaration.type === 'VariableDeclarator' &&
        declaration.init?.type === 'CallExpression' &&
        declaration.init.callee.type === 'Identifier' &&
        declaration.init.callee.name === 'useTheme' &&
        declaration.id.type === 'ObjectPattern' &&
        declaration.id.properties.length === 1 &&
        declaration.id.properties[0].type === 'ObjectProperty' &&
        declaration.id.properties[0].value.type === 'Identifier' &&
        declaration.id.properties[0].value.name === 'themedValue'
      );
    },
  });
  // console.log({ useThemeHookUsages });
  // useThemeHookUsages.remove();

  // 3. If we removed the useHook call, also remove the import
  if (useThemeHookUsages.size() > 0) {
  }

  // 4. Remove cleanup TODO comment?

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
