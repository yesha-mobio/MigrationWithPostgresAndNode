import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const products = (props) => {
  const addProduct = () => {
    console.log(props);
    return props.history.push("/addProduct");
  };

  const displayProduct = () => {
    console.log(props);
    return props.history.push("/displayProducts");
  };

  return (
    <div>
      <Header />
      <BaseModal
        title="Add and Display Products"
        addButton="Add Product"
        displayButton="List all Products"
        addBundle={addProduct}
        displayBundles={displayProduct}
      />
    </div>
  );
};

export default products;
