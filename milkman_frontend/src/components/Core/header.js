import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { isAuthenticated } from "../../Authentication/authentication";
import { logoutUser } from "../../Redux/Actions/Auth-Action/authAction";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { logoutUser } = props;

  return (
    <div>
      <Navbar style={{ background: "#BC1A4B" }} light expand="md">
        <NavbarBrand href="/">
          <h3>MilkMan :)</h3>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!isAuthenticated() && (
              <Fragment>
                <NavItem>
                  <NavLink href="/signin">
                    <b>Signin</b>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">
                    <b>Signup</b>
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role_id === 1 && (
              <Fragment>
                <NavItem>
                  <NavLink href="/admin/dashboard">
                    <b>Dashboard</b>
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
            {isAuthenticated() && (
              <Fragment>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      logoutUser();
                      props.history.push("/signin");
                    }}
                  >
                    <b>Signout</b>
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Header));
