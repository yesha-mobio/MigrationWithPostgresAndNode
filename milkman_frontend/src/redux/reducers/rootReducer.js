import { combineReducers } from "redux";

import BundleReducer from "./bundleReducer";
import AuthReducer from "./authReducer";

export default combineReducers({
  bundle: BundleReducer,
  auth: AuthReducer,
});
