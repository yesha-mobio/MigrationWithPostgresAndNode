import React from "react";
import Header from "../Core/header";
import BaseModal from "../UI/baseModal";

const Users = (props) => {
  const addUser = () => {
    return props.history.push("/addUser");
  };

  const displayUsers = () => {
    return props.history.push("/displayUsers");
  };

  return (
    <div>
      <Header />
      <BaseModal
        title="Add and Display Users"
        addButton="Add User"
        displayButton="List all Users"
        addBundle={addUser}
        displayBundles={displayUsers}
      />
    </div>
  );
};

export default Users;
