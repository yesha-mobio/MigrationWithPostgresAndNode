import React, { Component } from "react";
import { connect } from "react-redux";
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

import Header from "../../components/Core/header";
import { updateSingleRole } from "../../redux/actions/Role-Action/roleAction";
import { isAuthenticated } from "../../authentication/authentication";

class UpdateRole extends Component {
  constructor(props) {
    super(props);
    const { editRole, history } = props;
    if (!editRole) {
      history.push("/displayRoles");
    }
    this.state = {
      ...editRole,
      error: "",
      success: false,
      errorMessage: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayRoleHandler = this.displayRoleHandler.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props
      .updateSingleRole(this.state)
      .then(() => {
        this.setState({
          error: false,
          success: true,
          errorMessage: "",
        });
        this.props.history.push("/displayRoles");
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

  displayRoleHandler = () => {
    this.props.history.push("/displayRoles");
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
              Role is updated...!
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

    const updateRoleForm =
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
                  <h5>Update Role</h5>
                </CardHeader>
                {successMessage()}
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="roleId">Role-ID</Label>
                      <Input
                        type="text"
                        name="id"
                        id="roleId"
                        value={this.state.id}
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="roleName">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="roleName"
                        placeholder="Enter the name of the Role"
                        onChange={this.onChange}
                        value={this.state.name}
                      />
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update Role</b>
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      onClick={this.displayRoleHandler}
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
        {updateRoleForm}
      </div>
    );
  }
}

const mapStateToProps = ({ role }) => {
  return {
    error: role.error,
    loading: role.loading,
    editRole: role.editRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleRole: (roleData) => dispatch(updateSingleRole(roleData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateRole));
