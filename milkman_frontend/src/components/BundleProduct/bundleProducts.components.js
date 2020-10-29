import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const BundleProducts = (props) => {
  const addBundleProduct = () => {
    console.log(props);
    return props.history.push("/addBundleProduct");
  };

  const displayBundleProducts = () => {
    console.log(props);
    return props.history.push("/displayBundleProducts");
  };

  return (
    <div>
      <Header />
      <BaseModal
        title="Add and Display Bundle-Products"
        addButton="Add Bundle-Product"
        displayButton="List all Bundle-Products"
        addBundle={addBundleProduct}
        displayBundles={displayBundleProducts}
      />
    </div>
  );
};

export default BundleProducts;
