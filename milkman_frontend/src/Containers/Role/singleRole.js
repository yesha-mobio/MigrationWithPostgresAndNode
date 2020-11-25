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
import { viewRole } from "../../Redux/Actions/Role-Action/roleAction";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { isAuthenticated } from "../../Authentication/authentication";

class SingleRole extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      const {
        viewRole,
        match: {
          params: { role_id },
        },
      } = this.props;
      viewRole(role_id);
    }
  }

  render() {
    const { singleRole } = this.props;
    const singleRoleForm = singleRole ? (
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
                <h5>Single Role</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="roleName">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="roleName"
                      placeholder="Enter the name of the Role"
                      value={singleRole.name}
                      readOnly
                    />
                  </FormGroup>
                  <Button
                    onClick={() => this.props.history.push("/displayRoles")}
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
                <h5>Single Role</h5>
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
          singleRoleForm
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
            You are not Authenticated...!!
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ role }) => {
  return {
    error: role.error,
    loading: role.loading,
    singleRole: role.singleRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewRole: (roleId) => dispatch(viewRole(roleId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SingleRole));
