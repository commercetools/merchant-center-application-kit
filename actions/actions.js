export function get(payload) {
  return { type: 'SDK', payload: { method: 'GET', ...payload } };
}

// contrary to the other methods this does not bear the exact name of the HTTP-verb
// because `delete` is a reserved keyword in ECMAScript
export function del(payload) {
  return { type: 'SDK', payload: { method: 'DELETE', ...payload } };
}

// TODO improve this to support passing payload to the update method
export function post(payload) {
  return { type: 'SDK', payload: { method: 'POST', ...payload } };
}
