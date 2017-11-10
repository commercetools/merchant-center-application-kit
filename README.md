# sdk

Tools for declarative fetching.

## Declarative Fetching

There are two sides to declarative fetching:

* describing the data we need to fetch declaratively
* fetching by rendering a component instead of triggering the fetch imperatively

This module aims to provide the necessary parts for both.

## Describing data declaratively

The provided middleware takes an object which describes what data should be
fetched. The middleware transforms that description into a promise and resolves
the promise. It passes the response back to the callee.

## Declaring the fetch using a component

The provided `Sdk.Fetch` component can be rendered to fetch data. It uses the
middleware behind the scenes but adds some features on top. See
[components/sdk-fetch/README.md](./components/sdk-fetch/README.md) for details.
