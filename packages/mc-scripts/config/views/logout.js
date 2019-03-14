window.localStorage.removeItem('isAuthenticated');
window.localStorage.removeItem('loginStrategy');
window.localStorage.removeItem('activeProjectKey');
window.location.replace(
  `${window.location.origin}/login${window.location.search}`
);
