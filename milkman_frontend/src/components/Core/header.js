import React, { useState } from "react";
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
// import { signout } from "../../queries/auth";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isSignIn, setIsSignIn] = useState(false);

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
            <NavItem>
              <NavLink href="/bundle">
                <b>Bundle</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/product">
                <b>Product</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/role">
                <b>Role</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bundleProduct">
                <b>Bundle-Product</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/allUsers">
                <b>User</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signin">
                <b>Signout</b>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

// export default graphql(signout)(Header);
export default Header;
