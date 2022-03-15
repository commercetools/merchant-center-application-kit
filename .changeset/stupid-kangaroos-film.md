---
'@commercetools-frontend/mc-scripts': minor
---

Add `mc-scripts login` command
This command enables users to log in to the merchant center service from the command line.
Upon login, an authentication token is stored on the user's computer's home directory. The token can be used to perform some operations in the merchant center through the CLI.
If no valid token is available on the computer, the login command requires an email and password to authenticate.
