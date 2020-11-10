import { applyMiddleware, compose, createStore } from "redux";
import Thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const middlewares = [Thunk];

const enhancers = [];
// const devToolsExtension = window.devToolsExtension;
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (typeof devToolsExtension === "function") {
  enhancers.push(devToolsExtension());
}
const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);
const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
