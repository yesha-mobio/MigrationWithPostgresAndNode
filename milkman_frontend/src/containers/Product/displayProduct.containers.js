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

import Header from "../../components/Core/header";
import ProductTableRow from "../../components/Product/productTableRoe";
import { getAllProducts } from "../../queries/product";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../authentication/authentication";

class DisplayProduct extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
    this.displayProductsHandler = this.displayProductsHandler.bind(this);
  }

  goBackBowser() {
    this.props.history.push("/product");
  }

  displayProductsHandler() {
    var data = this.props.data;

    if (!data.loading) {
      return data.getAllProducts.map((product, i) => {
        return <ProductTableRow key={i} obj={product} />;
      });
    }
  }

  render() {
    const DisplayProducts =
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
                  <h5>List of Products</h5>
                </CardHeader>
                <CardBody>
                  <Table bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayProductsHandler()}</tbody>
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
        {DisplayProducts}
      </div>
    );
  }
}

export default withRouter(graphql(getAllProducts)(DisplayProduct));
