import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const DisplayLocale = () => {
  const dataLocale = useApplicationContext(
    (applicationContext) => applicationContext.dataLocale
  );

  return (
    <div>
      <h1>Current data locale: {dataLocale}</h1>
    </div>
  );
};

export default DisplayLocale;
