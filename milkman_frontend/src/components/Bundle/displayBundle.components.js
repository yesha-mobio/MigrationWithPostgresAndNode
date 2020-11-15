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
import { isAuthenticated } from "../../authentication/authentication";
import { getBundles } from "../../redux/actions/Bundle-Action/bundleAction";
import BundleTableRow from "./bundleTableRow.components";
import Spinner from "../UI/Spinner/Spinner";

class DisplayBundle extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  goBackBowser = () => {
    this.props.history.push("/bundle");
  };

  componentDidMount() {
    const { getBundles } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      return getBundles();
    }
  }

  render() {
    const displayBundlesHandler = () => {
      const { error, loading, bundleList } = this.props;
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
        return bundleList.map((bundle, i) => {
          return <BundleTableRow key={i} obj={bundle} />;
        });
      }
    };

    const displayBundles =
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
                  <h5>List of Bundles</h5>
                </CardHeader>
                <CardBody>
                  <Table bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{displayBundlesHandler()}</tbody>
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
        {displayBundles}
      </div>
    );
  }
}

const mapStateToProps = ({ bundle }) => {
  return {
    error: bundle.error,
    loading: bundle.loading,
    bundleList: bundle.bundleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBundles: () => dispatch(getBundles()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayBundle));
