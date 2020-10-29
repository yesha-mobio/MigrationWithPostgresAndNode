import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";

import Header from "../../components/Core/header";
import UserTableRow from "../../components/User/userTableRow";
import { getAllUsers } from "../../queries/user";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../authentication/authentication";

class DisplayUser extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
    this.displayUsersHandler = this.displayUsersHandler.bind(this);
  }

  goBackBowser() {
    this.props.history.push("/user");
  }

  displayUsersHandler() {
    var data = this.props.data;

    if (!data.loading) {
      return data.getAllUsers.map((user, i) => {
        return <UserTableRow key={i} obj={user} />;
      });
    }
  }

  render() {
    const displayUsers =
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
                  <h5>List of Users</h5>
                </CardHeader>
                <CardBody>
                  <Table bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Role_ID</th>
                        <th>Role_Name</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayUsersHandler()}</tbody>
                  </Table>
                  <Button
                    onClick={this.goBackBowser}
                    style={{
                      background: "#BC1A4B",
                      color: "#1ABC9C",
                      borderColor: "#BC1A4B",
                    }}
                  >
                    <b>Go Back</b>
                  </Button>
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
        {displayUsers}
      </div>
    );
  }
}

export default withRouter(graphql(getAllUsers)(DisplayUser));
