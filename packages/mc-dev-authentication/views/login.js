/* eslint-disable no-var,vars-on-top */
/**
 * NOTE:
 *   This code is only used in development mode.
 *   It authenticates a developer using the same mechanisms
 *   as when not running in development. However,
 *   this runs on the same domain as the developer.
 */
window.addEventListener('load', function loaded() {
  var form = document.getElementById('login');
  form.addEventListener('submit', function onSubmit(event) {
    event.preventDefault();
    authorize();
  });

  function authorize() {
    var data = new FormData(form);
    var payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    var container = document.getElementById('errors');
    // Clean up error message elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const url = data.get('url');

    window
      .fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      .then(function handleResponse(response) {
        if (response.ok) {
          return response.json().then(function onSuccess() {
            window.localStorage.setItem('isAuthenticated', true);
            var searchParams = new URLSearchParams(window.location.search);
            var redirectTo = searchParams.get('redirectTo') || '/';
            window.location.replace(redirectTo);
          });
        }
        return response.text().then(function onError() {
          var message;
          try {
            var parsedResponse = JSON.parse(this.responseText);
            message = parsedResponse.message;
          } catch (e) {
            console.warn(`Request to ${url} failed with exception:`, e);

            message = this.responseText;
          }
          var errorMessage = document.createTextNode(message);
          var errorContainer = document.createElement('div');
          errorContainer.appendChild(errorMessage);
          container.appendChild(errorContainer, container);
        });
      })
      .catch(function onNetworkError(error) {
        var errorMessage = document.createTextNode(error.message);
        var errorContainer = document.createElement('div');
        errorContainer.appendChild(errorMessage);
        container.appendChild(errorContainer, container);
      });
  }
});
