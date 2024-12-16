import {
  API,
  AssignmentExpression,
  ASTPath,
  CallExpression,
  FileInfo,
  JSCodeshift,
  MemberExpression,
  ObjectExpression,
  TSTypeAliasDeclaration,
} from 'jscodeshift';
import prettier from 'prettier';
import { TRunnerOptions } from '../types';

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
  scope: JSCodeshift;
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
  root: JSCodeshift;
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

function extractDefaultPropsFromNode(
  defaultPropsNode: ObjectExpression
): Record<string, unknown> {
  return defaultPropsNode.properties.reduce((acc, prop) => {
    if (
      prop.type === 'ObjectProperty' &&
      'name' in prop.key &&
      'value' in prop.value
    ) {
      return {
        ...acc,
        [prop.key.name as string]: prop.value.value,
      };
    }
    return acc;
  }, {} as Record<string, unknown>);
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
        let defaultPropsMap: Record<string, unknown> = {};

        // Default props can be defined inline or as a reference to another object
        //  INLINE -- MyComponent.defaultProps: { prop1: 'value1', prop2: 'value2' }
        //  REFERENCE -- MyComponent.defaultProps: defaultProps
        if (defaultPropsNode.type === 'Identifier') {
          //  REFERENCE -- MyComponent.defaultProps: defaultProps
          // 1. Look for the identifier declaration
          const defaultPropsDeclarations = root.find(j.VariableDeclarator, {
            id: { type: 'Identifier', name: defaultPropsNode.name },
          });

          if (defaultPropsDeclarations.size() === 1) {
            // 2. Extract default props keys/values
            defaultPropsMap = extractDefaultPropsFromNode(
              defaultPropsDeclarations.nodes()[0].init as ObjectExpression
            );
            // 3. Remove the identifier declaration
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
        }

        // Update the component function signature
        //   function MyComnponent(props) { ... }
        const functionComponentDeclaration = root.find(j.FunctionDeclaration, {
          id: { name: componentName },
        });
        console.log('///---> ', {
          componentName,
          functionComponentDeclaration: functionComponentDeclaration.size(),
        });
        if (functionComponentDeclaration.length === 1) {
          console.log(
            'functionComponentDeclaration:',
            j(functionComponentDeclaration.nodes()[0]).toSource()
          );
        } else {
          //   const MyComnponent = (props) => { ... }
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
            // init: ArrowFunctionExpression
            //   params: ObjectPattern
            //     properties: Array<ObjectProperty>
            //       type: ObjectProperty
            //       type: RestElement
            //   params: Identifier
            const functionFirstParamNode =
              variableComponentDeclaration.nodes()[0].declarations[0];

            //   const MyComnponent = ({ prop1, ...props }) => { ... }
            if (
              functionFirstParamNode.type === 'VariableDeclarator' &&
              functionFirstParamNode.init?.type === 'ArrowFunctionExpression'
            ) {
              switch (functionFirstParamNode.init.params[0].type) {
                //   const MyComnponent = ({ prop1, ...props }) => { ... }
                case 'ObjectPattern':
                  const functionFirstParam =
                    functionFirstParamNode.init.params[0];
                  // TODO: Add the default props to the already existing destructured object
                  break;
                //   const MyComnponent = (props) => { ... }
                case 'Identifier':
                  const refactoredParameter = j.objectPattern([
                    ...Object.entries(defaultPropsMap).map(([key, value]) => {
                      const prop = j.objectProperty(
                        j.identifier(key),
                        j.assignmentPattern(
                          j.identifier(key),
                          j.literal(value as string)
                        )
                      );
                      prop.shorthand = true;
                      return prop;
                    }),
                    j.spreadProperty(j.identifier('props')),
                  ]);

                  // Make sure the refactored parameter has the same type annotation
                  // as the original one
                  refactoredParameter.typeAnnotation =
                    functionFirstParamNode.init.params[0].typeAnnotation;
                  // Replace the original simple parameter with the refactored (destructured object) one
                  functionFirstParamNode.init.params[0] = refactoredParameter;
                  break;
                default:
                  console.warn(
                    `[WARNING]: Could not parse component function first parameter "${componentName}"`
                  );
              }
            } else {
              console.warn(
                `[WARNING]: Could parse component function first parameter "${componentName}"`
              );
            }
          }
        }

        // Remove the defaultProps assignment
        j(path).remove();

        console.log('   //---> defaultProps:', defaultPropsMap);
      }
      // const foo = j(path);
      // console.log('   //---> defaultProps:', foo.toSource());
    });

  // Do not return anything if no changes were applied
  // so we don't rewrite the file
  if (originalSource === root.toSource()) {
    return null;
  }

  if (!options.dry) {
    // Format output code with prettier
    // return null;
    const prettierConfig = await prettier.resolveConfig(file.path);
    return prettier.format(root.toSource(), prettierConfig!);
  } else {
    return null;
  }
}

export default reactDefaultPropsMigration;
