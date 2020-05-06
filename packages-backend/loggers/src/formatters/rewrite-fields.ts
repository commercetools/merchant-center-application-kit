import type { TransformableInfo } from 'logform';

import { format } from 'logform';
import getIn from 'lodash/get';
import setIn from 'lodash/set';
import unsetIn from 'lodash/unset';

type TRewriteField = {
  from: string;
  to: string;
  replaceValue?: (value: unknown) => unknown;
};
type TRewriteFieldsFormatterOption = {
  fields: TRewriteField[];
};

function rewriteField(info: TransformableInfo, field: TRewriteField) {
  const val = getIn(info, field.from);
  if (val) {
    unsetIn(info, field.from);
    setIn(info, field.to, field.replaceValue ? field.replaceValue(val) : val);
  }
}

function rewriteFieldsFormatter(options: TRewriteFieldsFormatterOption) {
  return format((info) => {
    options.fields.forEach((field) => {
      rewriteField(info, field);
    });
    return info;
  })(options);
}

export default rewriteFieldsFormatter;
