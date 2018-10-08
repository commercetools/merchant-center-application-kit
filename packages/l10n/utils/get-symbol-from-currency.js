// given a currenyCode and a list of currencies with the following shape
// [{ label, symbol }], we return the symbol.

const getSymbolFromCurrency = (currencyCode, currencies) => {
  if (currencies[currencyCode] && currencies[currencyCode].symbol) {
    return currencies[currencyCode].symbol;
  }
  return '';
};

export default getSymbolFromCurrency;
