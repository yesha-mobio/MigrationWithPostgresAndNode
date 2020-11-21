import React, { Fragment } from "react";
import { Button } from "reactstrap";
import confirm from "reactstrap-confirm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { removeBundleProduct } from "../../redux/actions/BundleProduct-Action/bundleProductAction";

const BundleProductTableRow = (props) => {
  const { removeBundleProduct } = props;
  return (
    <Fragment>
      <tr>
        <td>{props.obj.id}</td>
        <td>{props.obj.bundles.name}</td>
        <td>{props.obj.products.name}</td>
        <td>
          <Button color="info">Edit</Button>
          &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={async () => {
              const result = await confirm({
                message: "Are you sure you want to delete this Bundle-Product?",
                title: "Delete Bundle-Product...!!",
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmColor: "danger",
              });
              if (result) {
                removeBundleProduct(props.obj.id);
              }
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
          <Button
            color="warning"
            onClick={() => {
              props.history.push("/singleBundleProduct/" + props.obj.id);
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
    removeBundleProduct: (bundleProductId) =>
      dispatch(removeBundleProduct(bundleProductId)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(BundleProductTableRow));
