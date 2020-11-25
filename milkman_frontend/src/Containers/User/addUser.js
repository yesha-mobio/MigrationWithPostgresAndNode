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

import Header from "../../Components/Core/header";
import { addUser } from "../../Redux/Actions/User-Action/userAction";
import { isAuthenticated } from "../../Authentication/authentication";
import { getRoles } from "../../Redux/Actions/Role-Action/roleAction";

class AddUser extends Component {
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
    this.goBackBowser = this.goBackBowser.bind(this);
    this.displayRoles = this.displayRoles.bind(this);
  }

  componentDidMount() {
    const { getRoles } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      getRoles();
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .addUser(
        this.state.name,
        this.state.email,
        this.state.address,
        this.state.password,
        this.state.role_id
      )
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
            errorMessage: err.message,
          });
        }
      });
  };

  displayRoles = () => {
    var { roleList } = this.props;
    return roleList.map((role) => {
      return (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      );
    });
  };

  goBackBowser = () => {
    this.props.history.push("/displayUsers");
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
              User is added...!
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

    const addUserForm =
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
                  <h5>Add a new User</h5>
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
                      <b>Add New User</b>
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
                      <b>List all Users</b>
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
        {addUserForm}
      </div>
    );
  }
}

const mapStateToProps = ({ user, role }) => {
  return {
    error: user.error,
    loading: user.loading,
    addUser: user.addUser,
    roleList: role.roleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoles: () => dispatch(getRoles()),
    addUser: (name, email, address, password, role_id) =>
      dispatch(addUser(name, email, address, password, role_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddUser));
