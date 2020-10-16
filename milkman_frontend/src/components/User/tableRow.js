import React from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

const TableRow = (props) => {
  const deleteUserHandler = () => {
    console.log("User ID: ", props.obj.id);
    axios.delete("/allUsers/" + props.obj.id).then((response) => {
      console.log("DELETE PAGE........", response);
      window.location.reload();
    });
  };

  const editUserHandler = () => {
    props.history.push("/editUser/" + props.obj.id);
  };

  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.first_name}</td>
      <td>{props.obj.last_name}</td>
      <td>{props.obj.email}</td>
      <td>
        <Button color="info" onClick={editUserHandler}>
          Edit
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="danger" onClick={deleteUserHandler}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default withRouter(TableRow);
