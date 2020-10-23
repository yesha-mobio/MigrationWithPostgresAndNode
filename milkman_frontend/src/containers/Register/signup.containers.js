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
import { Link } from "react-router-dom";

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
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayRoles = this.displayRoles.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props
      .createUser({
        variables: {
          name: this.state.name,
          email: this.state.email,
          address: this.state.address,
          password: this.state.password,
          role_id: this.state.role_id,
        },
      })
      .then(() => {
        this.setState({
          error: false,
          success: true,
          name: "",
          email: "",
          address: "",
          password: "",
          role_id: "",
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

  displayRoles() {
    var data = this.props.getAllRoles;
    // console.log(this.props.data);
    if (data.loading) {
      return "loading...!!";
    } else {
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
                  <h5>Please Register Here</h5>
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
                        onChange={this.onChange}
                        value={this.state.name}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="userEmail"
                        placeholder="Enter your Email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userPassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="userPassword"
                        placeholder="Enter your Password"
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userAddress">Address</Label>
                      <Input
                        type="textarea"
                        name="address"
                        id="userAddress"
                        placeholder="Enter your Address"
                        onChange={this.onChange}
                        value={this.state.address}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="userRole">Role</Label>
                      <Input
                        type="select"
                        name="role_id"
                        id="userRole"
                        onChange={this.onChange}
                        value={this.state.role_id}
                      >
                        <option>Select Role</option>
                        {this.displayRoles()}
                      </Input>
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
                    &nbsp;&nbsp;
                    <span>
                      Please Login <Link to="/signin">here.</Link>
                    </span>
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
              {this.state.errorMessage}
            </div>
          </div>
        </div>
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
