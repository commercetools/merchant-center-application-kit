import {
  API,
  AssignmentExpression,
  ASTPath,
  CallExpression,
  Collection,
  ExpressionStatement,
  FileInfo,
  JSCodeshift,
  MemberExpression,
  ObjectExpression,
  PropertyPattern,
  TSTypeAliasDeclaration,
} from 'jscodeshift';
import prettier from 'prettier';
import { TRunnerOptions } from '../types';

type TDefaultPropsMap = Record<string, ExpressionStatement['expression']>;

// When adjusting the component body where the previous props object was used
// we don't need to adjust the function calls that are listed here
const IGNORED_FUNCTIONS_ON_BODY_ADJUSTMENTS = [
  'filterAriaAttributes',
  'filterDataAttributes',
];

/*
  Given the component function parameter description, we extract the
  Typescript type name (if any).

  Somethibng like this:
    (props: MyComponentProps) -> MyComponentProps
*/
function resolvePropsTypescriptType(
  propsParam: PropertyPattern['pattern']
): string | undefined {
  if (
    propsParam.type === 'ObjectPattern' &&
    propsParam.typeAnnotation &&
    propsParam.typeAnnotation.type === 'TSTypeAnnotation' &&
    propsParam.typeAnnotation.typeAnnotation.type === 'TSTypeReference' &&
    propsParam.typeAnnotation.typeAnnotation.typeName.type === 'Identifier'
  ) {
    return propsParam.typeAnnotation.typeAnnotation.typeName.name;
  }
  return undefined;
}

/*
  This helper takes care of replacing the defaultProps usage in the component body
  Previously the component code was relying on the props object to access the default values
  but now the default props are destructured in the function signature
  Example:
  ```
  // BEFORE
  const MyComponent = (props) => {
    return <div>{props.prop1}</div>;
  }
  // AFTER
  const MyComponent = ({ prop1 }) => {
    return <div>{prop1}</div>;
  }
  ```
*/
function replacePropsUsage({
  j,
  defaultPropsKeys,
  scope,
}: {
  j: JSCodeshift;
  defaultPropsKeys: string[];
  scope: Collection;
}) {
  /*
    Next code block replaces destructured props usage in the component body.
    ```
      // BEFORE
        const MyComponent = (props) => {
          return <div>{props.prop1}</div>;
        }
      }

      // AFTER
      const MyComponent = ({ prop1, ...props }) => {
        return <div>{prop1}</div>;
      }
    ```
  */
  scope
    .find(j.MemberExpression, {
      object: { type: 'Identifier', name: 'props' },
    })
    .forEach((memberPath: ASTPath<MemberExpression>) => {
      const property = memberPath.node.property;
      // Add type guard for Identifier
      if (
        property.type === 'Identifier' &&
        defaultPropsKeys.includes(property.name)
      ) {
        j(memberPath).replaceWith(j.identifier(property.name));
      }
    });

  /*
    Next code block replaces props usage in the component body where
    props is passed as an argument to a function.
    ```
      // BEFORE
      const MyComponent = (props) => {
        return <div>{getStyles(props)}</div>;
      }

      // AFTER
      const MyComponent = ({ prop1, ...props }) => {
        return <div>{getStyles({ prop1, ...props })}</div>;
      }
    ```
  */
  scope
    .find(j.CallExpression, {
      // There are some functions that don't need to be adjusted
      // (example: filterAriaAttributes, filterDataAttributes)
      callee: {
        type: 'Identifier',
        name: (name: string) =>
          !IGNORED_FUNCTIONS_ON_BODY_ADJUSTMENTS.includes(name),
      },
      arguments: [{ type: 'Identifier', name: 'props' }],
    })
    .forEach((callPath: ASTPath<CallExpression>) => {
      // Create a destructured object
      const properties = [
        ...defaultPropsKeys.map((key) => {
          const id = j.identifier(key);
          const newProp = j.property('init', id, id);
          newProp.shorthand = true;
          return newProp;
        }),
        j.spreadElement(j.identifier('props')),
      ];

      const objectExpression = j.objectExpression(properties);

      // Replace the 'props' argument with the destructured object
      callPath.node.arguments[0] = objectExpression;
    });

  /*
    Next code block replaces props spread in JSX elements
    ```
      // BEFORE
      const MyComponent = (props) => {
        return <SubComponent {...props} />
      }

      // AFTER
      const MyComponent = ({ prop1, ...props }) => {
        return <SubComponent prop1={prop1} prop2={prop2} {...props} />
      }
    ```
  */
  scope
    .find(j.JSXSpreadAttribute, {
      argument: { type: 'Identifier', name: 'props' },
    })
    .forEach((path) => {
      const attributes = defaultPropsKeys.map((key) =>
        j.jsxAttribute(
          j.jsxIdentifier(key),
          j.jsxExpressionContainer(j.identifier(key))
        )
      );

      // Replace the spread with individual attributes
      j(path).replaceWith([
        ...attributes,
        j.jsxSpreadAttribute(j.identifier('props')),
      ]);
    });
}

