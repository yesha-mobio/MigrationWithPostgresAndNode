import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const Roles = (props) => {
  const addRole = () => {
    return props.history.push("/addRole");
  };

  const displayRoles = () => {
    return props.history.push("/displayRoles");
  };

  return (
    <div>
      <Header />
      <BaseModal
        title="Add and Display Roles"
        addButton="Add Role"
        displayButton="List all Roles"
        addBundle={addRole}
        displayBundles={displayRoles}
      />
    </div>
  );
};

export default Roles;
