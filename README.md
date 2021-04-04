# RadTools
A set of example projects built for many different solutions. It strives to show you all the levers and switches needed to solve a set of common problems when building node-based, TypeScript solutions.

## Monorepo

The solutions are built as a monorepo using yarn workspaces. This allows code to be shared between different packages easily while still allowing individual projects to work in semi-isolation. In most projects there is usually a need for developing multiple different packages to solve multiple problems. A monorepo structure is great for this because it allows sharing and coupling where needed while individual projects may be bundled on their own. Projects that call for web servers, apis, serverless/lambdas and web front ends can all work with the same shared code base while still being bundled as separate modules.

## Projects

This solution is meant to show how many different types of projects may all work together and share functionality as needed. This monorepo consists of the following project examples:

Name|Description
-|-
[`bundle`](packages/bundle)|Centralizes webpack bundle configurations for the different scenarios we want to support.
[`logging`](packages/logging)|Tiny logging framework built on [`winston`](https://github.com/winstonjs/winston) that supports both client and server logging.
[`web-client`](packages/web-client)|A Single Page Application structure built using React and supporting tools.
[`web-server`](packages/web-server)|A web server example built using express.
