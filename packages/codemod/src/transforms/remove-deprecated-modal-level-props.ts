import type { API, ASTPath, FileInfo, JSXOpeningElement } from 'jscodeshift';
import type { TRunnerOptions } from '../types';

const componentNamesWithDeprecatedZIndexProps = [
  'InfoModalPage',
  'FormModalPage',
  'CustomFormModalPage',
  'TabularModalPage',
];
const deprecatedPropsToBeRemoved = ['level', 'baseZIndex'];

function removeDeprecatedModalLevelProps(
  file: FileInfo,
  api: API,
  options: TRunnerOptions
) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasModifications = false;

  function removeDepreactedPropsFromComponent(
    path: ASTPath<JSXOpeningElement>
  ) {
    const node = path.node;

    if (
      node.name.type === 'JSXIdentifier' &&
      componentNamesWithDeprecatedZIndexProps.includes(node.name.name)
    ) {
      if (options.dry) {
        api.stats(file.path);
      } else {
        node.attributes =
          node.attributes?.filter((attribute) => {
            if (
              attribute.type === 'JSXAttribute' &&
              attribute.name.type === 'JSXIdentifier'
            ) {
              const hasDeprecatedAttribute =
                deprecatedPropsToBeRemoved.includes(attribute.name.name);
              hasModifications = true;
              return !hasDeprecatedAttribute;
            }
            return true;
          }) ?? [];
      }
    }
  }

  root.find(j.JSXOpeningElement).forEach(removeDepreactedPropsFromComponent);

  return hasModifications ? root.toSource(options) : null;
}

export default removeDeprecatedModalLevelProps;
