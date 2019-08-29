import {
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/experimental-utils';
import { createRule } from '../utils';

interface ExtendedExpression extends TSESTree.CallExpression {
  callee: TSESTree.MemberExpression | TSESTree.Identifier;
}

function isIdentifier(
  node: ExtendedExpression['callee']
): node is TSESTree.Identifier {
  return node.type === AST_NODE_TYPES.Identifier;
}

function isMemberExpression(
  node: ExtendedExpression['callee']
): node is TSESTree.MemberExpression {
  return node.type === AST_NODE_TYPES.MemberExpression;
}

function isUsingWrongQueries(node: TSESTree.Identifier) {
  return node.name.startsWith('getBy') || node.name.startsWith('getAllBy');
}

// https://github.com/microsoft/TypeScript/issues/16069#issuecomment-369374214
function isNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return input != null;
}

function mapNodesForWrongGetByQuery(node: TSESTree.CallExpression) {
  const nodeArguments = node.arguments as ExtendedExpression[];
  return nodeArguments
    .map(arg => {
      if (!arg.callee) {
        return null;
      }
      // Example: `expect(rendered.getBy*)`
      if (isMemberExpression(arg.callee)) {
        const node = arg.callee.property as ExtendedExpression['callee'];
        if (isIdentifier(node) && isUsingWrongQueries(node)) {
          return node;
        }
        return null;
      }

      // Example: `expect(getBy*)`
      if (isIdentifier(arg.callee) && isUsingWrongQueries(arg.callee)) {
        return arg.callee;
      }

      return null;
    })
    .filter(isNotNullOrUndefined);
}

function hasExpectWithWrongGetByQuery(node: TSESTree.CallExpression) {
  if (
    node.callee &&
    node.callee.type === AST_NODE_TYPES.Identifier &&
    node.callee.name === 'expect' &&
    node.arguments
  ) {
    const nodesGetBy = mapNodesForWrongGetByQuery(node);
    return nodesGetBy.length > 0;
  }
  return false;
}

export default createRule({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow using getBy* queries in expect calls',
      recommended: 'error',
    },
    messages: {
      expectQueryBy:
        'Using `expect(getBy*)` is not recommended, use `expect(queryBy*)` instead.',
    },
    schema: [],
    type: 'suggestion',
    fixable: 'code',
  },
  defaultOptions: [],
  create: context => ({
    CallExpression(node) {
      if (hasExpectWithWrongGetByQuery(node)) {
        const nodesGetBy = mapNodesForWrongGetByQuery(node);
        context.report({
          node: node.callee,
          messageId: 'expectQueryBy',
          fix(fixer) {
            if (nodesGetBy[0].name.startsWith('getBy')) {
              return fixer.replaceText(
                nodesGetBy[0],
                nodesGetBy[0].name.replace(/^(getBy)(.*)$/, 'queryBy$2')
              );
            }
            if (nodesGetBy[0].name.startsWith('getAllBy')) {
              return fixer.replaceText(
                nodesGetBy[0],
                nodesGetBy[0].name.replace(/^(getAllBy)(.*)$/, 'queryAllBy$2')
              );
            }
            return fixer.replaceText(nodesGetBy[0], nodesGetBy[0].name);
          },
        });
      }
    },
  }),
});
