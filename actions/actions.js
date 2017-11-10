export function fetch(payload) {
  return { type: 'SDK', payload: { method: 'fetch', ...payload } };
}

// TODO improve this to support passing payload to the update method
export function update(payload) {
  return { type: 'SDK', payload: { method: 'update', ...payload } };
}
