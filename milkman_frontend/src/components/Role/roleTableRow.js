import React, { Fragment } from "react";
import { Button } from "reactstrap";
import confirm from "reactstrap-confirm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  removeRole,
  setSelectedRole,
} from "../../Redux/Actions/Role-Action/roleAction";

const RoleTableRow = (props) => {
  const { removeRole, setSelectedRole } = props;
  return (
    <Fragment>
      <tr>
        <td>{props.obj.id}</td>
        <td>{props.obj.name}</td>
        <td>
          <Button
            color="info"
            onClick={() => {
              setSelectedRole(props.obj);
              props.history.push("/editRole/" + props.obj.id);
            }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={async () => {
              const result = await confirm({
                message: "Are you sure you want to delete this Role?",
                title: "Delete Role...!!",
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmColor: "danger",
              });
              if (result) {
                removeRole(props.obj.id);
              }
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
          <Button
            color="warning"
            onClick={() => {
              props.history.push("/singleRole/" + props.obj.id);
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
    removeRole: (roleId) => dispatch(removeRole(roleId)),
    setSelectedRole: (selectedRole) => dispatch(setSelectedRole(selectedRole)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RoleTableRow));
