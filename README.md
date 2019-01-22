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

### Debug
1. Laun the app normally using: ```yarn start```
2. Create a launch config file in vscode. I have used the next one:
```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///./*": "${webRoot}/*"
      },
      "sourceMaps": true,
      "userDataDir": false,
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug JEST TEST",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "__coment__changeFile": "You should update the file you want to debug",
      "args": ["${workspaceRoot}/src/logic/account.spec.ts", "--detectOpenHandles"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
3. Launch debugger session
4. If you do not want to mess with Chrome profiles and open ports ([see some related info here](https://github.com/Microsoft/vscode-chrome-debug#chrome-user-profile-note-cannot-connect-to-the-target-connect-econnrefused)), I recommend use Canary version of chrome for daily basis and leave regular chrome for developing (if you do not use your own profile, you will have access problems running IndexedDB).

The second configuration is for introducing breakpoints in JEST test run inside VSCode.

## Design process

The process from idea to design to implementation is [described in another document](./Design.md)

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

For testing the UI components using storybook, please run `yarn storybook`.
Storybook page will open in http://localhost:6006/ in your browser.

## Testing

`yarn test` will run jest tests of the entire system. However, a number of tests do end-to-end integration and
require a demo blockchain running locally to be completed. By default these are skipped, unless you set the
`BNS_ENABLED` environmental variable to signal they should be run (which is done in the CI).

If you want to run these locally, make sure you are on a system that supports docker and that your local
user has rights to connect to docker (I often use a Linux Virtualbox just for this). In such a case,
you can do:

```shell
# start a bns blockchain and a local faucet that serves iov tokens
bash ./scripts/bnsd/start.sh
bash ./scripts/faucet/iov_start.sh

export BNS_ENABLED=1
# you can run this a few times....
yarn test

# stop them afterwards
# you may be able to run `yarn test` multiple times without restart, but if there odd failures, then
# do a fresh restart to ensure no interference with old state
bash ./scripts/facuet/iov_stop.sh
bash ./scripts/bns/stop.sh
```

## Clearing IndexedDB

If testing a lot, especially locally, you may want to clear your indexed db cache to create a new user account,
and proceed through the signup process again. Here are how to do it in various browsers

**Firefox (Ubuntu)**:
* Go to Preferences > [Privacy](about:preferences#privacy)
* Cookies and Site Data > "Manage Data..." 
* Search for `0.0.0.0` and `localhost`
* Storage should be around 40-100 KB
* Click on "Remove Selected"

**Chrome (Ubuntu)**
* Go to [Settings](chrome://settings/)
* Scroll down and click on "Advanced"
* Under Privacy and Security, click on "Content Settings"
* Click on "Cookies"
* Click on "See all cookie and site data"
* Search for `0.0.0.0` and `localhost`
* Click on trash can icon next to their name

After clearing IndexedDB, go to the [local devserver](http://0.0.0.0:8080) and go through signup again


## References:

A very good introduction to using Typescript with React/Redux: https://github.com/piotrwitek/react-redux-typescript-guide
