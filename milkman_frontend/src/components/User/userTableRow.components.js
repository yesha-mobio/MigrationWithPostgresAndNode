import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";

import { deleteUser, getAllUsers } from "../../queries/user";
import { withRouter } from "react-router-dom";

const UserTableRow = (props) => {
  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.name}</td>
      <td>{props.obj.email}</td>
      <td>{props.obj.address}</td>
      <td>{props.obj.role_id}</td>
      <td>{props.obj.roles.name}</td>
      <td>
        <Button color="info" onClick={() => props.history.push("/")}>
          Edit
        </Button>
        &nbsp;&nbsp;
        <Mutation mutation={deleteUser}>
          {(mutation) => (
            <Button
              color="danger"
              onClick={() => {
                mutation({
                  variables: { id: props.obj.id },
                  refetchQueries: [{ query: getAllUsers }],
                });
              }}
            >
              Delete
            </Button>
          )}
        </Mutation>
        &nbsp;&nbsp;
        <Button color="warning">View</Button>
      </td>
    </tr>
  );
};

export default withRouter(UserTableRow);
