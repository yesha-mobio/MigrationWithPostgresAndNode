import React from "react";
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

const Signin = () => {
  const onSubmit = (event) => {
    event.preventDefault();
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
                <h5>Please login here</h5>
              </CardHeader>
              {/* {successMessage()}
              {errorMessage()} */}
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Enter your password"
                    />
                  </FormGroup>
                  <Button
                    onClick={onSubmit}
                    style={{
                      background: "#1ABC9C",
                      color: "#BC1A4B",
                      borderColor: "#1ABC9C",
                    }}
                  >
                    <b>LogIn</b>
                  </Button>
                </Form>
              </CardBody>
              {/* <Register /> */}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  // const successMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div
  //           className="alert alert-success"
  //           style={{ display: success ? "" : "none", marginTop: "10px" }}
  //         >
  //           Login successfully.
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const errorMessage = () => {
  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-sm-3 text-left">
  //         <div
  //           className="alert alert-danger"
  //           style={{ display: error ? "" : "none", marginTop: "10px" }}
  //         >
  //           {error}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <Header />
      {signInForm()}
    </div>
  );
};

export default Signin;