/*
  We need to make sure the component type definition is updated to reflect the
  props that are now optional.
  Example:
  ```
  // BEFORE
  type MyComponentProps = {
    prop1: string;
    prop2: string;
    prop3: string;
  }
  function MyComponent(props: MyComponentProps) { ... }
  MyComponent.defaultProps = {
    prop1: 'default value',
  }

  // AFTER
  type MyComponentProps = {
    prop1?: string;
    prop2: string;
    prop3: string;
  }
  function MyComponent({ prop1, ...props }: MyComponentProps) { ... }
  ```
*/
function updateComponentTypes({
  j,
  root,
  typeName,
  destructuredKeys,
}: {
  j: JSCodeshift;
  root: Collection;
  typeName: string;
  destructuredKeys: string[];
}) {
  // Find the type definition of the component props
  root
    .find(j.TSTypeAliasDeclaration)
    .forEach((typePath: ASTPath<TSTypeAliasDeclaration>) => {
      if (typePath.node.id.name === typeName) {
        const typeAnnotation = typePath.node.typeAnnotation;

        if (typeAnnotation.type === 'TSTypeLiteral') {
          typeAnnotation.members.forEach((member) => {
            if (
              member.type === 'TSPropertySignature' &&
              member.key.type === 'Identifier' &&
              destructuredKeys.includes(member.key.name)
            ) {
              member.optional = true;
            }
          });
        }
      }
    });
}

/*
  This helper transforms the component function signature to use a destructured object
  as first parameter, so we can append the default props to it.
  Example:
  ```
  // BEFORE
  const MyComponent = (props) => { ... }

  // AFTER
  const MyComponent = ({ prop1, ...props }) => { ... }
  ```
*/
function transformComponentFunctionSignature({
  functionPropsParam,
  defaultPropsMap,
  componentName,
  j,
}: {
  functionPropsParam: PropertyPattern['pattern'];
  defaultPropsMap: TDefaultPropsMap;
  componentName: string;
  j: JSCodeshift;
}): PropertyPattern['pattern'] {
  let refactoredParameter: PropertyPattern['pattern'];
  const defaultPropsKeys = Object.keys(defaultPropsMap);
  switch (functionPropsParam.type) {
    // In this case, the component already has a destructured object as first parameter
    // so we need to append the defaultProps to it
    //   const MyComnponent = ({ prop1, ...props }) => { ... }
    case 'ObjectPattern':
      refactoredParameter = functionPropsParam;
      refactoredParameter.properties = [
        ...transformDefaultPropsToAST(defaultPropsMap, j),
        // If the destructured object already had one of the default props, filter it out
        ...functionPropsParam.properties.filter((prop) => {
          return (
            prop.type !== 'ObjectProperty' ||
            prop.key.type !== 'Identifier' ||
            !defaultPropsKeys.includes(prop.key.name)
          );
        }),
      ];
      break;
    // In this case, the component has a simple parameter as first parameter
    // so we need to refactor it to a destructured object
    //   const MyComnponent = (props) => { ... }
    case 'Identifier':
      refactoredParameter = j.objectPattern([
        ...transformDefaultPropsToAST(defaultPropsMap, j),
        j.spreadProperty(j.identifier('props')),
      ]);

      // Make sure the refactored parameter has the same type annotation
      // as the original one
      refactoredParameter.typeAnnotation = functionPropsParam.typeAnnotation;
      break;
    default:
      console.warn(
        `[WARNING]: Could not parse component function first parameter "${componentName}"`
      );
  }

  return refactoredParameter!;
}

/*
  This helper extracts the default props keys/values from the defaultProps object node
*/
function extractDefaultPropsFromNode(
  defaultPropsNode: ObjectExpression
): TDefaultPropsMap {
  return defaultPropsNode.properties.reduce((acc, prop) => {
    if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
      return {
        ...acc,
        [prop.key.name as string]:
          prop.value as ExpressionStatement['expression'],
      };
    }
    return acc;
  }, {} as TDefaultPropsMap);
}

/*
  This helper transforms the default props keys/values to an AST representation
  so we can easily append them to the component function signature.
  ```
*/
function transformDefaultPropsToAST(
  defaultPropsMap: TDefaultPropsMap,
  j: JSCodeshift
) {
  return Object.entries(defaultPropsMap).map(([key, value]) => {
    const propNode = j.objectProperty(
      j.identifier(key),
      j.assignmentPattern(j.identifier(key), value)
    );
    propNode.shorthand = true;
    return propNode;
  });
}

