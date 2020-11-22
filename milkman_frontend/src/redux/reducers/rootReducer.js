import { combineReducers } from "redux";

import BundleReducer from "./bundleReducer";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import ProductReducer from "./productReducer";
import BundleProductReducer from "./bundleProductReducer";
import UserReducer from "./userReducer";

export default combineReducers({
  bundle: BundleReducer,
  auth: AuthReducer,
  role: RoleReducer,
  product: ProductReducer,
  bundleProduct: BundleProductReducer,
  user: UserReducer,
});
