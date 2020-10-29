import React, { Component } from "react";
import { graphql } from "react-apollo";
import Header from "../../components/Core/header";
import { flowRight as compose } from "lodash";
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

import {
  createBundleProduct,
  getAllBundleProducts,
} from "../../queries/bundleProduct";
import { getAllBundles } from "../../queries/bundle";
import { getAllProducts } from "../../queries/product";

class AddBundleProduct extends Component {
  constructor(props) {
    super();
    this.state = {
      bundle_id: "",
      product_id: "",
      error: "",
      success: false,
      errorMessage: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBackBowser = this.goBackBowser.bind(this);
    this.displayBundles = this.displayBundles.bind(this);
    this.displayProducts = this.displayProducts.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  displayBundles() {
    var data = this.props.getAllBundles;
    // console.log(data);
    if (data.loading) {
      return "loading...!!";
    } else {
      return data.getAllBundles.map((bundle) => {
        return (
          <option key={bundle.id} value={bundle.id}>
            {bundle.name}
          </option>
        );
      });
    }
  }

  displayProducts() {
    var data = this.props.getAllProducts;
    // console.log(this.props.data);
    if (data.loading) {
      return "loading...!!";
    } else {
      return data.getAllProducts.map((product) => {
        return (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        );
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props
      .createBundleProduct({
        variables: {
          bundle_id: this.state.bundle_id,
          product_id: this.state.product_id,
        },
        refetchQueries: [{ query: getAllBundleProducts }],
      })
      .then(() => {
        this.setState({
          error: false,
          success: true,
          bundle_id: "",
          product_id: "",
          errorMessage: "",
        });
      })
      .catch((err) => {
        if (err) {
          this.setState({
            error: true,
            success: false,
            errorMessage: err.message.slice(22),
          });
        }
      });
  };

  goBackBowser() {
    this.props.history.push("/displayBundleProducts");
  }

  render() {
    const addBundleProductForm = () => {
      return (
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
                  <h5>Add a new Bundle-Product</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="bundle">Bundle</Label>
                      <Input
                        type="select"
                        name="bundle_id"
                        id="bundle"
                        placeholder="Select the Bundle"
                        onChange={this.onChange}
                        value={this.state.bundle_id}
                      >
                        <option>Select Bundle</option>
                        {this.displayBundles()}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="product">Product</Label>
                      <Input
                        type="select"
                        name="product_id"
                        id="product"
                        placeholder="Select the Product"
                        onChange={this.onChange}
                        value={this.state.product_id}
                      >
                        <option>Select Product</option>
                        {this.displayProducts()}
                      </Input>
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Add New Bundle-Product</b>
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      onClick={this.goBackBowser}
                      style={{
                        background: "#BC1A4B",
                        color: "#1ABC9C",
                        borderColor: "#BC1A4B",
                      }}
                    >
                      <b>List all Bundle-Products</b>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    };

    const successMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-success"
              style={{
                display: this.state.success ? "" : "none",
                marginTop: "10px",
              }}
            >
              Bundle-Product is added...!
            </div>
          </div>
        </div>
      );
    };

    const errorMessage = () => {
      return (
        <div>
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{
                  display: this.state.error ? "" : "none",
                  marginTop: "10px",
                }}
              >
                {this.state.errorMessage}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Header />
        {addBundleProductForm()}
      </div>
    );
  }
}

export default compose(
  graphql(getAllBundles, { name: "getAllBundles" }),
  graphql(getAllProducts, { name: "getAllProducts" }),
  graphql(createBundleProduct, { name: "createBundleProduct" })
)(AddBundleProduct);
