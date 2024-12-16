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
          const defaultPropsDeclaration = root
            .find(j.VariableDeclarator, {
              id: { type: 'Identifier', name: defaultPropsNode.name },
            })
            .nodes()[0];

          if (defaultPropsDeclaration) {
            // 2. Extract default props keys/values
            defaultPropsMap = extractDefaultPropsFromNode(
              defaultPropsDeclaration.init as ObjectExpression
            );
            // 3. Remove the identifier declaration
            // defaultPropsDeclaration.remove();
            j(defaultPropsDeclaration).remove();
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
    const prettierConfig = await prettier.resolveConfig(file.path);
    return prettier.format(root.toSource(), prettierConfig!);
  } else {
    return null;
  }
}

export default reactDefaultPropsMigration;
