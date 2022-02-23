This folder contains configurations and executables for the [linkcheck](https://github.com/filiph/linkcheck) tool.

The `linkcheck` is used to verify that the documentation links are correct, including anchor links.

# Updating linkcheck versions

The library provides ready-to-use executables for different systems. See [Releases page](https://github.com/filiph/linkcheck/releases).

To upgrade to a new version, download the executables for `macos-x64` and `linux-x64` and place them in the `.linkcheck/releases/<version>` folder.

Update then the references to the new versions in GitHub actions and in the package.json.

# Skipping links

Certain links are being skipped/ignored from the checks, as they are either flaky or cause issues with the checks. See `skip_list.txt` file to extend the list of links to be ignored.
