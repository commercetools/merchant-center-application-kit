---
'@commercetools-frontend/l10n': minor
---

In order to support both versions of the same currency with different fraction digits, these changes:

- Extend generated currency locale data to include fractionDigits (decimal precision) for each currency, sourced from currencymap.json.
- Introduce ZERO_FRACTION_DIGITS_CURRENCY_MAPPING to define which base currencies should have an explicit 0-fraction-digit variant.
