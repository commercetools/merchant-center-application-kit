import type { TransformableInfo } from 'logform';

import { format } from 'logform';
import getIn from 'lodash/get';
import setIn from 'lodash/set';
import unsetIn from 'lodash/unset';

type TRewriteField<FieldValue> = {
  from: string;
  to: string;
  replaceValue?: (value: FieldValue) => unknown;
};
type TRewriteFieldsFormatterOption<FieldValue> = {
  fields: TRewriteField<FieldValue>[];
};

function rewriteField<FieldValue>(
  info: TransformableInfo,
  field: TRewriteField<FieldValue>
) {
  const val: FieldValue | undefined = getIn(info, field.from);
  if (val) {
    unsetIn(info, field.from);
    setIn(info, field.to, field.replaceValue ? field.replaceValue(val) : val);
  }
}

function rewriteFieldsFormatter<FieldValue>(
  options: TRewriteFieldsFormatterOption<FieldValue>
) {
  return format((info) => {
    options.fields.forEach((field) => {
      rewriteField(info, field);
    });
    return info;
  })(options);
}

export default rewriteFieldsFormatter;
