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
import { viewUser } from "../../redux/actions/User-Action/userAction";
import Spinner from "../../components/UI/Spinner/Spinner";
import { isAuthenticated } from "../../authentication/authentication";

class SingleUser extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      const {
        viewUser,
        match: {
          params: { user_id },
        },
      } = this.props;
      viewUser(user_id);
    }
  }

  render() {
    const { singleUser } = this.props;
    const singleUserForm = singleUser ? (
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
                <h5>Single User</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="userName">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="userName"
                      placeholder="Enter your Name"
                      value={singleUser.name}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="userEmail"
                      placeholder="Enter your Email"
                      value={singleUser.email}
                      readOnly
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="userPassword">Password</Label>
                    <Input
                      type="text"
                      name="password"
                      id="userPassword"
                      placeholder="Enter your Password"
                      value={singleUser.password}
                      readOnly
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="userAddress">Address</Label>
                    <Input
                      type="textarea"
                      name="address"
                      id="userAddress"
                      placeholder="Enter your Address"
                      value={singleUser.address}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userRoleId">Role-ID</Label>
                    <Input
                      type="test"
                      name="role_id"
                      id="userRoleId"
                      value={singleUser.role_id}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userRoleName">Role</Label>
                    <Input
                      type="test"
                      name="role_name"
                      id="userRoleName"
                      value={singleUser.roles.name}
                      readOnly
                    />
                  </FormGroup>
                  <Button
                    onClick={() => this.props.history.push("/displayUsers")}
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
                <h5>Single User</h5>
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
        {isAuthenticated() && isAuthenticated().user.role_id === 1 ? (
          singleUserForm
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
            You are not Authenticated...!!
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    error: user.error,
    loading: user.loading,
    singleUser: user.singleUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (userId) => dispatch(viewUser(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleUser));
