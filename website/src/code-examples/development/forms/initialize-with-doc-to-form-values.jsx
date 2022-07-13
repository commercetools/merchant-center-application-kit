import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { docToFormValues } from './conversions';

const ChannelsForm = (props) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const formik = useFormik({
    initialValues: docToFormValues(props.data, languages),
    // ...
  });
  // ...
}
