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
import { getRoles } from "../../redux/actions/Role-Action/roleAction";
import { updateSingleUser } from "../../redux/actions/User-Action/userAction";
import { isAuthenticated } from "../../authentication/authentication";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    const { editUser, history } = props;
    if (!editUser) {
      history.push("/displayUsers");
    }
    this.state = {
      ...editUser,
      error: "",
      success: false,
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayUserHandler = this.displayUserHandler.bind(this);
    this.displayRoles = this.displayRoles.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .updateSingleUser(this.state)
      .then(() => {
        this.setState({
          error: false,
          success: true,
          errorMessage: "",
        });
        this.props.history.push("/displayUsers");
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

  displayUserHandler = () => {
    this.props.history.push("/displayUsers");
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

  componentDidMount() {
    const { getRoles } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      getRoles();
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
              User is updated...!
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

    const updateUserForm =
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
                  <h5>Update User</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="userId">User-ID</Label>
                      <Input
                        type="text"
                        name="id"
                        id="userId"
                        value={this.state.id}
                        readOnly
                      />
                    </FormGroup>
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
                      <Label for="userAddress">Address</Label>
                      <Input
                        type="text"
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
                        placeholder="Select the Role"
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
                      <b>Update User</b>
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      onClick={this.displayUserHandler}
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
        {updateUserForm}
      </div>
    );
  }
}

const mapStateToProps = ({ user, role }) => {
  return {
    error: user.error,
    loading: user.loading,
    editUser: user.editUser,
    roleList: role.roleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoles: () => dispatch(getRoles()),
    updateSingleUser: (userData) => dispatch(updateSingleUser(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateUser));
