import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import { deleteRole, getAllRoles } from "../../queries/role";
import { withRouter } from "react-router-dom";

const RoleTableRow = (props) => {
  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.name}</td>
      <td>
        <Button color="info">Edit</Button>
        &nbsp;&nbsp;
        <Mutation mutation={deleteRole}>
          {(mutation) => (
            <Button
              color="danger"
              onClick={() => {
                mutation({
                  variables: { id: props.obj.id },
                  refetchQueries: [{ query: getAllRoles }],
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

export default withRouter(RoleTableRow);
