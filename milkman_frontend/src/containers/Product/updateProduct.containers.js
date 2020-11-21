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

import Header from "../../components/Core/header";
import { updateSingleProduct } from "../../redux/actions/Product-Action/productAction";
import { isAuthenticated } from "../../authentication/authentication";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    const { editProduct, history } = props;
    if (!editProduct) {
      history.push("/displayProducts");
    }
    this.state = {
      ...editProduct,
      error: "",
      success: false,
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayProductHandler = this.displayProductHandler.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .updateSingleProduct(this.state)
      .then(() => {
        this.setState({
          error: false,
          success: true,
          errorMessage: "",
        });
        this.props.history.push("/displayProducts");
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

  displayProductHandler = () => {
    this.props.history.push("/displayProducts");
  };

  render() {
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
              Product is updated...!
            </div>
          </div>
        </div>
      );
    };

    const errorMessage = () => {
      return (
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
      );
    };

    const updateProductForm =
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
                  <h5>Update Product</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="productId">Product-ID</Label>
                      <Input
                        type="text"
                        name="id"
                        id="productId"
                        value={this.state.id}
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="productName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="productName"
                        placeholder="Enter the name of the Product"
                        onChange={this.onChange}
                        value={this.state.name}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="productDescription">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="productDescription"
                        placeholder="Enter the Description for the Product"
                        onChange={this.onChange}
                        value={this.state.description}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="productPrice">Price</Label>
                      <Input
                        type="text"
                        name="price"
                        id="productPrice"
                        placeholder="Enter the Price of the Product"
                        onChange={this.onChange}
                        value={this.state.price}
                      />
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update Product</b>
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      onClick={this.displayProductHandler}
                      style={{
                        background: "#BC1A4B",
                        color: "#1ABC9C",
                        borderColor: "#BC1A4B",
                      }}
                    >
                      <b>Cancel</b>
                    </Button>
                  </Form>
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
        {updateProductForm}
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => {
  return {
    error: product.error,
    loading: product.loading,
    editProduct: product.editProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleProduct: (productData) =>
      dispatch(updateSingleProduct(productData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateProduct));
