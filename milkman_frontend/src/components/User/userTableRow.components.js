import React, { Fragment } from "react";
import { Button } from "reactstrap";
import confirm from "reactstrap-confirm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { removeUser } from "../../redux/actions/User-Action/userAction";

const UserTableRow = (props) => {
  const { removeUser } = props;
  return (
    <Fragment>
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
          <Button
            color="danger"
            onClick={async () => {
              const result = await confirm({
                message: "Are you sure you want to delete this User?",
                title: "Delete User...!!",
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmColor: "danger",
              });
              if (result) {
                removeUser(props.obj.id);
              }
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
          <Button
            color="warning"
            onClick={() => {
              props.history.push("/singleUser/" + props.obj.id);
            }}
          >
            View
          </Button>
        </td>
      </tr>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: (userId) => dispatch(removeUser(userId)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(UserTableRow));
