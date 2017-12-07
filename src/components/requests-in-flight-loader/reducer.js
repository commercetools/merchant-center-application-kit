import logger from '@commercetools-local/utils/logger';

const excludeFirstOccurrence = (list, item) => {
  const index = list.indexOf(item);
  return [...list.slice(0, index), ...list.slice(index + 1)];
};

export default (requestsInFlight, action) => {
  if (!requestsInFlight) return [];

  if (action && action.type === 'SHOW_LOADING')
    return [...requestsInFlight, action.payload];

  if (action && action.type === 'HIDE_LOADING') {
    // may only remove first occurence
    if (!requestsInFlight.includes(action.payload)) {
      logger.warn(
        `Tried to hide "${action.payload}", but it was not progressing!`
      );
      return requestsInFlight;
    }
    return excludeFirstOccurrence(requestsInFlight, action.payload);
  }

  return requestsInFlight;
};
