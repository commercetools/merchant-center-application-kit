import { useHistory } from 'react-router-dom';
import { InfoDetailPage } from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';

const DetailPage = () => {
  const history = useHistory();

  return (
    <InfoDetailPage
      title="Detail page"
      onPreviousPathClick={() => history.push('/starting-page')}
      previousPathLabel="Go back"
    >
      <Text.Body>{'Lorem ipsum ...'}</Text.Body>
    </InfoDetailPage>
  );
};
