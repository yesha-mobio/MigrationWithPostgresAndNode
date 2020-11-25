import React, { Component } from "react";
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
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../Core/header";
import UserTableRow from "./userTableRow";
import { getUsers } from "../../Redux/Actions/User-Action/userAction";
import { isAuthenticated } from "../../Authentication/authentication";
import Spinner from "../UI/Spinner/Spinner";

class DisplayUser extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  componentDidMount() {
    const { getUsers } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      return getUsers();
    }
  }

  goBackBowser = () => {
    this.props.history.push("/user");
  };

  render() {
    const displayUsersHandler = () => {
      const { error, loading, userList } = this.props;
      if (error) {
        return (
          <tr>
            <td>{error}</td>
          </tr>
        );
      }
      if (loading) {
        return (
          <tr>
            <td colSpan="7">
              <Spinner />
            </td>
          </tr>
        );
      } else {
        return userList.map((user, i) => {
          return <UserTableRow key={i} obj={user} />;
        });
      }
    };

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
                    <tbody>{displayUsersHandler()}</tbody>
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

const mapStateToProps = ({ user }) => {
  return {
    error: user.error,
    loading: user.loading,
    userList: user.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayUser));
