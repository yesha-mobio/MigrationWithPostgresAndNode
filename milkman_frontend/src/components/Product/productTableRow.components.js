import React, { Fragment } from "react";
import { Button } from "reactstrap";
import confirm from "reactstrap-confirm";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  removeProduct,
  setSelectedProduct,
} from "../../redux/actions/Product-Action/productAction";

const ProductTableRow = (props) => {
  const { removeProduct, setSelectedProduct } = props;
  return (
    <Fragment>
      <tr>
        <td>{props.obj.id}</td>
        <td>{props.obj.name}</td>
        <td>{props.obj.description}</td>
        <td>{props.obj.price}</td>
        <td>
          <Button
            color="info"
            onClick={() => {
              setSelectedProduct(props.obj);
              props.history.push("/editProduct/" + props.obj.id);
            }}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            color="danger"
            onClick={async () => {
              const result = await confirm({
                message: "Are you sure you want to delete this Product?",
                title: "Delete Product...!!",
                confirmText: "Delete",
                cancelText: "Cancel",
                confirmColor: "danger",
              });
              if (result) {
                removeProduct(props.obj.id);
              }
            }}
          >
            Delete
          </Button>
          &nbsp;&nbsp;
          <Button
            color="warning"
            onClick={() => {
              props.history.push("/singleProduct/" + props.obj.id);
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
    removeProduct: (productId) => dispatch(removeProduct(productId)),
    setSelectedProduct: (selectedProduct) =>
      dispatch(setSelectedProduct(selectedProduct)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(ProductTableRow));
