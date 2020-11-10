import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "./Login/signin.containers";
import Signup from "./Register/signup.containers";
import User from "./User/users";
import EditUser from "./User/editUser";
import Home from "../components/Core/home";
import Bundles from "../components/Bundle/bundles.components";
import SingleBundle from "./Bundle/singleBundle.container";
import AddBundle from "./Bundle/addBundle.containers";
import DisplayBundle from "../components/Bundle/displayBundle.components";
import Roles from "../components/Role/roles.components";
import AddRole from "./Role/addRole.containers";
import DisplayRole from "../components/Role/displayRole.components";
import Products from "../components/Product/products.components";
import AddProduct from "./Product/addProduct.containers";
import DisplayProduct from "../components/Product/displayProduct.components";
import BundleProducts from "../components/BundleProduct/bundleProducts.components";
import AddBundleProduct from "./BundleProduct/addBundleProduct.containers";
import DisplayBundleProduct from "../components/BundleProduct/displayBundleProduct.components";
import Users from "../components/User/users.components";
import DisplayUser from "../components/User/displayUser.components";
import AdminDashboard from "../components/User/Admin/adminDashboard.components";

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
