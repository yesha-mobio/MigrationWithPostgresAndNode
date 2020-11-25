import React, { Component } from "react";
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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../Core/header";
import ProductTableRow from "./productTableRow";
import { getProducts } from "../../Redux/Actions/Product-Action/productAction";
import { isAuthenticated } from "../../Authentication/authentication";
import Spinner from "../UI/Spinner/Spinner";

class DisplayProduct extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  componentDidMount() {
    const { getProducts } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      getProducts();
    }
  }

  goBackBowser = () => {
    this.props.history.push("/product");
  };

  render() {
    const displayProductsHandler = () => {
      const { error, loading, productList } = this.props;
      if (error) {
        return (
          <tr>
            <td>{error}</td>
          </tr>
        );
      }
      if (loading) {
        return (
          <tr>
            <td colSpan="5">
              <Spinner />
            </td>
          </tr>
        );
      } else {
        return productList.map((product, i) => {
          return <ProductTableRow key={i} obj={product} />;
        });
      }
    };

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
                    <tbody>{displayProductsHandler()}</tbody>
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

const mapStateToProps = ({ product }) => {
  return {
    error: product.error,
    loading: product.loading,
    productList: product.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayProduct));
