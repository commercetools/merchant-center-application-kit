import { PublicPageLayout } from '@commercetools-frontend/application-components';
import Card from '@commercetools-uikit/card';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/public-page-layout';

export const Component = () => (
  <Suite>
    <Spec label="PublicPageLayout">
      <PublicPageLayout>
        <Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
          dictum varius duis at consectetur lorem donec.
        </Card>
      </PublicPageLayout>
    </Spec>

    <Spec label="PublicPageLayout with long legal message">
      <PublicPageLayout legalMessage="Lea nuestra Política de privacidad y nuestros Términos del servicio.">
        <Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
          dictum varius duis at consectetur lorem donec.
        </Card>
      </PublicPageLayout>
    </Spec>
  </Suite>
);
