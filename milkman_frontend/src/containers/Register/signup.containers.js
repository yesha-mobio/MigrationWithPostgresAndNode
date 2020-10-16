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

import { createUser } from "../../queries/user";
import { getAllRoles } from "../../queries/role";

class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      address: "",
      password: "",
      role_id: "",
      error: "",
      success: false,
    };
    this.onChnageName = this.onChnageName.bind(this);
    this.onChnageEmail = this.onChnageEmail.bind(this);
    this.onChnageAddress = this.onChnageAddress.bind(this);
    this.onChnagePassword = this.onChnagePassword.bind(this);
    this.onChnageRoleId = this.onChnageRoleId.bind(this);
    // this.goBackBowser = this.goBackBowser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayRoles = this.displayRoles.bind(this);
  }

  onChnageName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  onChnageEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onChnageAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  onChnagePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onChnageRoleId(event) {
    this.setState({
      role_id: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: false,
      success: true,
    });
    this.props.createUser({
      variables: {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        password: this.state.password,
        role_id: this.state.role_id,
      },
    });
    // this.props.history.push("/displayBundles");
  }

  // goBackBowser() {
  //   this.props.history.push("/signin");
  // }

  displayRoles() {
    var data = this.props.getAllRoles;
    console.log(data);
    if (!data.loading) {
      return data.getAllRoles.map((role) => {
        return (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        );
      });
    }
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
              You are Registered...!!
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

    const signupForm = () => {
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
                  <h5>Signup</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="userName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="userName"
                        placeholder="Enter your Name"
                        onChange={this.onChnageName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="userEmail"
                        placeholder="Enter your Email"
                        onChange={this.onChnageEmail}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userAddress">Address</Label>
                      <Input
                        type="textarea"
                        name="address"
                        id="userAddress"
                        placeholder="Enter your Address"
                        onChange={this.onChnageAddress}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userPassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="userPassword"
                        placeholder="Enter your Password"
                        onChange={this.onChnagePassword}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userRole">Role</Label>
                      <select onChange={this.onChnageRoleId}>
                        <option>Select Role</option>
                        {this.displayRoles()}
                      </select>
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Signup</b>
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
        {signupForm()}
      </div>
    );
  }
}

export default compose(
  graphql(getAllRoles, { name: "getAllRoles" }),
  graphql(createUser, { name: "createUser" })
)(Signup);
