import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const roles = (props) => {
  const addRole = () => {
    console.log(props);
    return props.history.push("/addRole");
  };

  const displayRoles = () => {
    console.log(props);
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

export default roles;
