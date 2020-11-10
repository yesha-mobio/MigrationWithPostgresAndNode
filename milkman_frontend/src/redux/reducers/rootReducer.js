import { combineReducers } from "redux";

import BundleReducer from "./bundleReducer";

export default combineReducers({
  bundle: BundleReducer,
});
