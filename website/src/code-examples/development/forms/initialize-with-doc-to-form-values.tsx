import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { docToFormValues } from './conversions';

type TChannelsProps = {
  // ...
}

const ChannelsForm = (props: TChannelsProps) => {
  const languages = useApplicationContext((context) => context.project.languages);
  const formik = useFormik({
    initialValues: docToFormValues(props.data, languages),
    // ...
  });
  // ...
}
