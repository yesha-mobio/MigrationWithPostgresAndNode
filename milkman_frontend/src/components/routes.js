import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "../containers/Login/signin.containers";
import Signup from "../containers/Register/signup.containers";
import User from "../containers/User/users";
import EditUser from "../containers/User/editUser";
import Home from "./Core/home";
import Bundles from "./Bundle/bundles.components";
import SingleBundle from "../containers/Bundle/singleBundle.container";
// import EditBundle from "../containers/Bundle/editBundle.containers";
import EditBundle from "../containers/Bundle/editBundle.containers.1";
import AddBundle from "../containers/Bundle/addBundle.containers";
import DisplayBundle from "./Bundle/displayBundle.components";
import Roles from "./Role/roles.components";
import AddRole from "../containers/Role/addRole.containers";
import DisplayRole from "./Role/displayRole.components";
import Products from "./Product/products.components";
import AddProduct from "../containers/Product/addProduct.containers";
import DisplayProduct from "./Product/displayProduct.components";
import BundleProducts from "./BundleProduct/bundleProducts.components";
// import AddBundleProduct from "../containers/BundleProduct/addBundleProduct.containers";
import AddBundleProduct from "../containers/BundleProduct/addBundleProduct.containers.1";
import DisplayBundleProduct from "./BundleProduct/displayBundleProduct.components";
import Users from "./User/users.components";
import DisplayUser from "./User/displayUser.components";
import AdminDashboard from "./User/Admin/adminDashboard.components";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* Bundle Routes */}
          <Route path="/bundle" component={Bundles} />
          <Route path="/addBundle" component={AddBundle} />
          <Route path="/displayBundles" component={DisplayBundle} />
          <Route path="/singleBundle/:bundle_id" component={SingleBundle} />
          <Route path="/editBundle/:bundle_id" component={EditBundle} />
          {/* Role Routes */}
          <Route path="/role" component={Roles} />
          <Route path="/addRole" component={AddRole} />
          <Route path="/displayRoles" component={DisplayRole} />
          {/* Product Routes */}
          <Route path="/product" component={Products} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/displayProducts" component={DisplayProduct} />
          {/* BundleProduct Routes */}
          <Route path="/bundleProduct" component={BundleProducts} />
          <Route path="/addBundleProduct" component={AddBundleProduct} />
          <Route
            path="/displayBundleProducts"
            component={DisplayBundleProduct}
          />
          {/* User Routes */}
          <Route path="/user" component={Users} />
          <Route path="/displayUsers" component={DisplayUser} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          {/* Auth Routes */}
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          {/* Other Routes */}
          <Route path="/allUsers" component={User} />
          <Route path="/editUser/:id" exact component={EditUser} />
          {/* Home Route */}
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
