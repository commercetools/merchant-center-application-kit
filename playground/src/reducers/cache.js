import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import { normalize, schema } from 'normalizr';
import createReducer from '../utils/create-reducer';

const transitionSchema = new schema.Entity(
  'transitions',
  {},
  {
    processStrategy: entity => entity.obj || entity,
  }
);
const transitionListSchema = new schema.Array(transitionSchema);
const stateMachineSchema = new schema.Entity('stateMachine', {
  transitions: transitionListSchema,
});
const stateMachinesSchema = new schema.Array(stateMachineSchema);

export const normalizers = {
  stateMachine: data => normalize(data, stateMachineSchema),
  stateMachines: data => normalize(data, stateMachinesSchema),
};

export const actionTypes = {
  SET_STATE_MACHINE: 'SET_STATE_MACHINE',
  UNSET_STATE_MACHINE: 'UNSET_STATE_MACHINE',
  SET_STATE_MACHINES: 'SET_STATE_MACHINES',
};

export const reducerKeys = {
  stateMachines: 'stateMachines',
};

// Each object is a key -> value map, with id as key
const initialState = {};

// TODO all of this should happen in a middlware automatically
const actionHandlers = {
  [actionTypes.SET_STATE_MACHINE]: (state, action) =>
    mergeEntity(state, normalizers.stateMachine(action.payload)),
  [actionTypes.UNSET_STATE_MACHINE]: createRemoveEntity(
    reducerKeys.stateMachines
  ),
  [actionTypes.SET_STATE_MACHINES]: (state, action) =>
    mergeEntities(state, normalizers.stateMachines(action.payload)),
};

export default createReducer(initialState, actionHandlers);

function createRemoveEntity(entityKey) {
  return (state, action) => {
    const entityId = action.payload.id;
    return removeEntity(state, entityKey, entityId);
  };
}

function mergeEntities(state, normalizedPayload) {
  return merge(state, normalizedPayload.entities);
}

function mergeEntity(state, normalizedPayload) {
  return merge(state, normalizedPayload.entities);
}

function removeEntity(state, entityKey, entityId) {
  const entities = state[entityKey];
  return {
    ...state,
    [entityKey]: omit(entities, entityId),
  };
}

/*
 * Merges entities into state.
 * Overwrites the items (e.g. 'sm-1') of each entity.
 *
 * entities: {
 *   stateMachines: { 'sm-1': { .. }, 'sm-2': { .. } },
 * }
 *
 * state : { stateMachines: { .. }, .. }
 */
export function merge(state, entities = {}) {
  const newState = { ...state };
  // TODO normalizr refers to items as entities, so we need to rename things
  // go through each entity type (productDiscount) and merge the items
  Object.keys(entities).forEach(entityKey => {
    // Filter out updates that contain only an id.
    // This happens when the normalization encounters a non-expanded reference
    // TODO remove this workaround once we have proper merging of items
    const entitiesWithData = omitBy(entities[entityKey], item => {
      const keys = Object.keys(item);
      return keys.length === 1 && keys[0] === 'id';
    });
    // dumb merge by overwrite
    newState[entityKey] = { ...newState[entityKey], ...entitiesWithData };
  });
  return newState;
}

export function selectStateMachinesFromCache(state) {
  return state.cache.stateMachine;
}

export function selectStateMachineById(state, stateMachineId) {
  if (!stateMachineId)
    throw new Error(
      'Required `stateMachineId` when selecting a state machine.'
    );
  return state.cache.stateMachines[stateMachineId];
}
