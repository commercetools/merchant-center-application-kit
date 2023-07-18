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
  unsetFromField?: boolean;
};
type TRewriteFieldsFormatterOption = {
  fields: TRewriteField[];
};

const defaultRewriteField: Partial<TRewriteField> = {
  unsetFromField: true,
};
function rewriteField(info: TransformableInfo, field: TRewriteField) {
  const mergedRewriteField = { ...defaultRewriteField, ...field };
  const fromFieldValue = getIn(info, mergedRewriteField.from);

  if (fromFieldValue) {
    if (mergedRewriteField.unsetFromField) {
      unsetIn(info, mergedRewriteField.from);
    }

    setIn(
      info,
      mergedRewriteField.to,
      mergedRewriteField.replaceValue
        ? mergedRewriteField.replaceValue(fromFieldValue)
        : fromFieldValue
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
