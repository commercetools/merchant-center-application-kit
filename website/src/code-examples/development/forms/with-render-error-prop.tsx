<LocalizedTextField
  name="name"
  title="Name"
  isRequired
  selectedLanguage={dataLocale}
  value={formik.values.name}
  errors={
    LocalizedTextField.toFieldErrors(formik.errors).name
  }
  renderError={(errorKey) => {
    switch (errorKey) {
      case 'invalid':
        return 'The value is invalid.';
      default:
        return null;
    }
  }}
  touched={formik.touched.name}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
