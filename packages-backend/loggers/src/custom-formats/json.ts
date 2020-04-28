// This file is an exteded version of the `json` formatter so that we
// can rename the `level` field.
import type { TransformableInfo } from 'logform';

import { format } from 'logform';
import { MESSAGE } from 'triple-beam';
import jsonStringify from 'fast-safe-stringify';
import getIn from 'lodash/get';
import setIn from 'lodash/set';
import unsetIn from 'lodash/unset';

/*
 * function replacer (key, value)
 * Handles proper stringification of Buffer output.
 */
function replacer(key: string, value: Buffer | string) {
  if (key === 'queryJsonString') {
    // We need to stringify the value as otherwise Kibana cardinality explodes.
    return JSON.stringify(value);
  }
  return value instanceof Buffer ? value.toString('base64') : value;
}

function replaceField(
  info: TransformableInfo,
  jsonPath: string,
  newJsonPath: string
) {
  const val = getIn(info, jsonPath);
  if (val) {
    unsetIn(info, jsonPath);
    setIn(info, newJsonPath, val);
  }
}

/*
 * function json (info)
 * Returns a new instance of the JSON format that turns a log `info`
 * object into pure JSON. This was previously exposed as { json: true }
 * to transports in `winston < 3.0.0`.
 */
/* eslint-disable no-param-reassign */
const jsonFormatter = format((info, opts = {}) => {
  info.logLevel = info.level;
  delete info.level;

  // Replace / rename fields
  replaceField(info, 'meta.req.query', 'meta.req.queryJsonString');

  info[MESSAGE] = jsonStringify(info, opts.replacer ?? replacer, opts.space);
  return info;
});

export default jsonFormatter;