async function reactDefaultPropsMigration(
  file: FileInfo,
  api: API,
  options: TRunnerOptions
) {
  const j = api.jscodeshift;
  const root = j(file.source, { comment: false });
  const originalSource = root.toSource();

  console.log('Processing file:', file.path);

  // 1. Search for "defaultProps" definitions
  root
    .find(j.AssignmentExpression, {
      left: {
        type: 'MemberExpression',
        property: { name: 'defaultProps' },
      },
    })
    .forEach((path: ASTPath<AssignmentExpression>) => {
      // Types validation to please Typescript
      if (
        path.node.left.type === 'MemberExpression' &&
        path.node.left.object.type === 'Identifier'
      ) {
        // The node path looks like this:
        //  defaultProps: MyComponent.defaultProps = defaultProps;
        const componentName = path.node.left.object.name;
        const defaultPropsNode = path.node.right;
        let componentPropsTypescriptType: string | undefined; // Only TypeScript files have type annotations
        let defaultPropsMap: TDefaultPropsMap = {};
        let functionScope: Collection;

        // 2. We now extract the default props values
        // Default props can be defined inline or as a reference to another object
        //  INLINE -- MyComponent.defaultProps: { prop1: 'value1', prop2: 'value2' }
        //  REFERENCE -- MyComponent.defaultProps: defaultProps
        if (defaultPropsNode.type === 'Identifier') {
          //  REFERENCE -- MyComponent.defaultProps: defaultProps
          // A) Look for the identifier declaration
          const defaultPropsDeclarations = root.find(j.VariableDeclarator, {
            id: { type: 'Identifier', name: defaultPropsNode.name },
          });

          if (defaultPropsDeclarations.size() === 1) {
            // B) Extract default props keys/values
            defaultPropsMap = extractDefaultPropsFromNode(
              defaultPropsDeclarations.nodes()[0].init as ObjectExpression
            );
            // C) Remove the identifier declaration
            defaultPropsDeclarations.remove();
          } else {
            console.warn(
              `[WARNING]: Could not find defaultProps declaration for "${componentName}"`
            );
          }
        } else if (defaultPropsNode.type === 'ObjectExpression') {
          // INLINE -- MyComponent.defaultProps: { prop1: 'value1', prop2: 'value2' }
          // Extract default props keys/values
          defaultPropsMap = extractDefaultPropsFromNode(defaultPropsNode);
        } else {
          console.warn(
            `[WARNING]: Do not know how to process default props for component "${componentName}": ${j(
              path
            ).toSource()}`
          );
          return;
        }

        // 3. Next we update the component function signature
        // We first look for classic function declarations
        //   function MyComnponent(props) { ... }
        const functionComponentDeclaration = root.find(j.FunctionDeclaration, {
          id: { name: componentName },
        });
        if (functionComponentDeclaration.length === 1) {
          functionComponentDeclaration.nodes()[0].params[0] =
            transformComponentFunctionSignature({
              functionPropsParam:
                functionComponentDeclaration.nodes()[0].params[0],
              defaultPropsMap,
              componentName,
              j,
            });

          // Extract the component props TS type name
          componentPropsTypescriptType = resolvePropsTypescriptType(
            functionComponentDeclaration.nodes()[0].params[0]
          );

          // Get the function body scope so we only do the replacement
          // within the component function we're currently processing
          functionScope = j(functionComponentDeclaration.nodes()[0].body);
        } else {
          // If we don't find a function declaration, we look for arrow function declarations
          //   const MyComnponent = (props) => { ... }
          //   const MyComnponent = ({ prop1, ...props }) => { ... }
          const variableComponentDeclaration = root.find(
            j.VariableDeclaration,
            {
              declarations: [
                {
                  id: { name: componentName },
                },
              ],
            }
          );
          if (variableComponentDeclaration.length === 1) {
            const functionFirstParamNode =
              variableComponentDeclaration.nodes()[0].declarations[0];

            if (
              functionFirstParamNode.type === 'VariableDeclarator' &&
              functionFirstParamNode.init?.type === 'ArrowFunctionExpression'
            ) {
              functionFirstParamNode.init.params[0] =
                transformComponentFunctionSignature({
                  functionPropsParam: functionFirstParamNode.init.params[0],
                  defaultPropsMap,
                  componentName,
                  j,
                });

              // Extract the component props TS type name
              componentPropsTypescriptType = resolvePropsTypescriptType(
                functionFirstParamNode.init.params[0]
              );

              // Get the function body scope so we only do the replacement
              // within the component function we're currently processing
              functionScope = j(functionFirstParamNode.init.body);
            } else {
              console.warn(
                `[WARNING]: Could parse component function first parameter "${componentName}"`
              );
              return;
            }
          } else {
            console.warn(
              `[WARNING]: Could not find component declaration for "${componentName}" (class component are ignored)`
            );
            return;
          }
        }

        // 4. Refactor the usages of the default props in the body of the component
        replacePropsUsage({
          j,
          defaultPropsKeys: Object.keys(defaultPropsMap),
          scope: functionScope!,
        });

        // 5. Update the component TS type definition so we make sure the default props are optional
        //  (not needed for Javascript files)
        if (componentPropsTypescriptType) {
          updateComponentTypes({
            j,
            root,
            typeName: componentPropsTypescriptType,
            destructuredKeys: Object.keys(defaultPropsMap),
          });
        }

        // 6. Remove the defaultProps assignment from the component
        j(path).remove();
      }
    });

  // Do not return anything if no changes were applied
  // so we don't rewrite the file
  if (originalSource === root.toSource()) {
    return null;
  }

  if (!options.dry) {
    // Format output code with prettier
    const prettierConfig = await prettier.resolveConfig(file.path);
    return prettier.format(root.toSource(), prettierConfig!);
  } else {
    return null;
  }
}

export default reactDefaultPropsMigration;
