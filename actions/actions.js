export function get(payload) {
  return { type: 'SDK', payload: { method: 'GET', ...payload } };
}

// TODO improve this to support passing payload to the update method
export function post(payload) {
  return { type: 'SDK', payload: { method: 'POST', ...payload } };
}
