import { combineReducers } from "redux";

import BundleReducer from "./bundleReducer";
import UserReducer from "./userReducer";

export default combineReducers({
  bundle: BundleReducer,
  user: UserReducer,
});
