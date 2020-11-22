import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const Bundles = (props) => {
  const addBundle = () => {
    return props.history.push("/addBundle");
  };

  const displayBundles = () => {
    return props.history.push("/displayBundles");
  };

  return (
    <div>
      <Header />
      <BaseModal
        title="Add and Display Bundles"
        addButton="Add Bundle"
        displayButton="List all Bundles"
        addBundle={addBundle}
        displayBundles={displayBundles}
      />
    </div>
  );
};

export default Bundles;
