import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";

import Header from "../Core/header";
import BundleProductTableRow from "./bundleProductTableRow.components";
import { getAllBundleProducts } from "../../queries/bundleProduct";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../authentication/authentication";

class DisplayBundleProduct extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  goBackBowser() {
    this.props.history.push("/bundleProduct");
  }

  displayBundleProductsHandler() {
    var data = this.props.data;

    if (!data.loading) {
      return data.getAllBundleProducts.map((item, i) => {
        return <BundleProductTableRow key={i} obj={item} />;
      });
    }
  }

  render() {
    const displayBundleProducts =
      isAuthenticated() && isAuthenticated().user.role_id === 1 ? (
        <Container>
          <Row>
            <Col sm="12">
              <Card style={{ marginTop: "50px" }}>
                <CardHeader
                  style={{
                    textAlign: "center",
                    color: "#BC1A4B",
                    background: "#1ABC9C",
                  }}
                >
                  <h5>List of Bundle-Products</h5>
                </CardHeader>
                <CardBody>
                  <Table bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Bundle</th>
                        <th>Product</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayBundleProductsHandler()}</tbody>
                  </Table>
                  <Button
                    onClick={this.goBackBowser}
                    style={{
                      background: "#BC1A4B",
                      color: "#1ABC9C",
                      borderColor: "#BC1A4B",
                    }}
                  >
                    <b>Go Back</b>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
          You are not Authenticated...!!
        </h1>
      );
    return (
      <div>
        <Header />
        {displayBundleProducts}
      </div>
    );
  }
}

export default withRouter(graphql(getAllBundleProducts)(DisplayBundleProduct));
