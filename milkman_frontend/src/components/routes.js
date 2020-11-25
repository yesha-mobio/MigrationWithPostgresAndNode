import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signin from "../Containers/Login/signin";
import Signup from "../Containers/Register/signup";
import Home from "./Core/home";
import Bundles from "./Bundle/bundles";
import SingleBundle from "../Containers/Bundle/singleBundle";
import EditBundle from "../Containers/Bundle/updateBundle";
import AddBundle from "../Containers/Bundle/addBundle";
import DisplayBundle from "./Bundle/displayBundle";
import Roles from "./Role/roles";
import SingleRole from "../Containers/Role/singleRole";
import EditRole from "../Containers/Role/updateRole";
import AddRole from "../Containers/Role/addRole";
import DisplayRole from "./Role/displayRole";
import Products from "./Product/products";
import SingleProduct from "../Containers/Product/singleProduct";
import EditProduct from "../Containers/Product/updateProduct";
import AddProduct from "../Containers/Product/addProduct";
import DisplayProduct from "./Product/displayProduct";
import BundleProducts from "./BundleProduct/bundleProducts";
import SingleBundleProduct from "../Containers/BundleProduct/singleBundleProduct";
import EditBundleProduct from "../Containers/BundleProduct/updateBundleProduct";
import AddBundleProduct from "../Containers/BundleProduct/addBundleProduct";
import DisplayBundleProduct from "./BundleProduct/displayBundleProduct";
import Users from "./User/users";
import SingleUser from "../Containers/User/singleUser";
import EditUser from "../Containers/User/updateUser";
import AddUser from "../Containers/User/addUser";
import DisplayUser from "./User/displayUser";
import AdminDashboard from "./User/Admin/adminDashboard";

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
          <Route path="/editProduct/:product_id" component={EditProduct} />
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
          <Route
            path="/editBundleProduct/:bundle_product_id"
            component={EditBundleProduct}
          />
          {/* User Routes */}
          <Route path="/user" component={Users} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/displayUsers" component={DisplayUser} />
          <Route path="/singleUser/:user_id" component={SingleUser} />
          <Route path="/editUser/:user_id" component={EditUser} />
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
