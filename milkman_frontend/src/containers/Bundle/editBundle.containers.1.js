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
import {
  viewBundle,
  editBundle,
} from "../../redux/actions/Bundle-Action/bundleAction";
import Spinner from "../../components/UI/Spinner/Spinner";

class EditBundle extends Component {
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
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const { singleBundle } = this.props;
    console.log("CONSTUCTOR IN EDIT BUNDLE", singleBundle);
    const {
      viewBundle,
      editBundle,
      match: {
        params: { bundle_id },
      },
    } = this.props;
    viewBundle(bundle_id);
    editBundle(bundle_id, this.state.name, this.state.description);
  }

  // shouldComponentUpdate() {
  //   const {
  //     editBundle,
  //     match: {
  //       params: { bundle_id },
  //     },
  //   } = this.props;
  //   editBundle(bundle_id);
  // }

  render() {
    console.log(this.props);
    const { updateBundle } = this.props;
    const updateBundleForm = updateBundle ? (
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
                <h5>Edit Bundle</h5>
              </CardHeader>
              <CardBody>
                {/* <Spinner /> */}
                <Form>
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
                    onClick={() => this.props.history.push("/displayBundles")}
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
                <h5>Edit Bundle</h5>
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
        {updateBundleForm}
      </div>
    );
  }
}

const mapStateToProps = ({ bundle }) => {
  return {
    error: bundle.error,
    loading: bundle.loading,
    singleBundle: bundle.singleBundle,
    updateBundle: bundle.updateBundle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewBundle: (bundleId) => dispatch(viewBundle(bundleId)),
    editBundle: (bundleId, name, description) =>
      dispatch(editBundle(bundleId, name, description)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditBundle));
