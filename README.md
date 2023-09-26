# ToDo Webcomponent Boiler Plate

This repo is intended as a simple boiler plate for webcomponents using Lit and Redux technologies.

## Install and run

```
npm install
npm start
```

This will run the dev front server at:
http://localhost:8000

And the backedn dummy server at:
http://localhost:3005

## Structure

- ./backend/: this a dummy backend service that use express for todo endpoints and nedb to create a local test db
- ./index.html: This is the entrypoint that is displayed on the dev server. we use open-wc/dev-server-hmr for HRM
- ./src/component/: The webcomponents is stored here, "TodoList" is the entrypoint.
- ./src/store/: This handle all the logic states and actions
  - store.js: Here we declare and configure the store
  - actions.js: This should be the only place fro action to make apicalls and edit store
  - reducer: Here we handle the logis of the states on the store.

## Redux Devtool

The devtool are enabled for this repo, you can install the chrome extension here:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es
