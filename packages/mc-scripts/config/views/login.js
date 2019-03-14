/* eslint-disable no-var,vars-on-top */
window.addEventListener('load', function loaded() {
  // Access the form element...
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

    var xhr = new XMLHttpRequest();
    xhr.open('POST', data.get('url'));
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function onResponse() {
      // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          window.localStorage.setItem('isAuthenticated', true);
          var searchParams = new URLSearchParams(window.location.search);
          var redirectTo = searchParams.get('redirectTo') || '/';
          window.location.replace(redirectTo);
        } else {
          var message;
          try {
            var parsedResponse = JSON.parse(this.responseText);
            message = parsedResponse.message;
          } catch {
            message = this.responseText;
          }
          var errorMessage = document.createTextNode(message);
          var errorContainer = document.createElement('div');
          errorContainer.appendChild(errorMessage);
          container.appendChild(errorContainer, container);
        }
      }
    };
    xhr.send(JSON.stringify(payload));
  }
});
