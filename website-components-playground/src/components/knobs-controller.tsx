import type { ReactNode } from 'react';
import { Formik } from 'formik';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import type { TIntlControllerFunctionOptions } from './intl-controller';

export type TKnob = {
  kind: 'text' | 'text-multi' | 'select';
  name: string;
  label: string;
  initialValue: unknown;
  valueOptions?: {
    value: string;
    label: string;
  }[];
};
type TKnobsControllerFunctionOptions = {
  form: JSX.Element;
  values: Record<string, unknown>;
};
type TKnobsControllerProps = {
  knobs: TKnob[];
  locale: TIntlControllerFunctionOptions['locale'];
  setLocale: TIntlControllerFunctionOptions['setLocale'];
  availableLocaleOptions: TIntlControllerFunctionOptions['availableLocaleOptions'];
  children: (options: TKnobsControllerFunctionOptions) => ReactNode;
};

const KnobsController = (props: TKnobsControllerProps) => {
  const initialValues = props.knobs.reduce(
    (mapped, knobConfig) => ({
      ...mapped,
      [knobConfig.name]: knobConfig.initialValue,
    }),
    {}
  );
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {(formikProps) => {
        const form = (
          <Spacings.Stack scale="m">
            <SelectField
              name="locale"
              title="Locale"
              options={props.availableLocaleOptions}
              value={props.locale}
              onChange={(event) => {
                props.setLocale(event?.target.value as string);
              }}
            />
            {props.knobs.map((knobConfig) => {
              switch (knobConfig.kind) {
                case 'text':
                  return (
                    <TextField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      value={
                        (formikProps.values as Record<string, unknown>)[
                          knobConfig.name
                        ] as string
                      }
                      errors={
                        (formikProps.errors as Record<string, unknown>)[
                          knobConfig.name
                        ] as Record<string, boolean>
                      }
                      touched={
                        (formikProps.touched as Record<string, unknown>)[
                          knobConfig.name
                        ] as boolean
                      }
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                  );
                case 'text-multi':
                  return (
                    <MultilineTextField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      value={
                        (formikProps.values as Record<string, unknown>)[
                          knobConfig.name
                        ] as string
                      }
                      errors={
                        (formikProps.errors as Record<string, unknown>)[
                          knobConfig.name
                        ] as Record<string, boolean>
                      }
                      touched={
                        (formikProps.touched as Record<string, unknown>)[
                          knobConfig.name
                        ] as boolean
                      }
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                  );
                case 'select':
                  return (
                    <SelectField
                      key={knobConfig.name}
                      name={knobConfig.name}
                      title={knobConfig.label}
                      options={knobConfig.valueOptions}
                      value={
                        (formikProps.values as Record<string, unknown>)[
                          knobConfig.name
                        ] as string
                      }
                      errors={
                        (formikProps.errors as Record<string, unknown>)[
                          knobConfig.name
                        ] as Record<string, boolean>
                      }
                      touched={
                        (formikProps.touched as Record<string, unknown>)[
                          knobConfig.name
                        ] as boolean
                      }
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                    />
                  );
                default:
                  throw new Error(`Unknown kind "${knobConfig.kind}"`);
              }
            })}
          </Spacings.Stack>
        );
        return props.children({ form, values: formikProps.values });
      }}
    </Formik>
  );
};
KnobsController.displayName = 'KnobsController';

export default KnobsController;
