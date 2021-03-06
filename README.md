# RadTools
A set of example projects built for many different solutions. It strives to show you all the levers and switches needed to solve a set of common problems when building node-based, TypeScript solutions.

## Setup dev environment

To play with these tools clone this repository and install all dependencies using `yarn` from the root folder.

To avoid errors from Application Insights you should create a `.env` file in the root folder and add this line:
```
APPINSIGHTS_INSTRUMENTATIONKEY=9b254132-6192-45c5-8724-7cb0fa298ba7
```

Any GUID will do, but if you have a working Application Insights server you can use one from there. If you do not have a valid instrumentation key you will see calls to `track` that fail in the network tab. To avoid these errors open `index.tsx` and change the line starting `analytics` to:
```
analytics().then(({ initAnalytics }) => initAnalytics(false)) // <-- false added here to prevent setting up Application Insights.
```

## Monorepo

The solutions are built as a monorepo using yarn workspaces. This allows code to be shared between different packages easily while still allowing individual projects to work in semi-isolation. In most projects there is usually a need for developing multiple different packages to solve multiple problems. A monorepo structure is great for this because it allows sharing and coupling where needed while individual projects may be bundled on their own. Projects that call for web servers, apis, serverless/lambdas and web front ends can all work with the same shared code base while still being bundled as separate modules.

## Projects

This solution is meant to show how many different types of projects may all work together and share functionality as needed. This monorepo consists of the following project examples:

Name|Description
-|-
[`bundle`](packages/bundle)|Centralizes webpack bundle configurations for the different scenarios we want to support.
[`bundlevite`](packages/bundle)|Alternative bundler using Vite which may be much faster.
[`logging`](packages/logging)|Tiny logging framework built on [`winston`](https://github.com/winstonjs/winston) that supports both client and server logging.
[`web-client`](packages/web-client)|A Single Page Application structure built using React and supporting tools.
[`web-server`](packages/web-server)|A web server example built using express.
[`web-api`](packages/web-api)|An API project that serves a standalone REST api with a Swagger UI.
[`utilities`](packages/utilities)|A project with several small utility functions and microlibraries.
