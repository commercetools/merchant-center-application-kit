const errors = [
  {
    message: "A duplicate value '\"Test channel\"' exists for field 'key'.",
    code: 'DuplicateField',
    extensions: {
      code: 'DuplicateField',
    },
  },
];
// ...
dispatch(showApiErrorNotification({ errors })); // dispatch method from Redux store
