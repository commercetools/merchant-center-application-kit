export default function createReducer(initialState, actionHandlers) {
  return (state, action) => {
    let newState = state;
    if (!newState) newState = initialState;

    if (!action || !action.type) return newState;

    const reduce = actionHandlers[action.type];
    if (!reduce) return newState;

    // In case reducer ignored action, avoid creating new object
    const newSubstate = reduce(newState, action);
    if (newSubstate) return { ...newState, ...newSubstate };
    return newState;
  };
}
