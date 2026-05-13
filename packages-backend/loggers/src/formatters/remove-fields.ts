import cloneDeep from 'lodash/cloneDeep';
import unset from 'lodash/unset';
import { format } from 'logform';
import type { TransformableInfo } from 'logform';

function removeFieldsFormatter(fields: string[]) {
  return format((info: TransformableInfo) => {
    const clone = cloneDeep(info);
    fields.forEach((field) => {
      unset(clone, field);
    });
    return clone;
  })(fields);
}

export default removeFieldsFormatter;
