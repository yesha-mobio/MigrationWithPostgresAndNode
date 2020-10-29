import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
// import { flowRight as compose } from "lodash";
import {
  deleteBundle,
  getAllBundles,
  //   getBundleById,
} from "../../queries/bundle";
import { withRouter } from "react-router-dom";

const BundleTableRow = (props) => {
  //   const getBundleById = (id) => {
  //     return (
  //       <Query query={getBundleById}>
  //         {(query) => {
  //           query({
  //             variables: { id: id },
  //           });
  //           //   props.history.push("/singleBundle");
  //         }}
  //       </Query>
  //     );
  //   };
  return (
    <tr>
      <td>{props.obj.id}</td>
      <td>{props.obj.name}</td>
      <td>{props.obj.description}</td>
      <td>
        <Button color="info" onClick={() => props.history.push("/")}>
          Edit
        </Button>
        &nbsp;&nbsp;
        <Mutation mutation={deleteBundle}>
          {(mutation) => (
            <Button
              color="danger"
              onClick={() => {
                mutation({
                  variables: { id: props.obj.id },
                  refetchQueries: [{ query: getAllBundles }],
                });
              }}
            >
              Delete
            </Button>
          )}
        </Mutation>
        &nbsp;&nbsp;
        <Button
          color="warning"
          onClick={() => props.history.push("/singleBundle")}
        >
          View
        </Button>
      </td>
    </tr>
  );
};

export default withRouter(BundleTableRow);
