import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class Header extends Component {
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="">Tiangou Forum</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="/">
                  Home
            </NavItem>
            <NavItem eventKey={1} href="signIn">
                            Sign In
            </NavItem>
            <NavItem eventKey={2} href="signUp">
                            Sign Up
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
