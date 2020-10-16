import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import { deleteProduct, getAllProducts } from "../../queries/product";
import { withRouter } from "react-router-dom";

const ProductTableRow = (props) => {
  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.name}</td>
      <td>{props.obj.description}</td>
      <td>{props.obj.price}</td>
      <td>
        <Button color="info">Edit</Button>
        &nbsp;&nbsp;
        <Mutation mutation={deleteProduct}>
          {(mutation) => (
            <Button
              color="danger"
              onClick={() => {
                mutation({
                  variables: { id: props.obj.id },
                  refetchQueries: [{ query: getAllProducts }],
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

export default withRouter(ProductTableRow);
