import React, { Component } from "react";
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
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";

import { isAuthenticated } from "../../authentication/authentication";
import { loginUser } from "../../redux/actions/User-Action/userAction";

class Signin extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "yesha@test.com",
      password: "yesha123456",
      error: "",
      success: false,
      errorMessage: "",
      didRedirect: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      error: false,
      success: true,
      email: "",
      password: "",
      errorMessage: "",
      didRedirect: true,
    });
    await this.props
      .loginUser(this.state.email, this.state.password)
      .then()
      .catch((err) => {
        if (err) {
          this.setState({
            error: err,
            success: false,
            errorMessage: err.message.slice(15),
          });
        }
      });
  };

  render() {
    const { user } = isAuthenticated();
    const performRedirect = () => {
      if (this.state.didRedirect) {
        if (user && user.role_id === 1) {
          return <Redirect to="/admin/dashboard" />;
        } else {
          return <Redirect to="/signin" />;
        }
      }
    };

    const signInForm = () => {
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
                  <h5>Please Login Here</h5>
                </CardHeader>
                {errorMessage()}
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Enter your email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter your password"
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                    </FormGroup>
                    <Button
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Signin</b>
                    </Button>
                    &nbsp;&nbsp;
                    <span>
                      Create Milkman account <Link to="/signup">here.</Link>
                    </span>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
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
        {performRedirect()}
        {signInForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    error: user.error,
    loading: user.loading,
    userDetails: user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));