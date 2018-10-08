# Wallet Demo

This is a demo version of the IOV Wallet. It is meant both to provide a simple but
usable of our technology as well as to establish a common agreement on best practices
in react/redux application development. The demos are useful for backend devs to
demonstrate and evaluate features, as well as potentially for marketing to use
(although that is secondary concern until requested and design work provided).

The end goal should be a complete and usable application, as well as documentation
on how to build with this architecture. This can then be used as a starting point
for the development of the proper wallet product, integrating `bcp-redux` which is
to be ported to these determines best practices. We need some research, especially
in TypeScript usage as well as UX workflow.

## Development Setup

Ensure you are using node 8.x or 10.x and have installed `yarn` globally.

Highly recommended is VSCode with the TSLint extension, to give immediate feedback on types
and build errors. If you use another editor, please install such immediate feedback and
document how to do so.

Testing browser recommended Chrome or Firefox with 
[react-devtools](https://github.com/facebook/react-devtools) and 
[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension).

The development server (`yarn start`) supports 
[hot-reloading of code](https://github.com/webpack/webpack-dev-server), as well as 
[hot-reloading of redux state](https://github.com/gaearon/react-hot-loader).
That means when you modify a component, the code will be compiled and new application
deployed to the browser. The redux actions will then be re-run to recreate the current state
(but reevaluted, so you can retroactively evalute reducer changes).

_Note:_ we are pinned to the v3.x release of react-hot-loader as v4.x requires
babel, which is unnecessary overhead for a typescript project.

## Development process

Before modifying any code, ensure that it works in your environment:

```
yarn install
yarn build
```

You can then open a hot-reloading development server using `yarn start`.
You need to open http://localhost:8080/ in your browser (ideally one with the
above mentioned extensions installed).

Please run `yarn prebuild` before committing code to ensure it is properly linted and formatted.
(This runs `tslint` and `prettier`).

## References:

A very good introduction to using Typescript with React/Redux: https://github.com/piotrwitek/react-redux-typescript-guide