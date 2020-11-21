import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "../containers/Login/signin.containers";
import Signup from "../containers/Register/signup.containers";
import Home from "./Core/home";
import Bundles from "./Bundle/bundles.components";
import SingleBundle from "../containers/Bundle/singleBundle.containers";
// import EditBundle from "../containers/Bundle/editBundle.containers";
import EditBundle from "../containers/Bundle/editBundle.containers.1";
import AddBundle from "../containers/Bundle/addBundle.containers";
import DisplayBundle from "./Bundle/displayBundle.components";
import Roles from "./Role/roles.components";
import SingleRole from "../containers/Role/singleRole.containers";
import EditRole from "../containers/Role/updateRole.containers";
import AddRole from "../containers/Role/addRole.containers";
import DisplayRole from "./Role/displayRole.components";
import Products from "./Product/products.components";
import SingleProduct from "../containers/Product/singleProduct.containers";
import AddProduct from "../containers/Product/addProduct.containers";
import DisplayProduct from "./Product/displayProduct.components";
import BundleProducts from "./BundleProduct/bundleProducts.components";
import SingleBundleProduct from "../containers/BundleProduct/singleBundleProduct.containers";
import AddBundleProduct from "../containers/BundleProduct/addBundleProduct.containers";
import DisplayBundleProduct from "./BundleProduct/displayBundleProduct.components";
import Users from "./User/users.components";
import SingleUser from "../containers/User/singleUser.containers";
import AddUser from "../containers/User/addUser.containers";
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
          <Route path="/singleRole/:role_id" component={SingleRole} />
          <Route path="/editRole/:role_id" component={EditRole} />
          {/* Product Routes */}
          <Route path="/product" component={Products} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/displayProducts" component={DisplayProduct} />
          <Route path="/singleProduct/:product_id" component={SingleProduct} />
          {/* BundleProduct Routes */}
          <Route path="/bundleProduct" component={BundleProducts} />
          <Route path="/addBundleProduct" component={AddBundleProduct} />
          <Route
            path="/displayBundleProducts"
            component={DisplayBundleProduct}
          />
          <Route
            path="/singleBundleProduct/:bundle_product_id"
            component={SingleBundleProduct}
          />
          {/* User Routes */}
          <Route path="/user" component={Users} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/displayUsers" component={DisplayUser} />
          <Route path="/singleUser/:user_id" component={SingleUser} />
          {/* Auth Routes */}
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          {/* Other Routes */}
          <Route path="/admin/dashboard" component={AdminDashboard} />
          {/* Home Route */}
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
