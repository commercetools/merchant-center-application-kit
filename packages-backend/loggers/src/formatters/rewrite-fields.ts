import cloneDeep from 'lodash/cloneDeep';
import getIn from 'lodash/get';
import setIn from 'lodash/set';
import unsetIn from 'lodash/unset';
import { format } from 'logform';
import type { TransformableInfo } from 'logform';

type TRewriteField = {
  from: string;
  to: string;
  replaceValue?: (value: unknown) => unknown;
  preserveFromField?: boolean;
};
type TRewriteFieldsFormatterOption = {
  fields: TRewriteField[];
};

function rewriteField(info: TransformableInfo, field: TRewriteField) {
  const fromFieldValue = getIn(info, field.from);
  const preserveFromField = field.preserveFromField ?? false;

  if (fromFieldValue) {
    if (!preserveFromField) {
      unsetIn(info, field.from);
    }

    setIn(
      info,
      field.to,
      field.replaceValue ? field.replaceValue(fromFieldValue) : fromFieldValue
    );
  }
}

function rewriteFieldsFormatter(options: TRewriteFieldsFormatterOption) {
  return format((info) => {
    const clone = cloneDeep(info);
    options.fields.forEach((field) => {
      rewriteField(clone, field);
    });
    return clone;
  })(options);
}

export default rewriteFieldsFormatter;
