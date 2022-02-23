import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';

const KnobsController = (props) => {
  const initialValues = props.knobs.reduce(
    (mapped, knobConfig) => ({
      ...mapped,
      [knobConfig.name]: knobConfig.initialValue,
    }),
    {}
  );
  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const form = (
          <Spacings.Stack size="m">
            <SelectField
              name="locale"
              title="Locale"
              options={props.availableLocaleOptions}
              value={props.locale}
              onChange={(event) => {
                props.setLocale(event.target.value);
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
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
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
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
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
                      value={formikProps.values[knobConfig.name]}
                      errors={formikProps.errors[knobConfig.name]}
                      touched={formikProps.touched[knobConfig.name]}
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
KnobsController.propTypes = {
  knobs: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.oneOf(['text', 'text-multi', 'select']).isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      initialValue: PropTypes.any.isRequired,
      valueOptions: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired
  ).isRequired,
  locale: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
  availableLocaleOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  children: PropTypes.func.isRequired,
};

export default KnobsController;
