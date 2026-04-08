/**
 * @jest-environment node
 */
const { RuleTester } = require('eslint');
const rule = require('./no-direct-currency-formatting');

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
});

const error = { messageId: 'noDirectCurrencyFormatting' };

ruleTester.run('no-direct-currency-formatting', rule, {
  valid: [
    // ─── intl.formatNumber — non-currency usage ───
    {
      code: `intl.formatNumber(42, { style: 'decimal' })`,
    },
    {
      code: `intl.formatNumber(0.5, { style: 'percent' })`,
    },
    {
      code: `intl.formatNumber(42)`,
    },
    {
      code: `intl.formatNumber(42, {})`,
    },

    // ─── destructured formatNumber — non-currency ───
    {
      code: `
        const { formatNumber } = useIntl();
        formatNumber(42, { style: 'decimal' });
      `,
    },
    {
      code: `
        const { formatNumber } = useIntl();
        formatNumber(42);
      `,
    },
    // ─── Intl.NumberFormat — non-currency ───
    {
      code: `new Intl.NumberFormat('en', { style: 'decimal' })`,
    },
    {
      code: `new Intl.NumberFormat('en')`,
    },
    {
      code: `new Intl.NumberFormat('en', { minimumFractionDigits: 2 })`,
    },
    // ─── FormattedNumber — non-currency usage ───
    // BUG: These currently fail because the rule flags ALL <FormattedNumber />
    // usage from react-intl, regardless of whether currency props are present.
    // Non-currency usage (percent, decimal, no style) should be allowed.
    // Once the rule's JSXOpeningElement handler is fixed to inspect props,
    // these tests will pass.
    {
      code: `
        import { FormattedNumber } from 'react-intl';
        const x = <FormattedNumber style="percent" value={0.5} />;
      `,
    },
    {
      code: `
        import { FormattedNumber } from 'react-intl';
        const x = <FormattedNumber style="decimal" value={42} />;
      `,
    },
    {
      code: `
        import { FormattedNumber } from 'react-intl';
        const x = <FormattedNumber value={42} />;
      `,
    },

    // ─── Unrelated components with "FormattedNumber" name (not from react-intl) ───
    {
      code: `const x = <FormattedNumber value={42} />;`,
    },
    {
      code: `
        import { FormattedNumber } from './my-components';
        const x = <FormattedNumber value={42} />;
      `,
    },
    // ─── Unrelated function names ───
    {
      code: `intl.formatDate(new Date())`,
    },
    {
      code: `intl.formatMessage({ id: 'hello' })`,
    },
    // ─── Allowlisted wrapper path ───
    {
      code: `intl.formatNumber(42, { style: 'currency', currency: 'EUR' })`,
      options: [{ allowedWrapperPaths: ['src/utils/money.js'] }],
      filename: '/project/src/utils/money.js',
    },
    {
      code: `
        import { FormattedNumber } from 'react-intl';
        const x = <FormattedNumber style="currency" currency="EUR" />;
      `,
      options: [{ allowedWrapperPaths: ['src/utils/money.js'] }],
      filename: '/project/src/utils/money.js',
    },
    // ─── Allowlisted wrapper path — Windows-style separators ───
    {
      code: `intl.formatNumber(42, { style: 'currency', currency: 'EUR' })`,
      options: [{ allowedWrapperPaths: ['src/utils/money.js'] }],
      filename: 'C:\\project\\src\\utils\\money.js',
    },

    // ─── formatNumber on unrelated objects (non-currency) ───
    {
      code: `myLib.formatNumber(42, { style: 'decimal' })`,
    },

    // ─── FormattedNumber — non-currency via namespace import ───
    // BUG: Same false-positive as named import — namespace access is also
    // flagged unconditionally without inspecting props.
    {
      code: `
        import * as ReactIntl from 'react-intl';
        const x = <ReactIntl.FormattedNumber style="percent" value={0.5} />;
      `,
    },
    {
      code: `
        import * as ReactIntl from 'react-intl';
        const x = <ReactIntl.FormattedNumber value={42} />;
      `,
    },
  ],

  invalid: [
    // ═══════════════════════════════════════════════════
    // intl.formatNumber with currency
    // ═══════════════════════════════════════════════════
    {
      name: 'intl.formatNumber with style: currency',
      code: `intl.formatNumber(42, { style: 'currency', currency: 'EUR' })`,
      errors: [error],
    },
    {
      name: 'intl.formatNumber with currency option only (no style)',
      code: `intl.formatNumber(42, { currency: 'EUR' })`,
      errors: [error],
    },
    {
      name: 'intl.formatCurrency call',
      code: `intl.formatCurrency(42, { currency: 'EUR' })`,
      errors: [error],
    },
    {
      name: 'intl["formatNumber"] computed member access',
      code: `intl['formatNumber'](42, { style: 'currency', currency: 'EUR' })`,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // Destructured formatNumber
    // ═══════════════════════════════════════════════════
    {
      name: 'destructured formatNumber from useIntl()',
      code: `
        const { formatNumber } = useIntl();
        formatNumber(42, { style: 'currency', currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'destructured formatNumber with currency option only',
      code: `
        const { formatNumber } = useIntl();
        formatNumber(42, { currency: 'USD' });
      `,
      errors: [error],
    },
    {
      name: 'aliased destructured formatNumber',
      code: `
        const { formatNumber: fmt } = useIntl();
        fmt(42, { style: 'currency', currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'formatNumber from function declaration parameter',
      code: `
        function Foo({ formatNumber }) {
          return formatNumber(42, { style: 'currency', currency: 'EUR' });
        }
      `,
      errors: [error],
    },
    {
      name: 'formatNumber from function expression parameter',
      code: `
        const Foo = function({ formatNumber }) {
          return formatNumber(42, { style: 'currency', currency: 'EUR' });
        }
      `,
      errors: [error],
    },
    {
      name: 'formatNumber from arrow function parameter',
      code: `
        const Foo = ({ formatNumber }) => formatNumber(42, { currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'destructured formatCurrency from useIntl()',
      code: `
        const { formatCurrency } = useIntl();
        formatCurrency(42, { currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'assigned from member expression: const fmt = intl.formatNumber',
      code: `
        const fmt = intl.formatNumber;
        fmt(42, { style: 'currency', currency: 'EUR' });
      `,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // Intl.NumberFormat
    // ═══════════════════════════════════════════════════
    {
      name: 'new Intl.NumberFormat with style: currency',
      code: `new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' })`,
      errors: [error],
    },
    {
      name: 'new Intl.NumberFormat with currency option only',
      code: `new Intl.NumberFormat('en', { currency: 'EUR' })`,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // Variable-resolved options
    // ═══════════════════════════════════════════════════
    {
      name: 'options object in variable with style: currency',
      code: `
        const opts = { style: 'currency', currency: 'EUR' };
        intl.formatNumber(42, opts);
      `,
      errors: [error],
    },
    {
      name: 'options with currency in variable',
      code: `
        const opts = { currency: 'USD' };
        intl.formatNumber(42, opts);
      `,
      errors: [error],
    },
    {
      name: 'style value resolved through variable',
      code: `
        const currencyStyle = 'currency';
        intl.formatNumber(42, { style: currencyStyle, currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'Intl.NumberFormat with options in variable',
      code: `
        const opts = { style: 'currency', currency: 'EUR' };
        new Intl.NumberFormat('en', opts);
      `,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // Spread elements
    // ═══════════════════════════════════════════════════
    {
      name: 'currency option via spread',
      code: `
        const base = { currency: 'EUR' };
        intl.formatNumber(42, { ...base });
      `,
      errors: [error],
    },
    {
      name: 'style: currency via spread',
      code: `
        const base = { style: 'currency' };
        intl.formatNumber(42, { ...base, currency: 'EUR' });
      `,
      errors: [error],
    },
    {
      name: 'nested spread: currency buried two levels deep',
      code: `
        const inner = { currency: 'EUR' };
        const outer = { ...inner };
        intl.formatNumber(42, { ...outer });
      `,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // Currency options in first argument
    // ═══════════════════════════════════════════════════
    {
      name: 'currency options passed as first argument',
      code: `intl.formatNumber({ style: 'currency', currency: 'EUR' })`,
      errors: [error],
    },

    // ═══════════════════════════════════════════════════
    // <FormattedNumber /> — currency usage
    // ═══════════════════════════════════════════════════
    {
      name: 'FormattedNumber with style="currency" (named import)',
      code: `
        import { FormattedNumber } from 'react-intl';
        const x = <FormattedNumber style="currency" currency="EUR" value={42} />;
      `,
      errors: [error],
    },
    {
      name: 'FormattedNumber aliased import',
      code: `
        import { FormattedNumber as FN } from 'react-intl';
        const x = <FN style="currency" currency="EUR" value={42} />;
      `,
      errors: [error],
    },
    {
      name: 'FormattedNumber via namespace import',
      code: `
        import * as ReactIntl from 'react-intl';
        const x = <ReactIntl.FormattedNumber style="currency" currency="EUR" value={42} />;
      `,
      errors: [error],
    },
    {
      name: 'FormattedNumber via require destructuring',
      code: `
        const { FormattedNumber } = require('react-intl');
        const x = <FormattedNumber style="currency" currency="EUR" value={42} />;
      `,
      errors: [error],
    },
  ],
});
