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
import BundleProductTableRow from "./bundleProductTableRow";
import { getAllBundleProducts } from "../../queries/bundleProduct";
import { withRouter } from "react-router-dom";

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
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}

export default withRouter(graphql(getAllBundleProducts)(DisplayBundleProduct));
