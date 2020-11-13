import { combineReducers } from "redux";

import BundleReducer from "./bundleReducer";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";

export default combineReducers({
  bundle: BundleReducer,
  auth: AuthReducer,
  role: RoleReducer,
});
