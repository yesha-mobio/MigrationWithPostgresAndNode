import React, { Fragment, useState } from "react";
// import { graphql } from "react-apollo";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { isAuthenticated, signout } from "../../authentication/authentication";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
                      signout(() => {
                        props.history.push("/signin");
                      });
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

export default withRouter(Header);
