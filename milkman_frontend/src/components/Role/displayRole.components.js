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

import Header from "../Core/header";
import RoleTableRow from "./roleTableRow.components";
import { getAllRoles } from "../../queries/role";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../authentication/authentication";

class DisplayRole extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
    this.displayRolesHandler = this.displayRolesHandler.bind(this);
  }

  goBackBowser() {
    this.props.history.push("/role");
  }

  displayRolesHandler() {
    var data = this.props.data;

    if (!data.loading) {
      return data.getAllRoles.map((role, i) => {
        return <RoleTableRow key={i} obj={role} />;
      });
    }
  }

  render() {
    const displayRoles =
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
                  <h5>List of Roles</h5>
                </CardHeader>
                <CardBody>
                  <Table bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th colSpan="3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.displayRolesHandler()}</tbody>
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
        {displayRoles}
      </div>
    );
  }
}

export default withRouter(graphql(getAllRoles)(DisplayRole));
