import { actionTypes } from '../../reducers/cache';

export const setStateMachines = (payload) => ({
  type: actionTypes.SET_STATE_MACHINES,
  payload,
});
