import { Routes, Route, useParams } from 'react-router-dom';
import Spacings from '@commercetools-uikit/spacings';
import Channels from './components/channels';
import Welcome from './components/welcome';

const ApplicationRoutes = () => {
  const params = useParams();

  /**
   * When using routes, there is a good chance that you might want to
   * restrict the access to a certain route based on the user permissions.
   * You can evaluate user permissions using the `useIsAuthorized` hook.
   * For more information see https://docs.commercetools.com/merchant-center-customizations/development/permissions
   *
   * NOTE that by default the Custom Application implicitly checks for a "View" permission,
   * otherwise it won't render. Therefore, checking for "View" permissions here
   * is redundant and not strictly necessary.
   */

  return (
    <Spacings.Inset scale="l">
      <Routes>
        <Route
          path={`${params.path}/channels`}
          element={<Channels linkToWelcome={params.url} />}
        />
        <Route element={<Welcome />} />
      </Routes>
    </Spacings.Inset>
  );
};
ApplicationRoutes.displayName = 'ApplicationRoutes';

export default ApplicationRoutes;
