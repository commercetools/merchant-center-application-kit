#!/usr/bin/env node
/* eslint-disable */

const mri = require('mri');
const path = require('path');
const replace = require('replace');

const versionOfPackage = process.env.npm_package_version;
const nameOfPackage = process.env.npm_package_name;

const flags = mri(process.argv.slice(2), { alias: { help: ['h'] } });
const commands = flags._;

if (commands.length === 0 || (flags.help && commands.length === 0)) {
  console.log(`
    Usage: version [command] [options]
    Commands:
      print        Prints the version and package name
      replace        Replaces the version to the built files
  `);
  process.exit(0);
}

const command = commands[0];

switch (command) {
  case 'print': {
    console.log(
      `Version for ${nameOfPackage} of release will be ${versionOfPackage}`
    );
    break;
  }
  case 'replace': {
    const pkgDirectory = fs.realpathSync(process.env.pwd);
    const resolvePkg = relativePath => path.resolve(pkgDirectory, relativePath);

    const paths = [resolvePkg('dist')];

    replace({
      regex: '__@APPLICATION_KIT_PACKAGE/VERSION_OF_RELEASE__',
      replacement: version,
      paths,
      recursive: true,
      silent: true,
    });

    console.log(
      `Replaced placeholder for ${nameOfPackage} and release ${versionOfPackage}`
    );
    break;
  }
  default:
    console.log(`Unknown command "${command}".`);
    break;
}
