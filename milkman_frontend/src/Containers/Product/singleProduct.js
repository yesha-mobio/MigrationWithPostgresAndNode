import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

import Header from "../../Components/Core/header";
import { viewProduct } from "../../Redux/Actions/Product-Action/productAction";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { isAuthenticated } from "../../Authentication/authentication";

class SingleProduct extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      const {
        viewProduct,
        match: {
          params: { product_id },
        },
      } = this.props;
      viewProduct(product_id);
    }
  }

  render() {
    const { singleProduct } = this.props;
    const singleProductForm = singleProduct ? (
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
                <h5>Single Product</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="productName">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="productName"
                      placeholder="Enter the name of the Product"
                      value={singleProduct.name}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="productDescription">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id="productDescription"
                      placeholder="Enter the Description"
                      value={singleProduct.description}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="productPrice">Price</Label>
                    <Input
                      type="text"
                      name="price"
                      id="productPrice"
                      placeholder="Enter the Price"
                      value={singleProduct.price}
                      readOnly
                    />
                  </FormGroup>
                  <Button
                    onClick={() => this.props.history.push("/displayProducts")}
                    style={{
                      background: "#BC1A4B",
                      color: "#1ABC9C",
                      borderColor: "#BC1A4B",
                    }}
                  >
                    <b>List all Products</b>
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    ) : (
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
                <h5>Single Product</h5>
              </CardHeader>
              <CardBody>
                <h3 style={{ color: "red", textAlign: "center" }}>
                  <Spinner />
                </h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );

    return (
      <div>
        <Header />
        {isAuthenticated() && isAuthenticated().user.role_id === 1 ? (
          singleProductForm
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
            You are not Authenticated...!!
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => {
  return {
    error: product.error,
    loading: product.loading,
    singleProduct: product.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewProduct: (productId) => dispatch(viewProduct(productId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleProduct));
