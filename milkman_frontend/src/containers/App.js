import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "./Login/signin.containers";
import Signup from "./Register/signup.containers";
import User from "./User/users";
import EditUser from "./User/editUser";
import Home from "../components/Core/home";
import Bundles from "../components/Bundle/bundles";
import SingleBundle from "../containers/Bundle/singleBundle.container";
import AddBundle from "../containers/Bundle/addBundle.containers";
import DisplayBundle from "../components/Bundle/displayBundle";
import Roles from "../components/Role/roles";
import AddRole from "../containers/Role/addRole.containers";
import DisplayRole from "../containers/Role/displayRole.containers";
import Products from "../components/Product/products";
import AddProduct from "../containers/Product/addProduct.containers";
import DisplayProduct from "../containers/Product/displayProduct.containers";
import BundleProducts from "../components/BundleProduct/bundleProduct";
import AddBundleProduct from "../containers/BundleProduct/addBundleProduct.container";
import DisplayBundleProduct from "../components/BundleProduct/displayBundleProduct";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* Bundle Routes */}
          <Route path="/bundle" component={Bundles} />
          <Route path="/addBundle" component={AddBundle} />
          <Route path="/displayBundles" component={DisplayBundle} />
          <Route path="/singleBundle" component={SingleBundle} />
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
