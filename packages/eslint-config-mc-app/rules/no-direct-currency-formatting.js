const path = require('path');

const unwrapExpression = (node) => {
  if (!node) return node;

  if (node.type === 'TSAsExpression' || node.type === 'TypeCastExpression') {
    return unwrapExpression(node.expression);
  }

  return node;
};

const isStringLiteralCurrency = (node) =>
  node &&
  node.type === 'Literal' &&
  typeof node.value === 'string' &&
  node.value === 'currency';

const getPropertyKeyName = (propertyNode) => {
  if (!propertyNode || propertyNode.type !== 'Property') return undefined;

  if (!propertyNode.computed && propertyNode.key.type === 'Identifier')
    return propertyNode.key.name;
  if (propertyNode.key.type === 'Literal') return propertyNode.key.value;

  return undefined;
};

const findVariableByName = (scope, name) => {
  let currentScope = scope;

  while (currentScope) {
    const variable = currentScope.variables.find(
      (entry) => entry.name === name
    );
    if (variable) return variable;
    currentScope = currentScope.upper;
  }

  return undefined;
};

const resolveNodeFromIdentifier = (
  node,
  scope,
  seenIdentifiers = new Set()
) => {
  const unwrappedNode = unwrapExpression(node);
  if (!unwrappedNode || unwrappedNode.type !== 'Identifier')
    return unwrappedNode;

  if (seenIdentifiers.has(unwrappedNode.name)) return unwrappedNode;
  seenIdentifiers.add(unwrappedNode.name);

  const variable = findVariableByName(scope, unwrappedNode.name);
  if (!variable || variable.defs.length === 0) return unwrappedNode;

  const definitionNode = variable.defs[0].node;
  if (
    definitionNode &&
    definitionNode.type === 'VariableDeclarator' &&
    definitionNode.init
  ) {
    return resolveNodeFromIdentifier(
      definitionNode.init,
      scope,
      seenIdentifiers
    );
  }

  return unwrappedNode;
};

// Detects any `currency` property in an options object, static or dynamic.
// Intl.NumberFormat validates the `currency` option regardless of `style`, so
// any direct usage — even with a hardcoded value — must go through the wrapper.
const hasCurrencyOption = (node, scope, seenObjectNodes = new Set()) => {
  const resolvedNode = resolveNodeFromIdentifier(node, scope);
  if (!resolvedNode || resolvedNode.type !== 'ObjectExpression') return false;

  if (seenObjectNodes.has(resolvedNode)) return false;
  seenObjectNodes.add(resolvedNode);

  return resolvedNode.properties.some((propertyNode) => {
    if (propertyNode.type === 'SpreadElement') {
      return hasCurrencyOption(propertyNode.argument, scope, seenObjectNodes);
    }

    return getPropertyKeyName(propertyNode) === 'currency';
  });
};

// Detects options that resolve to `style: 'currency'`, even via identifiers/spreads.
const isCurrencyStyleOption = (node, scope, seenObjectNodes = new Set()) => {
  const resolvedNode = resolveNodeFromIdentifier(node, scope);
  if (!resolvedNode || resolvedNode.type !== 'ObjectExpression') return false;

  if (seenObjectNodes.has(resolvedNode)) return false;
  seenObjectNodes.add(resolvedNode);

  return resolvedNode.properties.some((propertyNode) => {
    if (propertyNode.type === 'SpreadElement') {
      return isCurrencyStyleOption(
        propertyNode.argument,
        scope,
        seenObjectNodes
      );
    }

    if (getPropertyKeyName(propertyNode) !== 'style') {
      return false;
    }

    const resolvedStyleValue = resolveNodeFromIdentifier(
      propertyNode.value,
      scope
    );
    return isStringLiteralCurrency(unwrapExpression(resolvedStyleValue));
  });
};

// Rule allowlist for wrapper files that are expected to format currencies directly.
const isPathAllowed = (filename, allowedWrapperPaths) => {
  const normalizePathSeparators = (value) => value.replace(/\\/g, '/');
  const normalizedFilename = normalizePathSeparators(
    filename.split(path.sep).join('/')
  );

  return allowedWrapperPaths.some((allowedPath) => {
    const normalizedAllowedPath = normalizePathSeparators(
      allowedPath.split(path.sep).join('/')
    );
    return normalizedFilename.endsWith(normalizedAllowedPath);
  });
};

