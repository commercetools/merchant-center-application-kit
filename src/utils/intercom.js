const createIntercomUserDataForUser = user => ({
  app_id: window.app.tracking.intercomId,
  user_id: user.id,
  // This enables secure mode. Once it's enabled, it stays on!
  user_hash: user.intercom_user_hash,
  name: `${user.firstName} ${user.lastName}`,
  email: user.email,
  signed_up_at: user.createdAt, // either a Unix timestamp or ISO 8601
  language: user.language,
  mc_location: window.app.location,
  ...(user.organization
    ? {
        company: {
          id: user.organization.id,
          name: user.organization.name,
          created_at: user.organization.createdAt,
          teams_count: user.organization.teamsCount,
        },
      }
    : {}),
});

export const boot = user => {
  if (!window.Intercom || !window.app.tracking.intercomId) {
    return;
  }
  // From the Intercom SPA Docs
  // You boot the user as normal:
  // window.Intercom('boot', {app_id: APP_ID, email: 'someuser@example.com', apples: 1});
  // https://docs.intercom.com/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
  window.Intercom('boot', createIntercomUserDataForUser(user));
};

export const shutdown = () => {
  if (!window.Intercom || !window.app.tracking.intercomId) {
    return;
  }
  // From the Intercom SPA Docs
  // When your user logs out of Intercom (or is automatically logged out by your
  // app), call Intercom('shutdown');  from our JavaScript API, to end the
  // Intercom session and clear the cookie.
  // https://docs.intercom.com/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
  window.Intercom('shutdown');
};

export const updateUser = user => {
  if (!window.Intercom || !window.app.tracking.intercomId) {
    return;
  }
  // From the Intercom SPA Docs
  // If the user suddenly has two apples, you would call:
  // window.Intercom('update', {email: 'someuser@example.com', apples: 2});
  // https://docs.intercom.com/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
  window.Intercom('update', createIntercomUserDataForUser(user));
};

export const changePage = () => {
  if (!window.Intercom || !window.app.tracking.intercomId) {
    return;
  }
  // From the Intercom SPA Docs
  // But if a user has just caused a “page" change, you would call:
  // window.Intercom('update');
  // https://docs.intercom.com/install-on-your-product-or-site/other-ways-to-get-started/integrate-intercom-in-a-single-page-app
  window.Intercom('update');
};
