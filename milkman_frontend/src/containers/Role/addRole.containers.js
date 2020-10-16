import React, { Component } from "react";
import { graphql } from "react-apollo";
import Header from "../../components/Core/header";
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

import { createRole, getAllRoles } from "../../queries/role";

class AddRole extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      error: "",
      success: false,
    };
    this.onChnageName = this.onChnageName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  onChnageName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: false,
      success: true,
    });
    this.props.createRole({
      variables: {
        name: this.state.name,
      },
      refetchQueries: [{ query: getAllRoles }],
    });
    // this.props.history.push("/displayRoles");
  }

  goBackBowser() {
    this.props.history.push("/displayRoles");
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
              Role is added...!
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
              {this.state.error}
            </div>
          </div>
        </div>
      );
    };

    const addRoleForm = () => {
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
                  <h5>Add a new Role</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="roleName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="roleName"
                        placeholder="Enter the name of the Role"
                        onChange={this.onChnageName}
                      />
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Add New Role</b>
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
                      <b>List all Roles</b>
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    };

    return (
      <div>
        <Header />
        {addRoleForm()}
      </div>
    );
  }
}

export default graphql(createRole, { name: "createRole" })(AddRole);
