import React, { Fragment } from "react";
import { Button } from "reactstrap";
import confirm from "reactstrap-confirm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  removeBundle,
  setSelectedBundle,
} from "../../Redux/Actions/Bundle-Action/bundleAction";

const BundleTableRow = (props) => {
  const { removeBundle, setSelectedBundle } = props;
  return (
    <Fragment>
      <tr>
        <td>{props.obj.id}</td>
        <td>{props.obj.name}</td>
        <td>{props.obj.description}</td>
        <td>
          <Button
            color="info"
            onClick={() => {
              setSelectedBundle(props.obj);
              props.history.push("/editBundle/" + props.obj.id);
            }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={async () => {
              const result = await confirm({
                message: "Are you sure you want to delete this Bundle?",
                title: "Delete Bundle...!!",
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmColor: "danger",
              });
              if (result) {
                removeBundle(props.obj.id);
              }
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
          <Button
            color="warning"
            onClick={() => {
              props.history.push("/singleBundle/" + props.obj.id);
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
    removeBundle: (bundleId) => dispatch(removeBundle(bundleId)),
    setSelectedBundle: (selectedBundle) =>
      dispatch(setSelectedBundle(selectedBundle)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(BundleTableRow));
