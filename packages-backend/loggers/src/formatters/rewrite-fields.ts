import type { TransformableInfo } from 'logform';

import { format } from 'logform';
import getIn from 'lodash/get';
import setIn from 'lodash/set';
import unsetIn from 'lodash/unset';

type TRewriteField = {
  from: string;
  to: string;
  replaceValue?: (value: string) => unknown;
};
type TRewriteFieldsFormatterOption = {
  fields: TRewriteField[];
};

function rewriteField(
  info: TransformableInfo,
  jsonPath: string,
  newJsonPath: string,
  replaceValue?: (value: string) => unknown
) {
  const val: string | undefined = getIn(info, jsonPath);
  if (val) {
    unsetIn(info, jsonPath);
    setIn(info, newJsonPath, replaceValue ? replaceValue(val) : val);
  }
}

const rewriteFieldsFormatter = format(
  (info, options: TRewriteFieldsFormatterOption) => {
    options.fields.forEach((field) => {
      rewriteField(info, field.from, field.to, field.replaceValue);
    });
    return info;
  }
);

export default rewriteFieldsFormatter;
