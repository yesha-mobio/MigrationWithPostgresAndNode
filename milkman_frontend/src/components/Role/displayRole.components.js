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
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../Core/header";
import RoleTableRow from "./roleTableRow.components";
import { getRoles } from "../../redux/actions/Role-Action/roleAction";
import { isAuthenticated } from "../../authentication/authentication";
import Spinner from "../UI/Spinner/Spinner";

class DisplayRole extends Component {
  constructor(props) {
    super();
    this.goBackBowser = this.goBackBowser.bind(this);
  }

  componentDidMount() {
    const { getRoles } = this.props;
    if (isAuthenticated() && isAuthenticated().user.role_id === 1) {
      return getRoles();
    }
  }

  goBackBowser = () => {
    this.props.history.push("/role");
  };

  render() {
    const displayRolesHandler = () => {
      const { error, loading, roleList } = this.props;
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
            <td colSpan="4">
              <Spinner />
            </td>
          </tr>
        );
      } else {
        return roleList.map((role, i) => {
          return <RoleTableRow key={i} obj={role} />;
        });
      }
    };

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
                    <tbody>{displayRolesHandler()}</tbody>
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

const mapStateToProps = ({ role }) => {
  return {
    error: role.error,
    loading: role.loading,
    roleList: role.roleList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoles: () => dispatch(getRoles()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayRole));
