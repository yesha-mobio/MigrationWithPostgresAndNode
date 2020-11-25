import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";

import Header from "../../Core/header";
import { isAuthenticated } from "../../../Authentication/authentication";

const AdminDashboard = (props) => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div>
        <Card style={{ margin: "10px 10px" }}>
          <CardBody>
            <CardHeader
              style={{
                backgroundColor: "#BC1A4B",
                fontSize: "25px",
                color: "#1ABC9C",
              }}
            >
              <Label>
                <b>Admin Navigation</b>
              </Label>
            </CardHeader>
            <CardHeader style={{ backgroundColor: "#1ABC9C" }}>
              <Link to="/role" style={{ color: "#BC1A4B" }}>
                <b>Roles</b>
              </Link>
            </CardHeader>
            <CardHeader style={{ backgroundColor: "#1ABC9C" }}>
              <Link to="/bundle" style={{ color: "#BC1A4B" }}>
                <b>Bundles</b>
              </Link>
            </CardHeader>
            <CardHeader style={{ backgroundColor: "#1ABC9C" }}>
              <Link to="/product" style={{ color: "#BC1A4B" }}>
                <b>Products</b>
              </Link>
            </CardHeader>
            <CardHeader style={{ backgroundColor: "#1ABC9C" }}>
              <Link to="/bundleProduct" style={{ color: "#BC1A4B" }}>
                <b>Bundle-Product</b>
              </Link>
            </CardHeader>
            <CardHeader style={{ backgroundColor: "#1ABC9C" }}>
              <Link to="/user" style={{ color: "#BC1A4B" }}>
                <b>Users</b>
              </Link>
            </CardHeader>
          </CardBody>
        </Card>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div>
        <Card style={{ margin: "10px 10px" }}>
          <CardBody>
            <h3 style={{ color: "#BC1A4B", fontSize: "35px" }}>
              <b>Admin Dashboard</b>
            </h3>
            <hr />
            <Table borderless style={{ textAlign: "left" }}>
              <tbody>
                <tr style={{ color: "#BC1A4B", fontSize: "23px" }}>
                  <th>Name:&nbsp;{name}</th>
                </tr>
                <tr style={{ color: "#BC1A4B", fontSize: "23px" }}>
                  <th>Email:&nbsp;{email}</th>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "10px" }}
      >
        <Container>
          <Row>
            <Col sm="12" md={{ size: 12 }}>
              <Card style={{ backgroundColor: "#1ABC9C" }}>
                <Row>
                  <Col sm="4" md={{ size: 4 }}>
                    {adminLeftSide()}
                  </Col>
                  <Col sm="8" md={{ size: 8 }}>
                    {adminRightSide()}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
