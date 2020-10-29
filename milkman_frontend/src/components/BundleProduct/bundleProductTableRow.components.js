import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import {
  deleteBundleProduct,
  getAllBundleProducts,
} from "../../queries/bundleProduct";
import { withRouter } from "react-router-dom";

const BundleProductTableRow = (props) => {
  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.bundles.name}</td>
      <td>{props.obj.products.name}</td>
      <td>
        <Button color="info">Edit</Button>
        &nbsp;&nbsp;
        <Mutation mutation={deleteBundleProduct}>
          {(mutation) => (
            <Button
              color="danger"
              onClick={() => {
                mutation({
                  variables: { id: props.obj.id },
                  refetchQueries: [{ query: getAllBundleProducts }],
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

export default withRouter(BundleProductTableRow);
