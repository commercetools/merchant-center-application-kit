---
"@commercetools-frontend/cypress": minor
---

Adds ability retry logins when using the `loginByForm` command. Retrying takes place automatically when using a login fails and the login response from the `/tokens` endpoint returns a 429. Another login attempt is scheduled 1 second after the prior plus a random offset value after the prior failed and the maximum number of attempts is not exceeded.

The number of login attempts is limited to `3`. This value can be adjusted using the `maxLoginAttempts` Cypress configuration option. To disable login retries altogether set this value to `1`. 
