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
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../Core/header";
import BundleProductTableRow from "./bundleProductTableRow.components";
import { getBundleProducts } from "../../redux/actions/BundleProduct-Action/bundleProductAction";
import { isAuthenticated } from "../../authentication/authentication";
import Spinner from "../UI/Spinner/Spinner";

class DisplayBundleProduct extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  componentDidMount() {
    const { getBundleProducts } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      return getBundleProducts();
    }
  }

  goBackBowser = () => {
    this.props.history.push("/bundleProduct");
  };

  render() {
    const displayBundleProductsHandler = () => {
      const { error, loading, bundleProductList } = this.props;
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
            <td colSpan="4">
              <Spinner />
            </td>
          </tr>
        );
      } else {
        return bundleProductList.map((bundleProduct, i) => {
          return <BundleProductTableRow key={i} obj={bundleProduct} />;
        });
      }
    };

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
                    <tbody>{displayBundleProductsHandler()}</tbody>
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

const mapStateToProps = ({ bundleProduct }) => {
  return {
    error: bundleProduct.error,
    loading: bundleProduct.loading,
    bundleProductList: bundleProduct.bundleProductList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBundleProducts: () => dispatch(getBundleProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayBundleProduct));
