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
import { updateSingleBundle } from "../../Redux/Actions/Bundle-Action/bundleAction";
import { isAuthenticated } from "../../Authentication/authentication";

class UpdateBundle extends Component {
  constructor(props) {
    super(props);
    const { editBundle, history } = props;
    if (!editBundle) {
      history.push("/displayBundles");
    }
    this.state = {
      ...editBundle,
      error: "",
      success: false,
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayBundleHandler = this.displayBundleHandler.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .updateSingleBundle(this.state)
      .then(() => {
        this.setState({
          error: false,
          success: true,
          errorMessage: "",
        });
        this.props.history.push("/displayBundles");
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

  displayBundleHandler = () => {
    this.props.history.push("/displayBundles");
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
              Bundle is updated...!
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

    const updateBundleForm =
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
                  <h5>Update Bundle</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="bundleId">Bundle-ID</Label>
                      <Input
                        type="text"
                        name="id"
                        id="bundleId"
                        value={this.state.id}
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bundleName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="bundleName"
                        placeholder="Enter the name of the Bundle"
                        onChange={this.onChange}
                        value={this.state.name}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="bundleDescription">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="bundleDescription"
                        placeholder="Enter the Description"
                        onChange={this.onChange}
                        value={this.state.description}
                      />
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update Bundle</b>
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      onClick={this.displayBundleHandler}
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
        {updateBundleForm}
      </div>
    );
  }
}

const mapStateToProps = ({ bundle }) => {
  return {
    error: bundle.error,
    loading: bundle.loading,
    editBundle: bundle.editBundle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleBundle: (bundleData) =>
      dispatch(updateSingleBundle(bundleData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateBundle));
