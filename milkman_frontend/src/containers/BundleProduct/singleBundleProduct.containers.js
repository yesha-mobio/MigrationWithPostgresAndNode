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
import { viewBundleProduct } from "../../redux/actions/BundleProduct-Action/bundleProductAction";
import Spinner from "../../components/UI/Spinner/Spinner";
import { isAuthenticated } from "../../authentication/authentication";

class SingleBundleProduct extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      const {
        viewBundleProduct,
        match: {
          params: { bundle_product_id },
        },
      } = this.props;
      viewBundleProduct(bundle_product_id);
    }
  }

  render() {
    const { singleBundleProduct } = this.props;
    const singleBundleProductForm = singleBundleProduct ? (
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
                <h5>Single Bundle-Product</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="bundleName">Bundle</Label>
                    <Input
                      type="text"
                      name="bundle_name"
                      id="bundleName"
                      value={singleBundleProduct.bundles.name}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="productName">Product</Label>
                    <Input
                      type="text"
                      name="product_name"
                      id="productName"
                      value={singleBundleProduct.products.name}
                      readOnly
                    />
                  </FormGroup>
                  <Button
                    onClick={() =>
                      this.props.history.push("/displayBundleProducts")
                    }
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
                <h5>Single Bundle-Product</h5>
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
          singleBundleProductForm
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
            You are not Authenticated...!!
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ bundleProduct }) => {
  return {
    error: bundleProduct.error,
    loading: bundleProduct.loading,
    singleBundleProduct: bundleProduct.singleBundleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewBundleProduct: (bundleProductId) =>
      dispatch(viewBundleProduct(bundleProductId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleBundleProduct));
