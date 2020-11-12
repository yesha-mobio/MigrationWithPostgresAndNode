import React, { Component } from "react";
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
import { withRouter } from "react-router-dom";

import Header from "../../components/Core/header";
import { addBundle } from "../../redux/actions/Bundle-Action/bundleAction";
import { isAuthenticated } from "../../authentication/authentication";

class AddBundle extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      error: "",
      success: false,
      errorMessage: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .addBundle(this.state.name, this.state.description)
      .then(() => {
        this.setState({
          error: false,
          success: true,
          name: "",
          description: "",
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
    this.props.history.push("/displayBundles");
  }

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
              Bundle is added...!
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

    const addBundleForm =
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
                  <h5>Add a new Bundle</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
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
                      <b>Add New Bundle</b>
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
                      <b>List all Bundles</b>
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
        {addBundleForm}
      </div>
    );
  }
}

const mapStateToProps = ({ bundle }) => {
  return {
    error: bundle.error,
    loading: bundle.loading,
    addBundle: bundle.addBundle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBundle: (name, description) => dispatch(addBundle(name, description)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddBundle));
