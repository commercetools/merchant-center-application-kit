export default (state, action) => {
  if (action && action.type === 'ACTIVATE_PLUGIN') {
    return action.payload;
  }
  return state || null;
};
