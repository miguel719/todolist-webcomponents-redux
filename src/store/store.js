import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { lazyReducerEnhancer } from "pwa-helpers";
import { reducers } from "./reducers.js";

if (!window.process) {
  window.process = {
    env: {
      NODE_ENV: "development",
    },
  };
}

// Use the Redux DevTools Extension enhancer if it's available
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true, // Set to true for trace in devtools
    })) ||
  compose;

const store = createStore(
  (state) => state,
  composeEnhancers(applyMiddleware(thunk), lazyReducerEnhancer(combineReducers))
);

store.addReducers({
  ...reducers,
});

export default store;
