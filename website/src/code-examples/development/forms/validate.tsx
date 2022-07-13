type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

type FormValues = {
  // ...
}

declare const validate = (values: FormValues) => TCustomFormErrors<FormValues>;
