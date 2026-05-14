import cloneDeep from 'lodash/cloneDeep';
import has from 'lodash/has';
import set from 'lodash/set';
import { format } from 'logform';
import type { TransformableInfo } from 'logform';

const REDACTED = '[REDACTED]';

type TRedactFieldsFormatterOption = {
  fields: string[];
};

function redactFieldsFormatter(options: TRedactFieldsFormatterOption) {
  return format((info: TransformableInfo) => {
    const clone = cloneDeep(info);
    options.fields.forEach((field) => {
      if (has(clone, field)) {
        set(clone, field, REDACTED);
      }
    });
    return clone;
  })(options);
}

export default redactFieldsFormatter;