/** ESLint 9+: use SourceCode#getScope(node); legacy context.getScope() was removed. */
function getScopeForNode(context, node) {
  const sourceCode = context.sourceCode ?? context.getSourceCode();
  return sourceCode.getScope(node);
}

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow direct currency formatting and enforce shared wrapper usage.',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedWrapperPaths: {
            type: 'array',
            items: {
              type: 'string',
            },
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noDirectCurrencyFormatting:
        'Use the shared currency formatting wrapper instead of direct currency formatting.',
    },
  },
  create: function (context) {
    const options = context.options[0] || {};
    const allowedWrapperPaths = options.allowedWrapperPaths || [];
    const filename = context.getFilename();

    // Skip checks for explicitly allowed wrapper implementations.
    if (isPathAllowed(filename, allowedWrapperPaths)) return {};

    // Track local names of formatting functions from destructuring or aliasing.
    // Covers: const { formatNumber } = useIntl()
    //         const { formatCurrency } = intl
    //         function Foo({ formatNumber }) { ... }
    //         const fmt = intl.formatNumber
    const destructuredFormattingFunctionNames = new Set();
    const formattingFunctionNames = new Set(['formatNumber', 'formatCurrency']);
    const formattedNumberComponentNames = new Set();
    const reactIntlNamespaceImports = new Set();

    const collectFormatNumberFromObjectPattern = (objectPatternNode) => {
      if (!objectPatternNode || objectPatternNode.type !== 'ObjectPattern')
        return;

      objectPatternNode.properties.forEach((prop) => {
        if (prop.type !== 'Property') return;
        const propertyKeyName = getPropertyKeyName(prop);
        if (!formattingFunctionNames.has(propertyKeyName)) return;
        if (prop.value.type !== 'Identifier') return;
        destructuredFormattingFunctionNames.add(prop.value.name);
      });
    };

    const isFormatNumberMemberExpression = (node) => {
      if (!node || node.type !== 'MemberExpression') return false;

      if (!node.computed)
        return (
          node.property.type === 'Identifier' &&
          formattingFunctionNames.has(node.property.name)
        );

      return (
        node.property.type === 'Literal' &&
        formattingFunctionNames.has(node.property.value)
      );
    };

    return {
      ImportDeclaration(node) {
        if (!node.source || node.source.value !== 'react-intl') return;

        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            if (
              specifier.imported &&
              specifier.imported.type === 'Identifier' &&
              specifier.imported.name === 'FormattedNumber'
            ) {
              formattedNumberComponentNames.add(specifier.local.name);
            }
          }

          if (
            specifier.type === 'ImportNamespaceSpecifier' &&
            specifier.local &&
            specifier.local.type === 'Identifier'
          ) {
            reactIntlNamespaceImports.add(specifier.local.name);
          }
        });
      },

      // function Foo({ formatNumber }) { ... }
      FunctionDeclaration(node) {
        node.params.forEach(collectFormatNumberFromObjectPattern);
      },
      FunctionExpression(node) {
        node.params.forEach(collectFormatNumberFromObjectPattern);
      },
      ArrowFunctionExpression(node) {
        node.params.forEach(collectFormatNumberFromObjectPattern);
      },

      // const { formatNumber } = useIntl() / const { formatNumber } = intl
      // const fmt = intl.formatNumber
      VariableDeclarator(node) {
        if (node.id && node.id.type === 'ObjectPattern' && node.init) {
          collectFormatNumberFromObjectPattern(node.id);
        }

        // const { FormattedNumber } = require('react-intl')
        if (
          node.id &&
          node.id.type === 'ObjectPattern' &&
          node.init &&
          node.init.type === 'CallExpression' &&
          node.init.callee.type === 'Identifier' &&
          node.init.callee.name === 'require' &&
          node.init.arguments &&
          node.init.arguments[0] &&
          node.init.arguments[0].type === 'Literal' &&
          node.init.arguments[0].value === 'react-intl'
        ) {
          node.id.properties.forEach((propertyNode) => {
            if (propertyNode.type !== 'Property') return;
            if (getPropertyKeyName(propertyNode) !== 'FormattedNumber') return;
            if (propertyNode.value.type !== 'Identifier') return;
            formattedNumberComponentNames.add(propertyNode.value.name);
          });
        }

        if (
          node.id &&
          node.id.type === 'Identifier' &&
          isFormatNumberMemberExpression(unwrapExpression(node.init))
        ) {
          destructuredFormattingFunctionNames.add(node.id.name);
        }
      },

      JSXOpeningElement(node) {
        if (!node.name) return;

        // <FormattedNumber .../> with named or aliased import.
        if (
          node.name.type === 'JSXIdentifier' &&
          formattedNumberComponentNames.has(node.name.name)
        ) {
          context.report({ node, messageId: 'noDirectCurrencyFormatting' });
          return;
        }

        // <ReactIntl.FormattedNumber .../> with namespace import.
        if (
          node.name.type === 'JSXMemberExpression' &&
          node.name.object &&
          node.name.object.type === 'JSXIdentifier' &&
          reactIntlNamespaceImports.has(node.name.object.name) &&
          node.name.property &&
          node.name.property.type === 'JSXIdentifier' &&
          node.name.property.name === 'FormattedNumber'
        ) {
          context.report({ node, messageId: 'noDirectCurrencyFormatting' });
        }
      },

      CallExpression(node) {
        const scope = getScopeForNode(context, node);

        const isCurrencyFormattingArg = (arg) =>
          isCurrencyStyleOption(arg, scope) || hasCurrencyOption(arg, scope);
        const hasCurrencyFormattingArgs =
          isCurrencyFormattingArg(node.arguments[1]) ||
          isCurrencyFormattingArg(node.arguments[0]);

        // Disallow member-expression calls: intl.formatNumber(..., { style: 'currency' })
        // or intl.formatNumber(..., { currency: dynamicCode })
        if (
          node.callee.type === 'MemberExpression' &&
          isFormatNumberMemberExpression(node.callee) &&
          hasCurrencyFormattingArgs
        ) {
          context.report({ node, messageId: 'noDirectCurrencyFormatting' });
          return;
        }

        // Disallow destructured calls: const { formatNumber } = useIntl(); formatNumber(...)
        if (
          node.callee.type === 'Identifier' &&
          destructuredFormattingFunctionNames.has(node.callee.name) &&
          hasCurrencyFormattingArgs
        ) {
          context.report({ node, messageId: 'noDirectCurrencyFormatting' });
        }
      },

      NewExpression(node) {
        const scope = getScopeForNode(context, node);
        // Disallow direct native Intl currency formatting constructors,
        // with style:'currency' or a dynamic currency option.
        if (
          node.callee.type === 'MemberExpression' &&
          !node.callee.computed &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'Intl' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'NumberFormat' &&
          (isCurrencyStyleOption(node.arguments[1], scope) ||
            hasCurrencyOption(node.arguments[1], scope))
        ) {
          context.report({ node, messageId: 'noDirectCurrencyFormatting' });
        }
      },
    };
  },
};
