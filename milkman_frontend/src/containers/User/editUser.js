import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// import axios from "axios";
import Header from "../../components/Core/header";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    // const user = {
    //   first_name: this.state.first_name,
    //   last_name: this.state.last_name,
    //   email: this.state.email,
    // };
    // axios
    //   .put("/users/" + this.props.match.params.id, user)
    //   .then((response) => {
    //     console.log(response.data);
    //     this.props.history.push("/allUsers");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.props.history.push("/allUsers");
  }

  componentDidMount() {
    // axios
    //   .get("/users/" + this.props.match.params.id)
    //   .then((response) => {
    //     this.setState({
    //       first_name: response.data.data.first_name,
    //       last_name: response.data.data.last_name,
    //       email: response.data.data.email,
    //     });
    //   })
    //   .catch((error) => console.log(error));
  }

  render() {
    const updateUserForm = () => {
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
                  <h5>Update User</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleFirstName">First Name:</Label>
                      <Input
                        type="text"
                        name="fname"
                        id="exampleFirstName"
                        placeholder="Edit your First Name"
                        value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleLastName">Last Name:</Label>
                      <Input
                        type="text"
                        name="lname"
                        id="exampleLastName"
                        placeholder="Edit your Last Name"
                        value={this.state.last_name}
                        onChange={this.onChangeLastName}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email:</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Edit your First Name"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                    </FormGroup>
                    <Button
                      onClick={this.onSubmit}
                      style={{
                        background: "#1ABC9C",
                        color: "#BC1A4B",
                        borderColor: "#1ABC9C",
                      }}
                    >
                      <b>Update</b>
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
        {updateUserForm()}
      </div>
    );
  }
}

export default EditUser;
