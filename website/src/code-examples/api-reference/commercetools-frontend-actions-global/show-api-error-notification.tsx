type TAppNotificationApiError<ExtraFields extends {} = {}> = {
  message: string;
  /** @deprecated Use `extensions.code` */
  code?: string;
  extensions?: {
    code?: string;
  };
} & ExtraFields;

const errors: TAppNotificationApiError[] = [
  {
    message: "A duplicate value '\"Test channel\"' exists for field 'key'.",
    code: 'DuplicateField',
    extensions: {
      code: 'DuplicateField',
    },
  },
];
// ...
// dispatch(showApiErrorNotification({ errors })); // dispatch method from Redux store
