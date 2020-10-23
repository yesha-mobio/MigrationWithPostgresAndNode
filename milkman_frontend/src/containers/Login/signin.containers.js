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
import { signin } from "../../queries/auth";
import { Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      success: false,
      errorMessage: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // console.log(this.props);
    this.props
      .signin({
        variables: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then(() => {
        this.setState({
          error: false,
          success: true,
          email: "",
          password: "",
          errorMessage: "",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        if (err) {
          this.setState({
            error: true,
            success: false,
            errorMessage: err.message.slice(15),
          });
        }
      });
  };

  render() {
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
                {successMessage()}
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
              Login successfully...!!
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
        {signInForm()}
      </div>
    );
  }
}

export default graphql(signin, { name: "signin" })(Signin);
